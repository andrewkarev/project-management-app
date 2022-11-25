import React, { useEffect } from 'react';
import Container from 'components/Container';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import styles from './Layout.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import Loader from 'components/Loader';
import { scrollController } from 'utils/scrollController';
import { getBoardsByUserId } from 'store/reducers/boardsSlice';
import useAppPending from 'hooks/useAppPending';
import useTokenExpiration from 'hooks/useTokenExpiration';
import { setLanguage } from 'store/reducers/userSlice';
import i18n from 'i18next';

const Layout: React.FC = () => {
  const isAuthorised = useAppSelector((state) => state.user.isAuthorised);
  const language = useAppSelector((state) => state.user.language);
  const boards = useAppSelector((state) => state.boards.boards);
  const userID = useAppSelector((state) => state.user.id);
  const theme = useAppSelector((state) => state.user.theme);
  const dispatch = useAppDispatch();

  const isPending = useAppPending();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isAuthorised && !boards.length) {
      dispatch(getBoardsByUserId(userID));
    }
  }, [boards.length, dispatch, isAuthorised, userID]);

  useEffect(() => {
    !isAuthorised && dispatch(setLanguage('EN'));
  }, [dispatch, isAuthorised]);

  useTokenExpiration();

  useEffect(() => {
    isPending ? scrollController.disableScroll() : scrollController.enableScroll();
  }, [isPending]);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      {isPending && <Loader />}
    </div>
  );
};

export default Layout;
