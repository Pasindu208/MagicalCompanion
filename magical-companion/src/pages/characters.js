import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/header";
import axios from "axios";
import { Link } from "react-router-dom";
import CharacterCardSkeleton from "../components/CharacterCardSkeleton";
import styles from '../styles/characters.module.scss';
import BackButton from "../components/backbtn";
import Search from "../components/search";

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const fetchAllCharacters = async () => {
        try {
            const response = await axios.get(
                "https://magical-companion-api.vercel.app/characters"
            );
            console.log(response.data);
            setCharacters(response.data);
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    };

    const handleSearch = (searchTerm) => {
        setIsSearching(searchTerm.length > 0);
        const filtered = characters.filter(character => {
            if (!character) return false;
            
            const nameMatch = character.name && 
                character.name.toLowerCase().includes(searchTerm.toLowerCase());
            
            const alternateMatch = character.alternate_names && 
                character.alternate_names.some(altName => 
                    altName.toLowerCase().includes(searchTerm.toLowerCase())
                );
            
            return nameMatch || alternateMatch;
        });
        setFilteredCharacters(filtered);
    };

    useEffect(() => {
        fetchAllCharacters();
    }, []);

    return (
        <div>
            <ResponsiveAppBar />
            <BackButton />
            <Search onSearch={handleSearch} pageName="Characters"/>
            {characters?.length === 0 ? (
                <div className={styles.loadingContainer}>
                    {[...Array(8)].map((_, index) => (
                        <CharacterCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <>
                    {isSearching && filteredCharacters.length === 0 ? (
                        <div className={styles.noResults}>
                            <p>No characters found matching your search.</p>
                        </div>
                    ) : (
                        <div className={styles.charactersContainer}>
                            {(filteredCharacters.length > 0 ? filteredCharacters : characters).map((character) => (
                                <Link key={character.id} to={`/characters/${character.name}`}>
                                    <div className={styles.card}>
                                        <img 
                                            src={character.image_url || 'https://via.placeholder.com/200x200?text=No+Image'} 
                                            alt={character.name}
                                            className={styles.characterImage}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                                            }}
                                        />
                                        <h2 className={styles.characterName}>{character.name}</h2>
                                        {/* {character.house && (
                                            // <p className={styles.characterInfo}>
                                            //     House: {character.house}
                                            // </p>
                                        )} */}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Characters;
