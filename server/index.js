import express from "express";
import cors from "cors";
import ow from "./data/ow.js";
import marvelHeros from "./data/marvel.js";
import dcHeros from "./data/dc.js";

const app = express();

// --- MODIFICATION 1 : Le CORS ---
// On autorise Vercel à appeler cette API
app.use(cors({
  origin: "*" // Dans un premier temps pour tester, on autorise tout. 
              // Plus tard, tu mettras ton lien Vercel précis.
}));

app.use(express.json());

const universes = {
  overwatch: ow.map((h, i) => ({ id: `ow-${i}`, ...h, universe: "overwatch" })),
  marvel: marvelHeros.map((h, i) => ({ id: `mar-${i}`, ...h, universe: "marvel" })),
  dc: dcHeros.map((h, i) => ({ id: `dc-${i}`, ...h, universe: "dc" }))
};

const games = {};

// Tes routes restent les mêmes...
app.post("/createGame", (req, res) => {
  const { type, univers } = req.body;
  const heroList = universes[univers?.toLowerCase()];
  if (!heroList) return res.status(404).json({ error: "Univers inconnu" });
  const target = heroList[Math.floor(Math.random() * heroList.length)];
  if (type === "multi") {
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    games[code] = { target, univers, players: 1, allHeroes: heroList };
    return res.json({ code });
  }
  return res.json({ allHeroes: heroList, target });
});

app.get("/joinGame/:code", (req, res) => {
  const code = req.params.code.toUpperCase();
  const game = games[code];
  if (!game) return res.status(404).json({ error: "Partie non trouvée" });
  game.players = 2;
  res.json({ target: game.target, allHeroes: game.allHeroes, univers: game.univers });
});

app.get("/checkStatus/:code", (req, res) => {
  const game = games[req.params.code.toUpperCase()];
  if (game && game.players >= 2) {
    res.json({ ready: true, target: game.target, allHeroes: game.allHeroes, univers: game.univers });
  } else {
    res.json({ ready: false });
  }
});

// --- MODIFICATION 2 : Le PORT ---
// Render impose un port dynamique via process.env.PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur prêt sur le port ${PORT}`);
});