// Verified source of the Angry Birds kid / EthanGamer death-stare meme.
// The wall contains 50 visual remixes of this clip. Replace individual src values
// below if you want distinct clips. Local files can live in public/memes/.
const original = {
  src: "https://media.tenor.com/dvarnUFjsFYAAAAM/angry-kid-ethangamer.gif",
  source: "https://tenor.com/view/angry-kid-ethangamer-angry-birds-death-stare-little-kid-gif-8572227632641585238",
  alt: "EthanGamer giving an angry death stare",
};

export const memes = Array.from({ length: 50 }, (_, index) => ({
  ...original,
  id: String(index + 1).padStart(2, "0"),
  variant: index % 10,
}));
