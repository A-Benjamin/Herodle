import styles from "./styles.module.css";

/**
 * Détermine la classe CSS de feedback en fonction de la proximité entre la valeur devinée et la cible.
 * * @param {string|number} value - La valeur proposée par le joueur.
 * @param {string|number} target - La valeur réelle du héros à deviner.
 * @returns {string} La classe CSS correspondante : styles.correct, styles.close ou styles.wrong.
 */
const getClass = (value, target) => {
  if (value === undefined || target === undefined) return "";

  const v = value.toString().toLowerCase().trim();
  const t = target.toString().toLowerCase().trim();

  if (v === t) return styles.correct;
  if (v.includes(t) || t.includes(v)) return styles.close;

  return styles.wrong;
};

/**
 * Composant GuessRow - Affiche une ligne de tentative dans le tableau de jeu.
 * Gère l'affichage des images, des noms, et des indicateurs de direction (flèches) pour les nombres.
 * * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.guess - Les données du héros proposé par le joueur.
 * @param {Object} props.target - Les données du héros cible à trouver.
 * @param {string[]} [props.columns=[]] - Liste des clés d'objet à afficher sous forme de colonnes.
 * * @returns {JSX.Element} Une ligne de tableau (<tr>) avec animations et feedbacks visuels.
 */
function GuessRow({ guess, target, columns = [] }) {

  return (
    <tr className={styles.row}>
      {columns.map((key, index) => {
        const val = guess[key];
        const tgt = target[key];

        return (
          <td
            key={key}
            className={getClass(val, tgt)}
            style={{ "--delay": `${index * 0.1}s` }}
          >
            {key === "nom" ? (
              <div className={styles.heroCell}>
                {guess.img &&
                  <div className={styles.divImg}>
                    <img src={guess.img} alt={guess.nom} />
                  </div>
                }
                <span className={styles.heroName}>{guess.nom}</span>
              </div>
            ) : (
              <div className={styles.cellValue}>
                <span>{val}</span>
                {typeof val === "number" && val !== tgt && (
                  <span className={styles.arrow}>{val < tgt ? "⬆️" : "⬇️"}</span>
                )}
              </div>
            )}
          </td>
        );
      })}
    </tr>
  );
}

export default GuessRow;