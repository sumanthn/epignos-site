import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const paths = Array.from({ length: 13 }, (_, i) => {
  const y = 100 + i * 35;
  return `<path d="M640 ${y}C770 ${y} 760 ${600 - y} 900 315S1040 315 1140 315" fill="none" stroke="#bdb8aa" stroke-width="1"/>`;
}).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f4f2eb"/>
<path d="M78 47v44M61 57h34M66 69h24M71 81h14" fill="none" stroke="#be4625" stroke-width="4"/>
<text x="112" y="84" font-family="Helvetica,Arial,sans-serif" font-size="43" font-weight="600" fill="#252a24">totem.</text>
<text x="60" y="215" font-family="monospace" font-size="14" letter-spacing="2" fill="#be4625">AI FOR STATE TRANSITIONS</text>
<text x="55" y="310" font-family="Georgia,serif" font-size="68" fill="#252a24">A different state.</text>
<text x="55" y="395" font-family="Georgia,serif" font-size="66" fill="#252a24">The same<tspan dx="14" font-style="italic" fill="#be4625">direction.</tspan></text>
${paths}
<circle cx="1080" cy="315" r="100" fill="none" stroke="#d9d9cf"/>
<path d="M1080 230V400M1046 267h68M1055 315h50M1065 363h30" fill="none" stroke="#be4625" stroke-width="7"/>
<path d="M60 548H1140" stroke="#d9d9cf"/>
<text x="60" y="582" font-family="monospace" font-size="13" fill="#6b6d63">INTELLIGENCE. ATTENTION. TRANSITION.</text>
<text x="1140" y="582" text-anchor="end" font-family="monospace" font-size="13" fill="#6b6d63">TOTEM</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og.png');
await sharp(await readFile('public/favicon.svg')).resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('Generated Totem social image and touch icon.');
