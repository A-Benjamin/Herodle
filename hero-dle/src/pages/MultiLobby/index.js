import { useState, useEffect } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import styles from "./styles.module.css";

const API_URL = process.env.REACT_APP_API_URL || "https://herodle.onrender.com";

function MultiLobby({ setMode, univers, onGameReady }) {
  const [inputCode, setInputCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval;
    if (generatedCode) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`${API_URL}/checkStatus/${generatedCode}`);
          const data = await res.json();
          if (data.ready) {
            clearInterval(interval);
            onGameReady(data);
          }
        } catch (e) { console.error("Erreur status"); }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [generatedCode, onGameReady]);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/createGame`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "multi", univers })
      });
      const data = await res.json();
      setGeneratedCode(data.code);
    } catch (err) { alert("Erreur réseau"); }
    finally { setLoading(false); }
  };

  const handleJoin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/joinGame/${inputCode}`);
      if (res.ok) {
        const data = await res.json();
        onGameReady(data);
      } else { alert("Code invalide"); }
    } catch (err) { alert("Erreur réseau"); }
    finally { setLoading(false); }
  };

  return (
    <div className={styles.lobbyContainer}>
      <Title title={"Multijoueur"} badgeText={generatedCode ? "En attente..." : "Lobby"} />

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Créer une partie</h2>
        {!generatedCode ? (
          <Button onclick={handleCreate} texte={loading ? "Génération..." : "Générer un code"} bgcolor={"#22c55e"} />
        ) : (
          <div className={styles.codeZone}>
            <p>Code à partager :</p>
            <div className={styles.bigCode}>{generatedCode}</div>
            <div className={styles.loader}></div>
          </div>
        )}
      </div>

      <div className={styles.divider}>OU</div>

      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Rejoindre</h2>
        <input
          className={styles.codeInput}
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value.toUpperCase())}
          placeholder="CODE"
          maxLength={4}
        />
        <Button onclick={handleJoin} texte="Rejoindre" bgcolor={"#3b82f6"} disabled={inputCode.length < 4} />
      </div>

      <button className={styles.backButton} onClick={() => setMode("home")}>Retour</button>
    </div>
  );
}

export default MultiLobby;