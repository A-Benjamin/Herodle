import { useState } from "react";
import Title from "../../components/Title";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import InfoBulle from "../../components/InfoBulle";
import UniverseSelector from "../../components/UniverseSelector";

function Home({ setMode, setUnivers, univers }) {

  const universList = [
    { id: "overwatch", name: "Overwatch", icon: "🔫" },
    { id: "marvel", name: "Marvel", icon: "🦸‍♂️" },
    { id: "dc", name: "DC Comics", icon: "🦇" }
  ];

  return (
    <div className={styles.homeContainer}>

      <Title title={"Hérodle"} badgeText={"the game"} />
      <InfoBulle subtitle={"Devine le héros mystère"} />

      <UniverseSelector universList={universList} currentUnivers={univers} onSelect={setUnivers} />

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