import React from 'react';
import PropTypes from 'prop-types';
import styles from './BooksInfo.module.css';

const BookInfo = ({ bookInfo }) => {
    return (
        <div className={styles.bookInfo}>
            <h1>{bookInfo.title}</h1>
            <p>{bookInfo.author}</p>
            <p>{bookInfo.description}</p>
            <div className={styles.coverContainer}>
                <img
                    src={bookInfo.cover}
                    alt={bookInfo.title}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x300?text=No+Cover';
                    }}
                />
                {bookInfo.wiki && (
                    <a
                        href={bookInfo.wiki}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.wikiButton}>
                        Visit Wiki Page
                    </a>
                )}
            </div>
        </div>
    );
};

BookInfo.propTypes = {
    bookInfo: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        wiki: PropTypes.string,
    }).isRequired,
};

export default BookInfo;
