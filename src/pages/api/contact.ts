export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";
import { site } from "../../content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function wantsJson(request: Request) {
  const accept = request.headers.get("accept") ?? "";
  return accept.includes("application/json") && !accept.includes("text/html");
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function htmlRedirect(query: "sent" | "error") {
  return new Response(null, {
    status: 303,
    headers: { Location: `/?${query}=1#contact` },
  });
}

function reply(request: Request, status: number, body: Record<string, unknown>, query: "sent" | "error") {
  if (wantsJson(request)) return json(status, body);
  return htmlRedirect(query);
}

async function readBody(request: Request): Promise<ContactBody> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await request.json()) as ContactBody;
  }

  const form = await request.formData();
  return {
    name: form.get("name"),
    email: form.get("email"),
    message: form.get("message"),
    website: form.get("website"),
  };
}

async function deliver(input: { name: string; email: string; message: string }) {
  const resendKey = process.env.RESEND_API_KEY;
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Epignos <no-reply@notify.epignos.dev>";
  const subject = `Epignos inquiry from ${input.name}`;
  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    "",
    input.message,
  ].join("\n");

  if (resendKey) {
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: input.email,
      subject,
      text,
    });
    if (error) throw new Error(error.message);
    return;
  }

  if (web3Key) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: web3Key,
        name: input.name,
        email: input.email,
        message: input.message,
        subject,
      }),
    });
    if (!response.ok) throw new Error(`Web3Forms ${response.status}`);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[contact] no mail provider configured; logged in dev", {
      to,
      ...input,
    });
    return;
  }

  throw new Error("NO_PROVIDER");
}

export const POST: APIRoute = async ({ request }) => {
  let body: ContactBody;

  try {
    body = await readBody(request);
  } catch {
    return reply(request, 400, { ok: false, error: "invalid_body" }, "error");
  }

  // Honeypot: pretend success so bots don't retry.
  if (asString(body.website)) {
    return reply(request, 200, { ok: true }, "sent");
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const message = asString(body.message);

  if (!name || !email || !message) {
    return reply(request, 400, { ok: false, error: "missing_fields" }, "error");
  }

  if (name.length > 120 || email.length > 200 || message.length > 4000) {
    return reply(request, 400, { ok: false, error: "too_long" }, "error");
  }

  if (!EMAIL_RE.test(email)) {
    return reply(request, 400, { ok: false, error: "invalid_email" }, "error");
  }

  try {
    await deliver({ name, email, message });
    return reply(request, 200, { ok: true }, "sent");
  } catch (error) {
    const messageText = error instanceof Error ? error.message : "";
    if (messageText === "NO_PROVIDER") {
      return reply(request, 503, { ok: false, error: "unconfigured" }, "error");
    }
    console.error("[contact] delivery failed", error);
    return reply(request, 502, { ok: false, error: "delivery_failed" }, "error");
  }
};
