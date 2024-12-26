import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveAppBar from '../components/header';
import axios from 'axios';
import CharacterCardSkeleton from '../components/CharacterCardSkeleton';
import styles from '../styles/books.module.scss';
import BackButton from '../components/backbtn';

const Books = () => {
    const [books, setBooks] = useState([]);

    const fetchAllBooks = async () => {
        try {
            const response = await axios.get(
                "https://magical-companion-api.vercel.app/books"
            );
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        fetchAllBooks();
    }, []);

    return (
        <div>
            <ResponsiveAppBar />
            <BackButton />
            {books?.length === 0 ? (
                <div className={styles.loadingContainer}>
                    {[...Array(7)].map((_, index) => (
                        <CharacterCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className={styles.booksContainer}>
                    {books.map((book) => (
                        <Link key={book.serial} to={`/books/${book.serial}`} className={styles.cardLink}>
                            <div className={styles.card}>
                                <img 
                                    src={book.cover || 'https://via.placeholder.com/200x300?text=No+Cover'} 
                                    alt={book.title}
                                    className={styles.bookCover}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/200x300?text=No+Cover';
                                    }}
                                />
                                <h2 className={styles.bookTitle}>{book.title}</h2>
                                <p className={styles.bookInfo}>Released: {book.release_date}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Books;