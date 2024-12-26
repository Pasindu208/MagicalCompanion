import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "../components/header";
import BackButton from "../components/backbtn";
import styles from "../styles/BooksInfo.module.scss";
import { LoadingSkeleton } from '../components/LoadingSkeleton';

const BooksInfo = () => {
    const { serial } = useParams();
    const [bookInfo, setBookInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // Add loading state

    useEffect(() => {
        fetchBookInfo();
    }, []);

    const fetchBookInfo = async () => {
        try {
            setIsLoading(true);  // Set loading true before fetch
            const response = await axios.get(
                `https://magical-companion-api.vercel.app/books/${serial}`
            );
            setBookInfo(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setIsLoading(false);  // Set loading false after fetch
        }
    };

    return (
        <div>
            <ResponsiveAppBar />
            <BackButton />
            <div className={styles.container}>
                <h2 className={styles.title}>Book Information</h2>
                {isLoading ? (
                    <LoadingSkeleton type="book" />
                ) : bookInfo ? (
                    <div className={styles.bookCard}>
                        <div className={styles.imageContainer}>
                            <img src={bookInfo.cover} alt={bookInfo.title} />
                        </div>
                        <div className={styles.bookInfo}>
                            <h3>{bookInfo.title}</h3>
                            <p><strong>Author:</strong> J.K. Rowling</p>
                            <p><strong>Release Date:</strong> {bookInfo.release_date}</p>
                            <p><strong>Pages:</strong> {bookInfo.pages}</p>
                            <p><strong>Serial:</strong> {bookInfo.serial}</p>
                            <div className={styles.summary}>
                                <p><strong>Summary:</strong></p>
                                <p>{bookInfo.summary}</p>
                            </div>
                            <div className={styles.dedication}>
                                <p><strong>Dedication:</strong></p>
                                <p>{bookInfo.dedication}</p>
                            </div>
                            <a 
                                href={bookInfo.wiki} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.wikiLink}
                            >
                                Read more on Wiki →
                            </a>
                        </div>
                    </div>
                ) : (
                    <p>Error loading book information.</p>
                )}
            </div>
        </div>
    );
};

export default BooksInfo;
