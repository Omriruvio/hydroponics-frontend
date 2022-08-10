import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import UserChart from '../components/UserChart.tsx';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext, useEffect } from 'react';
import { StyledHeader, StyledPage } from '../styles/globalstyles';

export default function Home(props) {
  const currentUser = useContext(CurrentUserContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser.isLoggedIn) router.replace('/signin');
  }, [router, currentUser]);

  return (
    currentUser.isLoggedIn && (
      <StyledPage>
        <Head>
          <title>Hydroponics Dashboard</title>
        </Head>
        <Navbar />
        <StyledHeader>Welcome to Hydroponics!</StyledHeader>
        {/* <UserChart title="General chart"></UserChart> */}
      </StyledPage>
    )
  );
}
