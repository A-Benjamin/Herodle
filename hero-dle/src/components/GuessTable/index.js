import GuessRow from "../GuessRow";
import styles from "./styles.module.css";

/** * Liste des propriétés de l'objet héros qui ne doivent pas être affichées 
 * dans les colonnes du tableau (données techniques ou images).
 */
const EXCLUDED_KEYS = ["id", "img"];

/**
 * Composant GuessTable - Gère la structure globale du tableau de tentatives.
 * Il extrait dynamiquement les en-têtes à partir du héros cible et 
 * orchestre l'affichage des lignes de résultats.
 * * @param {Object} props - Les propriétés du composant.
 * @param {Array<Object>} props.guesses - Liste des héros déjà proposés par le joueur.
 * @param {Object} props.target - Le héros mystère à deviner (sert de référence pour les colonnes).
 * * @returns {JSX.Element} Un conteneur stylisé incluant un tableau avec en-têtes et lignes animées.
 */
function GuessTable({ guesses, target }) {

  /**
   * Génère dynamiquement la liste des noms de colonnes.
   * On prend toutes les clés du héros cible, sauf celles présentes dans EXCLUDED_KEYS.
   */
  const columns = Object.keys(target).filter(key => !EXCLUDED_KEYS.includes(key));

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(key => (
              <th key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {guesses.map((guess) => (
            <GuessRow
              key={guess.id}
              guess={guess}
              target={target}
              columns={columns}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuessTable;