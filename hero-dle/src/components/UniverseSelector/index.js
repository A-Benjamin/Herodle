import styles from './styles.module.css';

/**
 * Composant UniverseSelector - Permet à l'utilisateur de choisir l'univers de jeu.
 * Affiche une grille de boutons stylisés avec icônes et gère l'état actif.
 * * @param {Object} props - Les propriétés du composant.
 * @param {Array<Object>} props.universList - Liste des univers disponibles (ex: {id, name, icon}).
 * @param {string} props.currentUnivers - L'ID de l'univers actuellement sélectionné.
 * @param {Function} props.onSelect - Fonction de rappel pour changer d'univers (reçoit l'id en argument).
 * * @returns {JSX.Element} Une interface de sélection en grille avec retour visuel sur l'élément actif.
 */
function UniverseSelector({ universList, currentUnivers, onSelect }) {

  return (
    <div className={styles.univers}>
      <p className={styles.title}>Sélectionne ton univers</p>
      <div className={styles.universGrid}>
        {universList.map((u) => (
          <button
            key={u.id}
            onClick={() => onSelect(u.id)}
            className={`${styles.universBtn} ${currentUnivers === u.id ? styles.active : ""
              }`}
          >
            <span className={styles.uIcon}>{u.icon}</span>
            <span className={styles.uName}>{u.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default UniverseSelector;