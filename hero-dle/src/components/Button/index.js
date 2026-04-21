import styles from './styles.module.css';

/**
 * Composant Button - Un bouton réutilisable.
 * * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.onclick - Fonction de rappel déclenchée au clic.
 * @param {React.ReactNode} [props.icon] - Icône ou Emoji à afficher avant le texte.
 * @param {string} [props.texte] - Texte à afficher à l'intérieur du bouton.
 * @param {string} [props.bgcolor] - Couleur de fond (CSS: hex, rgb, name). Par défaut: "transparent".
 * @param {string} [props.color] - Couleur du texte et de l'icône. Par défaut: "black".
 * @param {boolean} [props.disabled] - État désactivé du bouton. Par défaut: false.
 * * @returns {JSX.Element} Le bouton stylisé.
 */
function Button({ onclick, icon, texte, bgcolor, color, disabled }) {
    return (
        <button
            className={styles.button}
            onClick={onclick}
            style={{
                backgroundColor: bgcolor ? bgcolor : "transparent",
                color: color ? color : "black",
            }}
            disabled={disabled ?? false}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {texte && <span>{texte}</span>}
        </button>
    );
}

export default Button;