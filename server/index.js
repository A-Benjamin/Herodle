import express from "express";
import cors from "cors";
import ow from "./data/ow.js";
import marvelHeros from "./data/marvel.js";
import dcHeros from "./data/dc.js";

const app = express();
app.use(cors());
app.use(express.json());

const universes = {
  overwatch: ow.map((h, i) => ({ id: `ow-${i}`, ...h, universe: "overwatch" })),
  marvel: marvelHeros.map((h, i) => ({ id: `mar-${i}`, ...h, universe: "marvel" })),
  dc: dcHeros.map((h, i) => ({ id: `dc-${i}`, ...h, universe: "dc" }))
};

const games = {};

// Création de partie (Solo ou Multi)
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

// Rejoindre une partie
app.get("/joinGame/:code", (req, res) => {
  const code = req.params.code.toUpperCase();
  const game = games[code];
  if (!game) return res.status(404).json({ error: "Partie non trouvée" });

  game.players = 2; // On déclenche le statut "ready" pour le créateur
  res.json({ target: game.target, allHeroes: game.allHeroes, univers: game.univers });
});

// Vérification du statut (Polling pour le créateur)
app.get("/checkStatus/:code", (req, res) => {
  const game = games[req.params.code.toUpperCase()];
  if (game && game.players >= 2) {
    res.json({ ready: true, target: game.target, allHeroes: game.allHeroes, univers: game.univers });
  } else {
    res.json({ ready: false });
  }
});

app.listen(3001, () => console.log("🚀 Serveur prêt sur http://localhost:3001"));