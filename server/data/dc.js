const heroesData = [
  // ==================== MARVEL ====================
  { nom: "Spider-Man", universe: "Marvel", type: "Humain muté", role: "Justicier", power: "Agilité, toile, sens d'araignée", origin: "New York, USA", image: "https://i.pinimg.com/736x/23/1c/82/231c82d778f88c98f392b07c779579cb.jpg" },
  { nom: "Iron Man", universe: "Marvel", type: "Humain technologique", role: "Protecteur", power: "Armure, vol, intelligence", origin: "Long Island, USA", image: "https://e0.pxfuel.com/wallpapers/154/666/desktop-wallpaper-iron-man-marvel-comics-simple-background-white-background.jpg" },
  { nom: "Captain America", universe: "Marvel", type: "Super-soldat", role: "Leader", power: "Force, endurance, bouclier", origin: "Brooklyn, USA", image: "https://www.shutterstock.com/image-vector/captain-america-stand-walk-art-600nw-2291276013.jpg" },
  { nom: "Thor", universe: "Marvel", type: "Dieu", role: "Guerrier", power: "Foudre, marteau, force divine", origin: "Asgard", image: "https://static.wikia.nocookie.net/charabattles/images/b/ba/THOR.png/revision/latest?cb=20171114181053&path-prefix=fr" },
  { nom: "Black Panther", universe: "Marvel", type: "Humain amélioré", role: "Roi", power: "Agilité, costume vibranium", origin: "Wakanda", image: "https://www.nautiljon.com/images/perso/00/05/black_panther_15650.jpg" },
  { nom: "Scarlet Witch", universe: "Marvel", type: "Humaine mutée", role: "Sorcier", power: "Magie du chaos, télépathie", origin: "Sokovie", image: "https://i.pinimg.com/originals/8a/05/29/8a052960655618584856f663f707f154.jpg" },

  // ==================== DC COMICS ====================
  { nom: "Batman", universe: "DC", type: "Humain", role: "Justicier", power: "Intelligence, gadgets, combat", origin: "Gotham City", image: "https://www.shutterstock.com/image-photo/batman-figure-photography-06012025-england-600nw-2567533969.jpg" },
  { nom: "Superman", universe: "DC", type: "Kryptonien", role: "Protecteur", power: "Vol, force, laser", origin: "Krypton", image: "https://www.shutterstock.com/image-vector/superman-art-design-vector-super-600nw-2392947697.jpg" },
  { nom: "Wonder Woman", universe: "DC", type: "Demi-déesse", role: "Guerrière", power: "Force, lasso, bracelets", origin: "Themyscira", image: "https://static.fnac-static.com/multimedia/PE/Images/FR/NR/3f/6c/da/14314559/1507-1/tsp20240330082824/Wonder-Woman-Cahier-n-1.jpg" },
  { nom: "The Flash", universe: "DC", type: "Humain accéléré", role: "Justicier", power: "Super vitesse, réflexes", origin: "Central City", image: "https://media.posterstore.com/site_images/68631eb87d2ae084e1828114_1669112839_WB0143-8.jpg" },
  { nom: "Joker", universe: "DC", type: "Humain", role: "Criminel", power: "Chaos, génie tactique", origin: "Gotham City", image: "https://i.pinimg.com/originals/4e/6e/82/4e6e82811776518a995392686127415d.jpg" },

  // ==================== STAR WARS ====================
  { nom: "Luke Skywalker", universe: "Star Wars", type: "Humain", role: "Jedi", power: "La Force, sabre laser", origin: "Tatooine", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0V10zHk-zXF6uB2h9fBq-XGf_C-nC0_pA7Q&s" },
  { nom: "Dark Vador", universe: "Star Wars", type: "Cyborg", role: "Seigneur Sith", power: "La Force, sabre laser", origin: "Tatooine", image: "https://images.unsplash.com/photo-1546561892-65bf811416b9?w=200" },
  { nom: "Yoda", universe: "Star Wars", type: "Inconnu", role: "Maître Jedi", power: "La Force, sagesse", origin: "Inconnue", image: "https://www.nautiljon.com/images/perso/00/01/yoda_16100.jpg" },

  // ==================== MANGA / ANIME ====================
  { nom: "Goku", universe: "Dragon Ball Z", type: "Saiyan", role: "Guerrier", power: "Énergie, transformations", origin: "Planète Vegeta", image: "https://www.shutterstock.com/image-photo/draw-goku-dragon-ball-z-600nw-2730522731.jpg" },
  { nom: "Luffy", universe: "One Piece", type: "Humain élastique", role: "Pirate", power: "Élasticité, Haki", origin: "Village de Fuchsia", image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200" },
  { nom: "Naruto Uzumaki", universe: "Naruto", type: "Humain", role: "Hokage", power: "Clones, Rasengan", origin: "Konoha", image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=200" },
  { nom: "Saitama", universe: "One Punch Man", type: "Humain", role: "Héros", power: "Force absolue", origin: "Ville Z", image: "https://i.pinimg.com/736x/41/65/d3/4165d3a51059f302066c078028f00030.jpg" },
  { nom: "Tanjiro", universe: "Demon Slayer", type: "Humain", role: "Pourfendeur", power: "Respiration de l'eau", origin: "Mont Kumotori", image: "https://www.iamfy.co/cdn/shop/files/m_2Fx1000_2F64ceae43-27b5-4845-8e77-d6a06980b68b_d62075bc-e2d6-4a69-ab28-fce7d02479a9.jpg?v=1760600516" },

  // ==================== JEUX VIDÉO ====================
  { nom: "Mario", universe: "Nintendo", type: "Humain", role: "Plombier", power: "Saut, Power-ups", origin: "Royaume Champignon", image: "https://static.wikia.nocookie.net/heros/images/9/94/Mario_and_Sonic_Tokyo_2020_Mario_artwork.png/revision/latest?cb=20210410003745&path-prefix=fr" },
  { nom: "Link", universe: "Nintendo", type: "Hylien", role: "Héros", power: "Épée, bouclier, magie", origin: "Hyrule", image: "https://media.ouest-france.fr/v1/pictures/MjAyMzEyNGI3YWQ1OWViMzQ1MTkxNGRiZjI1MWQzOTcwZTcwYWY?width=1260&height=708&client_id=bpeditorial" },
  { nom: "Pikachu", universe: "Pokémon", type: "Souris électrique", role: "Compagnon", power: "Électricité", origin: "Kanto", image: "https://st5.depositphotos.com/25378918/72326/v/450/depositphotos_723265704-stock-illustration-smiling-pikachu-pokmon-series-its.jpg" },
  { nom: "Sonic", universe: "Sega", type: "Hérisson", role: "Héros", power: "Super vitesse", origin: "Christmas Island", image: "https://upload.wikimedia.org/wikipedia/fr/b/ba/Project_Sonic_Logo.svg" },
  { nom: "Kratos", universe: "God of War", type: "Demi-dieu", role: "Guerrier", power: "Force, Lames du Chaos", origin: "Sparte", image: "https://i.pinimg.com/originals/81/2a/39/812a392a95c4794174092b704c382104.jpg" },
  { nom: "Master Chief", universe: "Halo", type: "Humain amélioré", role: "Soldat", power: "Armure MJOLNIR", origin: "Eridanus II", image: "https://i.pinimg.com/736x/87/b8/b5/87b8b548b6131f49618f080775d5069b.jpg" },

  // ==================== CINÉMA & DIVERS ====================
  { nom: "Harry Potter", universe: "Wizarding World", type: "Humain", role: "Sorcier", power: "Magie, vol", origin: "Godric's Hollow", image: "https://i.pinimg.com/originals/30/92/7d/30927d1952a550ed27b409f029a149f1.jpg" },
  { nom: "Gandalf", universe: "Le Seigneur des Anneaux", type: "Maia", role: "Magicien", power: "Magie, sagesse", origin: "Terres Immortelles", image: "https://i.pinimg.com/originals/60/7b/72/607b72807f7633e9b1062b0833b378f4.jpg" },
  { nom: "Lara Croft", universe: "Tomb Raider", type: "Humaine", role: "Archéologue", power: "Combat, agilité", origin: "Londres", image: "https://static4.depositphotos.com/1018174/429/i/450/depositphotos_4293304-stock-photo-lara-croft-saves-the-world.jpg" }
];

export default heroesData;