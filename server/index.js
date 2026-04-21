import express from "express";
import cors from "cors";
import ow from "./data/ow.js";
import marvelHeros from "./data/marvel.js";
import dcHeros from "./data/dc.js";

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

const universes = {
  overwatch: ow.map((h, i) => ({ id: `ow-${i}`, ...h, universe: "overwatch" })),
  marvel: marvelHeros.map((h, i) => ({ id: `mar-${i}`, ...h, universe: "marvel" })),
};

const games = {};

app.get("/universes", (req, res) => {
  const menuData = [
    { id: "overwatch", name: "Overwatch", img: "https://img.icons8.com/?size=100&id=63667&format=png&color=000000" },
    { id: "marvel", name: "Marvel", img: "https://img.icons8.com/?size=100&id=rPcdh4Z53kzY&format=png&color=000000" },
  ];
  res.json(menuData);
});

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur prêt sur le port ${PORT}`);
});