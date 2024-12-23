import React from "react";
import logo from "../assets/broomstick.png";
import styles from "../styles/header.module.scss";

function ResponsiveAppBar() {
    const handleClick = () => {
      window.location.href = '/';
    };

    return (
      // <div className={styles.container} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className={styles.container}>
        <img src={logo} alt="Magical Companion" className={styles.logo} onClick={handleClick} style={{cursor: 'pointer'}}/>
        <div className={styles.heading} onClick={handleClick} style={{cursor: 'pointer'}}>Magical Companion</div>
      </div>
    );
}

export default ResponsiveAppBar;
