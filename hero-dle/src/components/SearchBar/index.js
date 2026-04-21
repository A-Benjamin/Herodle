import { useState } from "react";
import styles from "./styles.module.css";

/**
 * Composant SearchBar - Gère la saisie utilisateur et l'autocomplétion des héros.
 * * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.onGuess - Fonction appelée lorsqu'un héros est sélectionné (envoie le nom au parent).
 * @param {Array<Object>} [props.guesses=[]] - Liste des héros déjà devinés pour les exclure des suggestions.
 * @param {Array<Object>} [props.allHeroes=[]] - Liste complète des héros disponibles dans l'univers sélectionné.
 * * @returns {JSX.Element} Un champ de recherche avec une liste de suggestions dynamique.
 */
function SearchBar({ onGuess, guesses = [], allHeroes = [] }) {

  const [input, setInput] = useState("");

  /**
   * Logique de filtrage des suggestions :
   * 1. Filtre par le début du nom (insensible à la casse).
   * 2. Exclut les héros déjà présents dans la liste des tentatives (guesses).
   * 3. Limite les résultats aux 5 premiers pour la lisibilité.
   */
  const filtered = (allHeroes || [])
    .filter(hero =>
      hero?.nom?.toLowerCase().startsWith(input.toLowerCase())
    )
    .filter(hero =>
      !guesses.some(g => g.nom === hero.nom)
    )
    .slice(0, 5);

  /**
   * Gère la sélection d'un héros dans la liste.
   * @param {Object} hero - L'objet héros sélectionné.
   */
  const handleSelect = (hero) => {
    onGuess(hero.nom);
    setInput("");
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Rechercher un héros..."
      />

      {input && filtered.length > 0 && (
        <ul className={styles.autocompleteList}>
          {filtered.map(hero => (
            <li key={hero.id} onClick={() => handleSelect(hero)} className={styles.autocompleteItem}>
              <div className={styles.divImg}>
                <img src={hero.img} className={styles.miniImg} />
              </div>
              <span>{hero.nom}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;