import React from 'react';
import { Skeleton } from '@mui/material';
import styles from '../styles/spells.module.scss';

const SpellCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <Skeleton variant="text" width="70%" height={32} style={{ marginBottom: '12px' }} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="90%" />
    </div>
  );
};

export default SpellCardSkeleton;
