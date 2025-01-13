import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from '../components/header';
import BackButton from '../components/backbtn';
import styles from '../styles/houseInfo.module.scss';
import { LoadingSkeleton } from '../components/LoadingSkeleton';

const HouseInfo = () => {
    const { name } = useParams();
    const [houseInfo, setHouseInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHouseInfo = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://magical-companion-api.vercel.app/houses/${name}`);
                setHouseInfo(response.data || null);
            } catch (error) {
                console.error('Error fetching house:', error);
                setHouseInfo(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHouseInfo();
    }, [name]);

    return (
        <div>
            <ResponsiveAppBar />
            <BackButton />
            <div className={styles.container}>
                <h2 className={styles.title}>House Information</h2>
                {isLoading ? (
                    <LoadingSkeleton type="house" />
                ) : houseInfo ? (
                    <div className={styles.houseInfo}>
                        <div className={styles.crest}>
                            <img 
                                src={houseInfo.image} 
                                alt={`${houseInfo.name} crest`}
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/300x300?text=No+Crest";
                                }}
                            />
                        </div>
                        <div className={styles.content}>
                            <h1>{houseInfo.name}</h1>
                            
                            <div className={styles.infoSection}>
                                <h3>House Traits</h3>
                                <div className={styles.traits}>
                                    {houseInfo.traits.map(trait => (
                                        <span key={trait} className={styles.trait}>
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <h3>Founder</h3>
                                    <p>{houseInfo.founder}</p>
                                </div>
                                <div className={styles.infoItem}>
                                    <h3>House Ghost</h3>
                                    <p>{houseInfo.ghost}</p>
                                </div>
                                <div className={styles.infoItem}>
                                    <h3>Head of House</h3>
                                    <p>{houseInfo.head_of_house}</p>
                                </div>
                                <div className={styles.infoItem}>
                                    <h3>Animal</h3>
                                    <p>{houseInfo.animal}</p>
                                </div>
                                <div className={styles.infoItem}>
                                    <h3>Common Room</h3>
                                    <p>{houseInfo.common_room_location}</p>
                                </div>
                                <div className={styles.infoItem}>
                                    <h3>Colors</h3>
                                    <div className={styles.colors}>
                                        {houseInfo.colors.map(color => (
                                            <span 
                                                key={color} 
                                                className={styles.colorDot}
                                                style={{ backgroundColor: color.toLowerCase() }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.error}>House not found</div>
                )}
            </div>
        </div>
    );
};

export default HouseInfo;