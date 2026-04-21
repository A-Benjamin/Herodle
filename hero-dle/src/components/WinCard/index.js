import styles from "./styles.module.css";

/**
 * Composant WinCard - Fenêtre modale de victoire affichée lorsque le joueur trouve le héros.
 * Présente le héros gagnant, son image avec un effet visuel, et le score final.
 * * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.hero - L'objet contenant les informations du héros victorieux.
 * @param {string} props.hero.name - Le nom du héros à afficher.
 * @param {string} props.hero.image - L'URL de l'image du héros.
 * @param {number} props.attempts - Le nombre total de tentatives effectuées pour gagner.
 * * @returns {JSX.Element} Une superposition (overlay) contenant la carte de victoire animée.
 */
function WinCard({ hero, attempts }) {
  
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.confetti} aria-hidden="true" />
        
        <div className={styles.header}>
          <h2 className={styles.title}>
            Bravo, tu as trouvé <span className={styles.heroName}>{hero.name}</span> !
          </h2>
        </div>

        <div className={styles.imageContainer}>
          <img
            src={hero.img}
            alt={hero.name}
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.imageGlow} />
        </div>

        {attempts && (
          <div className={styles.stats}>
            <p className={styles.attemptsText}>
              Trouvé en <strong>{attempts}</strong> {attempts === 1 ? 'coup' : 'coups'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WinCard;