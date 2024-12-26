import React from "react";
import styles from "../styles/home.module.scss";
import ResponsiveAppBar from "../components/header";
import ActionAreaCard from "../components/homecards";

const HomePage = () => {
    return (
        <div className={styles.container}>
            <ResponsiveAppBar />
            <div className={styles.heading}>Welcome to Magical Companion!</div>
            <div className={styles.cardGrid}>
                <ActionAreaCard />
            </div>
        </div>
    );
};

export default HomePage;
