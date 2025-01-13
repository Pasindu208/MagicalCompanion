import React, { useState, useEffect } from "react";
import axios from "axios";
import ResponsiveAppBar from "../components/header";
import SpellCard from "../components/SpellCard";
import SpellCardSkeleton from "../components/SpellCardSkeleton";
import styles from "../styles/spells.module.scss";
import BackButton from "../components/backbtn";
import Search from "../components/search";

const Spells = () => {
    const [spells, setSpells] = useState([]);
    const [filteredSpells, setFilteredSpells] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const response = await axios.get(
                    "https://magical-companion-api.vercel.app/spells"
                );
                setSpells(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching spells:", error);
                setError("Failed to load spells. Please try again later.");
                setLoading(false);
            }
        };

        fetchSpells();
    }, []);

    const handleSearch = (searchTerm) => {
        setIsSearching(searchTerm.length > 0);
        const filtered = spells.filter((spell) => {
            if (!spell) return false;

            const nameMatch =
                spell.name &&
                spell.name.toLowerCase().includes(searchTerm.toLowerCase());
            const effectMatch =
                spell.effect &&
                spell.effect.toLowerCase().includes(searchTerm.toLowerCase());

            return nameMatch || effectMatch;
        });
        setFilteredSpells(filtered);
    };

    const renderSkeletons = () => {
        return Array(3)
            .fill(0)
            .map((_, index) => (
                <div key={`skeleton-${index}`}>
                    <SpellCardSkeleton />
                </div>
            ));
    };

    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div>
            <ResponsiveAppBar />
            <BackButton />
            <Search onSearch={handleSearch} pageName="spells" />
            {loading ? (
                <div className={styles.spellsContainer}>
                    {renderSkeletons()}
                </div>
            ) : (
                <>
                    {isSearching && filteredSpells.length === 0 ? (
                        <div className={styles.noResults}>
                            <p>No spells found matching your search.</p>
                        </div>
                    ) : (
                        <div className={styles.spellsContainer}>
                            {(filteredSpells.length > 0
                                ? filteredSpells
                                : spells
                            ).map((spell, index) => (
                                <div key={`${spell.spell}-${index}`}>
                                    <SpellCard spell={spell} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Spells;
