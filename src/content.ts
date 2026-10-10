export const site = {
  name: "Totem", domain: "epignos.dev", url: "https://epignos.dev",
  title: "Totem — Intelligence that moves you",
  description: "You choose the goal. AI drives the transition. Totem explores a new vocabulary for moving between states, supported by Epignos’s research into understanding the mind.",
  ogImage: "/og.png", epinote: "https://epinote.epignos.dev",
};
export const recordings = [
  {
    name: "Electronic", file: "/audio/electronic.mp3", number: "01",
    description: "A restrained pulse builds tension, then arrives at a sustained, driving rhythm. This version asks whether sound alone can carry the intended move.",
    phases: [
      { time: "0–4s", name: "Restrained pulse", duration: 4 },
      { time: "4–14s", name: "Raise tension", duration: 10 },
      { time: "14–40s", name: "Sustain the drive", duration: 26 },
    ],
  },
  {
    name: "Sitar", file: "/audio/sitar.mp3", number: "02",
    description: "Sparse sitar phrases make room for a growing pulse, followed by faster plucking and driving tabla. The same intended transition is explored through a different musical texture.",
    phases: [
      { time: "0–8s", name: "Sparse opening", duration: 8 },
      { time: "8–20s", name: "Pulse enters", duration: 12 },
      { time: "20–40s", name: "Sustain intensity", duration: 20 },
    ],
  },
  {
    name: "Voice + music", file: "/audio/voice.mp3", number: "03",
    description: "Spoken language sits over a musical rise. The voice frames the lack of challenge and invites a more demanding next action, while the music builds and settles into a pulse.",
    phases: [
      { time: "0–10s", name: "Flat", duration: 10 },
      { time: "10–28s", name: "Rise", duration: 18 },
      { time: "28–40s", name: "Hold the pulse", duration: 12 },
    ],
  },
];
