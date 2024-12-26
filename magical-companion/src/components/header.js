import React from "react";
import logo from "../assets/broomstick.png";
import styles from "../styles/header.module.scss";

function ResponsiveAppBar() {
    const handleNavigation = (e) => {
        window.location.href = '/';
    };

    return (
        <header className={styles.container}>
            <button 
                onClick={handleNavigation}
                className={styles.logo}
                aria-label="Home"
                style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer'
                }}
            >
                <img src={logo} alt="Magical Companion Logo" className={styles.logo} />
            </button>
            <h1 
                onClick={handleNavigation}
                className={styles.heading}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleNavigation()}
            >
                Magical Companion
            </h1>
        </header>
    );
}

export default ResponsiveAppBar;
