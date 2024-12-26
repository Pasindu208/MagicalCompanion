import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from '../styles/backbutton.module.scss';

const BackButton = ({ position = 'fixed', top = '1rem', left = '1rem' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageName = (pathname) => {
    const path = pathname.split('/').filter(Boolean);
    if (path.length === 0 || path.length === 1) return 'Home';
    // Get the parent path name
    const parentPathIndex = path.length - 2;
    const pageName = path[parentPathIndex];
    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleBack();
    }
  };

  if (location.pathname === '/') return null;

  return (
    <Tooltip title={`Back to ${getPageName(location.pathname)}`} placement="right">
      <IconButton
        onClick={handleBack}
        onKeyDown={handleKeyDown}
        className={styles.backButton}
        aria-label="Go back to previous page"
        style={{ position, top, left }}
        sx={{
          color: '#333',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: { xs: '12px', sm: '8px' },
          margin: { xs: '8px', sm: '0' },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
          '@media (max-width: 600px)': {
            top: '0.5rem',
            left: '0.5rem',
            minWidth: '42px', // Minimum touch target size
            minHeight: '42px',
          },
          '@media (max-width: 360px)': {
            top: '0.3rem',
            left: '0.3rem',
          }
        }}
      >
        <ArrowBackIcon 
          className={styles.icon}
          sx={{
            fontSize: { xs: '1.8rem', sm: '1.5rem' }
          }}
        />        
      </IconButton>
    </Tooltip>
  );
};

export default BackButton;