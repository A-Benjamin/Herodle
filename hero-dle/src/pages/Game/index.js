import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import GuessTable from "../../components/GuessTable";
import WinCard from "../../components/WinCard";
import Title from "../../components/Title";
import InfoBulle from '../../components/InfoBulle';
import Button from '../../components/Button';
import styles from './styles.module.css';

const API_URL = process.env.REACT_APP_API_URL || "https://herodle.onrender.com";

function Game({ type, univers, externalTarget, externalHeroes, setMode }) {
  // Initialisation : on prend d'abord les props, sinon on tente le localstorage
  const [target, setTarget] = useState(externalTarget || null);
  const [allHeros, setAllHeros] = useState(externalHeroes || []);
  const [guesses, setGuesses] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(!externalTarget);
  const [showExitModal, setShowExitModal] = useState(false);

  // 1. Récupération des essais sauvegardés au montage (pour le F5)
  useEffect(() => {
    const saved = localStorage.getItem("herodle_save");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.guesses) {
        setGuesses(data.guesses);
        setAttempts(data.guesses.length);
      }
    }
  }, []);

  // 2. Fetch du héros à trouver (Uniquement en mode Solo neuf)
  useEffect(() => {
    const fetchSoloGame = async () => {
      // Si on a déjà une cible (via props ou save), on ne fetch pas
      if (target) return;

      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/createGame`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "solo", univers })
        });
        const data = await res.json();
        setTarget(data.target);
        setAllHeros(data.allHeroes);
      } catch (err) {
        console.error("Erreur serveur:", err);
      } finally {
        setLoading(false);
      }
    };

    if (type === "solo" || !target) {
      fetchSoloGame();
    }
  }, [type, univers, target]);

  // 3. Logique de Victoire
  const isWin = guesses.some(g => g.id === target?.id);

  // 4. SAUVEGARDE AUTOMATIQUE (C'est ici que la magie opère)
  useEffect(() => {
    if (guesses.length > 0 && target && !isWin) {
      const saveData = {
        guesses,
        target,
        allHeroes: allHeros,
        univers: univers,
        type: type
      };
      localStorage.setItem("herodle_save", JSON.stringify(saveData));
    }

    // Si on a gagné, on vide la sauvegarde pour la prochaine partie
    if (isWin) {
      localStorage.removeItem("herodle_save");
    }
  }, [guesses, isWin, target, allHeros, univers, type]);

  const handleGuess = (nom) => {
    const hero = allHeros.find(h => h.nom === nom);
    if (hero && !guesses.some(g => g.id === hero.id)) {
      setGuesses(prev => [hero, ...prev]);
      setAttempts(prev => prev + 1);
    }
  };

  const handleBackClick = () => {
    if (guesses.length > 0 && !isWin) {
      setShowExitModal(true);
    } else {
      setMode("home");
    }
  };

  if (loading) return (
    <div className={styles.loading}>
      <InfoBulle subtitle={"Chargement de l'univers héroïque..."} />
    </div>
  );

  return (
    <div className={styles.gameContainer}>
      {/* MODAL PERSO : Apparaît seulement au clic sur Retour */}
      {showExitModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.customModal}>
            <h2 className={styles.modalTitle}>ATTENTION !</h2>
            <p className={styles.modalText}>
              Ta progression sera perdue. Es-tu sûr de vouloir abandonner ?
            </p>
            <div className={styles.modalButtons}>
              <button className={styles.confirmBtn} onClick={() => setMode("home")}>
                OUI, QUITTER
              </button>
              <button className={styles.cancelBtn} onClick={() => setShowExitModal(false)}>
                NON, RESTER
              </button>
            </div>
          </div>
        </div>
      )}

      <Title
        title={type === "multi" ? "Duel Multijoueur" : "Partie Solo"}
        badgeText={univers}
      />

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

      <Button
        onclick={handleBackClick}
        texte="← Retour"
        bgcolor="#ef4444"
        color="white"
      />

    </div>
  );
}

export default Game;