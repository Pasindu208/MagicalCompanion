import React from 'react';
import { Skeleton } from '@mui/material';
import styles from '../styles/characters.module.scss';

const CharacterCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <Skeleton variant="rectangular" height={200} style={{ marginBottom: '12px', borderRadius: '4px' }} />
      <Skeleton variant="text" width="70%" height={32} style={{ marginBottom: '12px', marginLeft: '5px' }} />
      <Skeleton variant="text" width="90%" style={{ marginBottom: '12px', marginLeft: '5px' }} />
    </div>
  );
};

export default CharacterCardSkeleton;
