import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import ResponsiveAppBar from '../components/header';
import SpellCard from '../components/SpellCard';
import SpellCardSkeleton from '../components/SpellCardSkeleton';
import styles from '../styles/spells.module.scss';

const Spells = () => {
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const SPELLS_PER_PAGE = 12;
  
  const observer = useRef();
  const lastSpellElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const response = await axios.get('https://potterapi-fedeperin.vercel.app/en/spells');
        const allSpells = response.data;
        const start = 0;
        const end = SPELLS_PER_PAGE;
        setSpells(allSpells.slice(start, end));
        setHasMore(end < allSpells.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching spells:', error);
        setError('Failed to load spells. Please try again later.');
        setLoading(false);
      }
    };

    fetchSpells();
  }, []);

  useEffect(() => {
    if (page === 0) return;
    
    const loadMoreSpells = async () => {
      try {
        const response = await axios.get('https://potterapi-fedeperin.vercel.app/en/spells');
        const allSpells = response.data;
        const start = page * SPELLS_PER_PAGE;
        const end = start + SPELLS_PER_PAGE;
        setSpells(prevSpells => [...prevSpells, ...allSpells.slice(start, end)]);
        setHasMore(end < allSpells.length);
      } catch (error) {
        console.error('Error loading more spells:', error);
      }
    };

    loadMoreSpells();
  }, [page]);

  const renderSkeletons = () => {
    return Array(SPELLS_PER_PAGE).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`}>
        <SpellCardSkeleton />
      </div>
    ));
  };

  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div>
      <ResponsiveAppBar />
      <div className={styles.spellsContainer}>
        {loading ? (
          renderSkeletons()
        ) : (
          <>
            {spells.map((spell, index) => (
              <div key={`${spell.spell}-${index}`} ref={index === spells.length - 1 ? lastSpellElementRef : null}>
                <SpellCard spell={spell} />
              </div>
            ))}
            {hasMore && (
              <div className={styles.loadingMoreContainer}>
                {Array(3).fill(0).map((_, index) => (
                  <SpellCardSkeleton key={`loading-more-${index}`} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Spells;
