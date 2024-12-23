import React from "react";
import styles from "../styles/spells.module.scss";

const SpellCard = ({ spell }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.spellName}>{spell.spell}</h3>
            <p className={styles.spellUse}>{spell.use}</p>
        </div>
    );
};

export default SpellCard;
