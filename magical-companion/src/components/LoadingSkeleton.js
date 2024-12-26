import React from "react";
import styles from "../styles/LoadingSkeleton.module.scss";

export const LoadingSkeleton = ({ type }) => {
    if (type === "book") {
        return (
            <div className={styles.skeletonCard}>
                <div className={styles.imageBox}></div>
                <div className={styles.content}>
                    <div className={styles.titleBox}></div>
                    <div className={styles.textBox}></div>
                    <div className={styles.textBox}></div>
                    <div className={styles.textBox}></div>
                    <div className={styles.longBox}></div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.skeletonCard}>
            <div className={styles.imageBox}></div>
            <div className={styles.content}>
                <div className={styles.titleBox}></div>
                <div className={styles.textRow}>
                    <div className={styles.textBox}></div>
                    <div className={styles.textBox}></div>
                </div>
                <div className={styles.textRow}>
                    <div className={styles.textBox}></div>
                    <div className={styles.textBox}></div>
                </div>
                <div className={styles.textRow}>
                    <div className={styles.textBox}></div>
                    <div className={styles.textBox}></div>
                </div>
            </div>
        </div>
    );
};
