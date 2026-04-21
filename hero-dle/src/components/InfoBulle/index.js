import styles from './styles.module.css';

/**
 * Composant InfoBulle - Affiche un texte de soutien ou un sous-titre stylisé.
 * Utilisé généralement sous le titre principal pour donner du contexte (ex: le nom de l'univers).
 * * @param {Object} props - Les propriétés du composant.
 * @param {string|React.ReactNode} props.subtitle - Le contenu textuel ou l'élément à afficher dans la bulle.
 * * @returns {JSX.Element} Un conteneur avec un arrière-plan semi-transparent et un texte en majuscules.
 */
function InfoBulle ({subtitle}) {

    return (
        <div className={styles.subtitle}>
            {subtitle}
        </div>
    )

};

export default InfoBulle;