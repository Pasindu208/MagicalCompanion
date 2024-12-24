import React from "react";
import styles from "../styles/spells.module.scss";

const SpellCard = ({ spell }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.spellName}>{spell.name}</h3>
            <p className={styles.spellUse}>{spell.description}</p>
        </div>
    );
};

export default SpellCard;
