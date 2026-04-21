import React from 'react';
import styles from './styles.module.css';

/**
 * Composant Title - Affiche le titre principal du jeu avec un style Neo-Brutaliste.
 * Il gère également un badge optionnel via un pseudo-élément CSS.
 * * @param {Object} props - Les propriétés du composant.
 * @param {string} props.title - Le texte principal à afficher dans la balise <h1>.
 * @param {string} [props.badgeText] - Le texte à afficher dans le badge (ex: "OW", "DC"). 
 * S'il est présent, il est injecté dans une variable CSS utilisée par le ::after.
 * * @returns {JSX.Element} Un header contenant le titre stylisé et son badge dynamique.
 */
const Title = ({
    title,
    badgeText
}) => {
    return (
        <header>
            <h1
                className={`title ${styles.title}`}
                style={badgeText ? { '--badge-content': `"${badgeText}"` } : {}}
            >
                {title}
            </h1>
        </header>
    );
};

export default Title;