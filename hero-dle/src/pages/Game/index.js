import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import GuessTable from "../../components/GuessTable";
import WinCard from "../../components/WinCard";
import Title from "../../components/Title";
import styles from './styles.module.css';

function Game({ type, univers, externalTarget, externalHeroes, setMode }) {
  const [target, setTarget] = useState(externalTarget || null);
  const [allHeros, setAllHeros] = useState(externalHeroes || []);
  const [guesses, setGuesses] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(!externalTarget);

  useEffect(() => {
    if (type === "solo") {
      fetchSoloGame();
    }
  }, [type, univers]);

  const fetchSoloGame = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3001/createGame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "solo", univers })
    });
    const data = await res.json();
    setTarget(data.target);
    setAllHeros(data.allHeroes);
    setLoading(false);
  };

  const handleGuess = (nom) => {
    const hero = allHeros.find(h => h.nom === nom);
    if (hero && !guesses.some(g => g.id === hero.id)) {
      setGuesses(prev => [hero, ...prev]);
      setAttempts(prev => prev + 1);
    }
  };

  if (loading) return <div className={styles.loading}>Chargement...</div>;

  const isWin = guesses.some(g => g.id === target?.id);

  return (
    <div className={styles.gameContainer}>
      <Title title={type === "multi" ? "Duel Multijoueur" : "Partie Solo"} badgeText={univers} />
      
      {!isWin && (
        <SearchBar onGuess={handleGuess} guesses={guesses} allHeroes={allHeros} />
      )}

      {target && <GuessTable guesses={guesses} target={target} />}

      {isWin && (
        <WinCard 
          hero={target} 
          attempts={attempts} 
          onRestart={() => setMode("home")} 
        />
      )}
    </div>
  );
}

export default Game;