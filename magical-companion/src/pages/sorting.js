import React from "react";
import ResponsiveAppBar from "../components/header";
import SortingQ from "../components/sortingq";
import BackButton from "../components/backbtn";
import styles from "../styles/sorting.module.css";

const SortingHat = () => {
    return (
        <div className={styles.sorting}>
            <ResponsiveAppBar />
            <BackButton />
            <h1 className="heading">Sorting Hat</h1>
            <SortingQ />
        </div>
    );
};

export default SortingHat;
