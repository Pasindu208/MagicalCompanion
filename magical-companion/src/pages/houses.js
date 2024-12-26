import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ResponsiveAppBar from '../components/header';
import BackButton from '../components/backbtn';
import styles from '../styles/houses.module.scss';
import { LoadingSkeleton } from '../components/LoadingSkeleton';

const Houses = () => {
    const [houses, setHouses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('https://magical-companion-api.vercel.app/houses');
                // Fix: Access the nested houses array from the first item of the response array
                const housesData = response.data[0]?.houses || [];
                setHouses(housesData);
            } catch (error) {
                console.error('Error fetching houses:', error);
                setHouses([]); // Set empty array on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchHouses();
    }, []);

    return (
        <div>
            <ResponsiveAppBar />
            <BackButton />
            <div className={styles.container}>
                <h1 className={styles.title}>Hogwarts Houses</h1>
                {isLoading ? (
                    <LoadingSkeleton type="houses" />
                ) : houses && houses.length > 0 ? (
                    <div className={styles.housesGrid}>
                        {houses.map((house) => (
                            // Add null checks for house properties
                            <Link 
                                to={`/houses/${house?.name?.toLowerCase() || ''}`} 
                                key={house?.name || Math.random()}
                                className={styles.houseCard}
                            >
                                <div className={styles.houseContent}>
                                    {house?.image && (
                                        <div className={styles.houseImage}>
                                            <img 
                                                src={house.image} 
                                                alt={`${house.name} crest`}
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/200x200?text=No+Image";
                                                }}
                                            />
                                        </div>
                                    )}
                                    <h2>{house?.name}</h2>
                                    <div className={styles.houseDetails}>
                                        <p><strong>Founder:</strong> {house?.founder}</p>
                                        <p><strong>Animal:</strong> {house?.animal}</p>
                                        <div className={styles.colors}>
                                            <strong>Colors:</strong>
                                            {house?.colors?.map(color => (
                                                <span 
                                                    key={color} 
                                                    className={styles.colorDot}
                                                    style={{ backgroundColor: color?.toLowerCase() }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.traits}>
                                        {house?.traits?.map(trait => (
                                            <span key={trait} className={styles.trait}>
                                                {trait}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className={styles.error}>No houses found.</p>
                )}
            </div>
        </div>
    );
};

export default Houses;