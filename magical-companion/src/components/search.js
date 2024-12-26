import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../styles/search.module.scss';

const Search = ({ onSearch, pageName = 'items' }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const value = event.target.value || '';
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className={styles.searchContainer}>
            <TextField
                className={styles.searchField}
                variant="outlined"
                placeholder={`Search ${pageName}...`}
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '24px',
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '12px 14px',
                    },
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                    }
                }}
            />
        </div>
    );
};

export default Search;