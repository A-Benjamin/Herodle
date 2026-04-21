import { useState } from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import MultiLobby from "./pages/MultiLobby";
import "./styles.css";

function App() {
  const [mode, setMode] = useState("home");
  const [univers, setUnivers] = useState("overwatch");
  const [multiData, setMultiData] = useState(null);

  const startMultiGame = (data) => {
    setMultiData(data);
    setMode("game-multi");
  };

  return (
    <div className="app">
      {mode === "home" && (
        <Home setMode={setMode} setUnivers={setUnivers} univers={univers} />
      )}

      {mode === "solo" && (
        <Game type="solo" univers={univers} setMode={setMode} />
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
          setMode={setMode} 
        />
      )}
    </div>
  );
}

export default App;