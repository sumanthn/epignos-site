# Epignos.dev

Marketing site for Epignos. EpiNote is the product; consulting is the rest.

Copy lives in `src/content.ts`. Change the words there first.

## Local

```sh
npm install
cp .env.example .env
npm run dev
```

Dev server: `http://localhost:4321`

Without a mail provider, the contact form still succeeds in development and logs the message to the terminal.

## Contact form

Set one of:

- `RESEND_API_KEY` — mail goes out through [Resend](https://resend.com). Also set `CONTACT_FROM_EMAIL` to a verified sender once the domain is on Resend.
- `WEB3FORMS_ACCESS_KEY` — fallback if Resend is not set up yet.

`CONTACT_TO_EMAIL` is the inbox that receives inquiries (`hello@epignos.dev` by default).

## Deploy

Runs on the Contabo box next to EpiNote: Node on `127.0.0.1:3001`, nginx in front.

```sh
# from this repo
rsync -az --delete \
  --exclude node_modules --exclude dist --exclude .git --exclude .vercel --exclude .astro \
  ./ epignos-dev-test:/opt/epignos-site/releases/manual/
```

On the server: `npm ci && npm run build`, then `systemctl restart epignos-site`.

Point `epignos.dev` and `www.epignos.dev` A records at `169.58.186.94` so TLS can be issued.
