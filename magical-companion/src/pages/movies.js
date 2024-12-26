import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/header";
import axios from "axios";
import { Link } from "react-router-dom";
import CharacterCardSkeleton from "../components/CharacterCardSkeleton";
import styles from "../styles/movies.module.scss";
import BackButton from "../components/backbtn";
import Search from "../components/search";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [loadingStates, setLoadingStates] = useState({});

    const fetchAllMovies = async () => {
        try {
            const response = await axios.get(
                "https://magical-companion-api.vercel.app/movies"
            );
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const handleSearch = (searchTerm) => {
        setIsSearching(searchTerm.length > 0);
        const filtered = movies.filter((movie) => 
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMovies(filtered);
    };

    const handleLoading = (id, isLoading) => {
        setLoadingStates(prev => ({
            ...prev,
            [id]: isLoading
        }));
    };

    useEffect(() => {
        fetchAllMovies();
    }, []);

    return (
        <div>
            <ResponsiveAppBar />
            <BackButton />
            <Search onSearch={handleSearch} pageName="Movies" />
            <div className={styles.pageContainer}>
                <div className={styles.contentWrapper}>
                    {movies?.length === 0 ? (
                        <div className={styles.loadingContainer}>
                            {[...Array(8)].map((_, index) => (
                                <CharacterCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : (
                        <>
                            {isSearching && filteredMovies.length === 0 ? (
                                <div className={styles.noResults}>
                                    <p>No movies found matching your search.</p>
                                </div>
                            ) : (
                                <div className={styles.grid}>
                                    {(filteredMovies.length > 0 ? filteredMovies : movies)
                                        .map((movie) => (
                                            <Link key={movie.id} to={`/movies/${movie.serial}`}>
                                                <div className={styles.bookCard}>
                                                    <div className={styles.imageContainer}>
                                                        {(!loadingStates[movie.id]) && 
                                                            <CharacterCardSkeleton />
                                                        }
                                                        <LazyLoadImage
                                                            src={movie.poster || "https://via.placeholder.com/200x300?text=No+Poster"}
                                                            alt={movie.title}
                                                            className={styles.posterImage}
                                                            effect="opacity"
                                                            beforeLoad={() => handleLoading(movie.id, false)}
                                                            afterLoad={() => handleLoading(movie.id, true)}
                                                            onError={(e) => {
                                                                e.target.src = "https://via.placeholder.com/200x300?text=No+Poster";
                                                                handleLoading(movie.id, true);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className={styles.bookInfo}>
                                                        <h3>{movie.title}</h3>
                                                        <p>{movie.release_date}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Movies;