import React from "react";
import styles from "../styles/home.module.scss";
import ResponsiveAppBar from "../components/header";
import ActionAreaCard from "../components/homecards";

const HomePage = () => {
    return (
        <div className={styles.container}>
            <ResponsiveAppBar />
            <div className={styles.hero}>
                <h1 className={styles.heading}>Welcome to Magical Companion!</h1>
                <p className={styles.description}>
                    Your ultimate tool for managing and organizing all your magical adventures.
                    Keep track of your spells, inventory, and companions all in one place.
                </p>
            </div>
            <div className={styles.mainContent}>
                <ActionAreaCard />
            </div>
        </div>
    );
};

export default HomePage;
