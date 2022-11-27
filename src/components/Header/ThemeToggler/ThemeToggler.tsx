import React from 'react';
import styles from './ThemeToggler.module.scss';
import { BsSun } from 'react-icons/bs';
import { BsMoon } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setIsBurgerOpen } from 'store/reducers/boardsSlice';
import { setTheme } from 'store/reducers/userSlice';

const ThemeToggler = () => {
  const isBurgerOpen = useAppSelector((state) => state.boards.isBurgerOpen);
  const theme = useAppSelector((state) => state.user.theme);
  const dispatch = useAppDispatch();

  const handleThemeClick = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(next));
    if (isBurgerOpen) dispatch(setIsBurgerOpen(false));
  };

  return (
    <div className={styles.themeToggler} onClick={handleThemeClick}>
      {theme === 'dark' ? (
        <BsSun className={styles.themeIcon} />
      ) : (
        <BsMoon className={styles.themeIcon} />
      )}
    </div>
  );
};

export default ThemeToggler;
