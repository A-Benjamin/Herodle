import { useState } from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import MultiLobby from "./pages/MultiLobby";
import "./styles.css";

function App() {
  // On tente de récupérer une sauvegarde pour initialiser le mode
  const [save, setSave] = useState(() => {
    const data = localStorage.getItem("herodle_save");
    return data ? JSON.parse(data) : null;
  });

  // Si une sauvegarde existe, on va directement en mode "game"
  const [mode, setMode] = useState(save ? "game" : "home");
  const [univers, setUnivers] = useState(save ? save.univers : "overwatch");
  const [multiData, setMultiData] = useState(null);

  const startMultiGame = (data) => {
    setMultiData(data);
    setMode("game-multi");
  };

  // Fonction centrale pour quitter et nettoyer la mémoire
  const exitToHome = () => {
    localStorage.removeItem("herodle_save");
    setSave(null);
    setMultiData(null);
    setMode("home");
  };

  return (
    <div className="app">
      {mode === "home" && (
        <Home setMode={setMode} setUnivers={setUnivers} univers={univers} />
      )}

      {/* Mode Solo (ou restauré) */}
      {mode === "solo" && (
        <Game 
          type="solo" 
          univers={univers} 
          setMode={exitToHome} 
        />
      )}

      {/* Mode spécial pour la restauration après rafraîchissement */}
      {mode === "game" && save && (
        <Game 
          type={save.type} 
          univers={save.univers} 
          externalTarget={save.target} 
          externalHeroes={save.allHeroes}
          setMode={exitToHome} 
        />
      )}

      {mode === "lobby" && (
        <MultiLobby 
          setMode={setMode} 
          univers={univers} 
          onGameReady={startMultiGame} 
        />
      )}

      {mode === "game-multi" && multiData && (
        <Game 
          type="multi" 
          univers={multiData.univers} 
          externalTarget={multiData.target} 
          externalHeroes={multiData.allHeroes}
          setMode={exitToHome} 
        />
      )}
    </div>
  );
}

export default App;