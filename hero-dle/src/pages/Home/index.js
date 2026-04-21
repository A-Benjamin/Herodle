import React, {useEffect, useState} from "react";
import Title from "../../components/Title";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import InfoBulle from "../../components/InfoBulle";
import UniverseSelector from "../../components/UniverseSelector";

const API_URL = process.env.REACT_APP_API_URL || "https://herodle.onrender.com";

function Home({ setMode, setUnivers, univers }) {

  const [availableUniverses, setAvailableUniverses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniverses = async () => {
      try {
        const res = await fetch(`${API_URL}/universes`);
        const data = await res.json();
        setAvailableUniverses(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des univers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUniverses();
  }, []);

  if (loading) return <div>Chargement des univers...</div>;

  return (
    <div className={styles.homeContainer}>

      <Title title={"Hérodle"} badgeText={"the game"} />
      <InfoBulle subtitle={"Devine le héros mystère"} />

      <UniverseSelector universList={availableUniverses} currentUnivers={univers} onSelect={setUnivers} />

      <div className={styles.buttons}>
        <Button
          onclick={() => setMode("solo")}
          icon={"👤"}
          texte={"Jouer en solo"}
          bgcolor={"#22c55e"}
        />

        <Button
          onclick={() => setMode("lobby")}
          icon={"⚔️"}
          texte={"Multijoueur"}
          bgcolor={"#3b82f6"}
          color={"#fff"}
        />
      </div>

      <InfoBulle
        subtitle={"Êtes vous prêt à tester votre culture geek ?"}
      />
    </div>
  );
}

export default Home;