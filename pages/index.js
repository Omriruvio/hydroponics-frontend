import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { StyledHeader, StyledPage } from '../styles/globalstyles';
import { useAuth } from '../hooks/useAuth';

export default function Home(props) {
  const currentUser = useAuth();
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
