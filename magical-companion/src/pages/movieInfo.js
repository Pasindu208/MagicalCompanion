import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "../components/header";
import BackButton from "../components/backbtn";
import styles from "../styles/MovieInfo.module.scss";
import { LoadingSkeleton } from "../components/LoadingSkeleton";

const MovieInfo = () => {
    const { serial } = useParams();
    const [movieInfo, setMovieInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMovieInfo();
    }, []);

    const fetchMovieInfo = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://magical-companion-api.vercel.app/movies/${serial}`
            );
            setMovieInfo(response.data);
        } catch (error) {
            console.error("Error fetching movie:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <ResponsiveAppBar />
            <BackButton />
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <h2 className={styles.title}>Movie Information</h2>
                    {isLoading ? (
                        <LoadingSkeleton type="movie" />
                    ) : movieInfo ? (
                        <div className={styles.bookCard}>
                            <div className={styles.posterContainer}>
                                <img
                                    src={
                                        movieInfo.poster ||
                                        "https://via.placeholder.com/200x300?text=No+Poster"
                                    }
                                    alt={movieInfo.title}
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/200x300?text=No+Poster";
                                    }}
                                />
                                {/* {movieInfo.wiki && (
                                    <a
                                        href={movieInfo.wiki}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.wikiButton}>
                                        Visit Wiki Page
                                    </a>
                                )} */}
                            </div>
                            <div className={styles.infoContainer}>
                                <h1>{movieInfo.title}</h1>
                                <div className={styles.detailsGrid}>
                                    <div className={styles.detailItem}>
                                        <strong>Release Date</strong>
                                        <span>{movieInfo.release_date}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <strong>Running Time</strong>
                                        <span>{movieInfo.running_time}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <strong>Rating</strong>
                                        <span>{movieInfo.rating}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <strong>Budget</strong>
                                        <span>{movieInfo.budget}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <strong>Box Office</strong>
                                        <span>{movieInfo.box_office}</span>
                                    </div>
                                </div>

                                {movieInfo.summary && (
                                    <div className={styles.summary}>
                                        <h3>Overview</h3>
                                        <p>{movieInfo.summary}</p>
                                    </div>
                                )}

                                <div className={styles.crewSection}>
                                    <h3>Cast & Crew</h3>
                                    <div className={styles.crewDetails}>
                                        {movieInfo.directors?.length > 0 && (
                                            <div className={styles.detailItem}>
                                                <strong>Director(s)</strong>
                                                <span>
                                                    {movieInfo.directors.join(
                                                        ", "
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        {movieInfo.producers?.length > 0 && (
                                            <div className={styles.detailItem}>
                                                <strong>Producer(s)</strong>
                                                <span>
                                                    {movieInfo.producers.join(
                                                        ", "
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        {movieInfo.screenwriters?.length >
                                            0 && (
                                            <div className={styles.detailItem}>
                                                <strong>Screenwriter(s)</strong>
                                                <span>
                                                    {movieInfo.screenwriters.join(
                                                        ", "
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        {movieInfo.cinematographers?.length >
                                            0 && (
                                            <div className={styles.detailItem}>
                                                <strong>
                                                    Cinematographer(s)
                                                </strong>
                                                <span>
                                                    {movieInfo.cinematographers.join(
                                                        ", "
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        {movieInfo.editors?.length > 0 && (
                                            <div className={styles.detailItem}>
                                                <strong>Editor(s)</strong>
                                                <span>
                                                    {movieInfo.editors.join(
                                                        ", "
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        {movieInfo.music_composers?.length >
                                            0 && (
                                            <div className={styles.detailItem}>
                                                <strong>
                                                    Music Composer(s)
                                                </strong>
                                                <span>
                                                    {movieInfo.music_composers.join(
                                                        ", "
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        {movieInfo.distributors?.length > 0 && (
                                            <div className={styles.detailItem}>
                                                <strong>Distributor(s)</strong>
                                                <span>
                                                    {movieInfo.distributors.join(
                                                        ", "
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {movieInfo.trailer && (
                                    <div className={styles.trailerSection}>
                                        <h3>Trailer</h3>
                                        <div className={styles.videoWrapper}>
                                            <iframe
                                                src={movieInfo.trailer}
                                                title="Movie Trailer"
                                                allowFullScreen></iframe>
                                        </div>
                                    </div>
                                )}
                                <a
                                    href={movieInfo.wikiLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.wikiLink}>
                                    Read more on Wiki →
                                </a>
                            </div>
                        </div>
                    ) : (
                        <p className={styles.error}>
                            Error loading movie information.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;
