import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "../components/header";
import BackButton from "../components/backbtn";
import styles from "../styles/CharacterInfo.module.scss";
import { LoadingSkeleton } from '../components/LoadingSkeleton';

const CharacterInfo = () => {
    const { name } = useParams();
    const [characterInfo, setCharacterInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // Add loading state

    useEffect(() => {
        fetchCharacterInfo();
    }, []);

    const fetchCharacterInfo = async () => {
        try {
            setIsLoading(true);  // Set loading true before fetch
            const response = await axios.get(
                `https://magical-companion-api.vercel.app/characters/${name}`
            );
            setCharacterInfo(response.data);
        } catch (error) {
            console.error("Error fetching characters:", error);
        } finally {
            setIsLoading(false);  // Set loading false after fetch
        }
    };

    return (
        <div>
            <ResponsiveAppBar />
            <BackButton />
            <div className={styles.container}>
                <h2 className={styles.title}>Character Information</h2>
                {isLoading ? (
                    <LoadingSkeleton type="character" />
                ) : characterInfo ? (
                    <div className={styles.characterCard}>
                        <div className={styles.imageContainer}>
                            <img 
                                src={characterInfo.image_url} 
                                alt={characterInfo.name} 
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                                }}
                            />
                        </div>
                        <div className={styles.characterInfo}>
                            <h3>{characterInfo.name}</h3>
                            {characterInfo.alternate_names && characterInfo.alternate_names.length > 0 && (
                                <div className={styles.alternateNames}>
                                    Also known as: {characterInfo.alternate_names.join(", ")}
                                </div>
                            )}
                            
                            <div className={styles.attributeGrid}>
                                {characterInfo.house && <p><strong>House:</strong> {characterInfo.house}</p>}
                                {characterInfo.dateOfBirth && <p><strong>Birth Date:</strong> {characterInfo.dateOfBirth}</p>}
                                {characterInfo.species && <p><strong>Species:</strong> {characterInfo.species}</p>}
                                {characterInfo.gender && <p><strong>Gender:</strong> {characterInfo.gender}</p>}
                                {characterInfo.ancestry && <p><strong>Ancestry:</strong> {characterInfo.ancestry}</p>}
                                {characterInfo.eyeColour && <p><strong>Eye Color:</strong> {characterInfo.eyeColour}</p>}
                                {characterInfo.hairColour && <p><strong>Hair Color:</strong> {characterInfo.hairColour}</p>}
                                {characterInfo.patronus && <p><strong>Patronus:</strong> {characterInfo.patronus}</p>}
                            </div>

                            {characterInfo.wand && (
                                <div className={styles.infoSection}>
                                    <div className={styles.wandInfo}>
                                        <h4>Wand</h4>
                                        <p><strong>Wood:</strong> {characterInfo.wand.wood}</p>
                                        <p><strong>Core:</strong> {characterInfo.wand.core}</p>
                                        <p><strong>Length:</strong> {characterInfo.wand.length} inches</p>
                                    </div>
                                </div>
                            )}

                            <div className={styles.infoSection}>
                                <p>
                                    <strong>Hogwarts:</strong> {' '}
                                    {characterInfo.hogwartsStudent ? 'Student' : 
                                     characterInfo.hogwartsStaff ? 'Staff' : 'Not Affiliated'}
                                </p>
                                {characterInfo.actor && (
                                    <p><strong>Portrayed by:</strong> {characterInfo.actor}</p>
                                )}
                                <p><strong>Status:</strong> {characterInfo.alive ? 'Alive' : 'Deceased'}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Error loading character information.</p>
                )}
            </div>
        </div>
    );
};

export default CharacterInfo;
