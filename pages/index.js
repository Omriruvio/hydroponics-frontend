import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { StyledHeader, StyledPage } from '../styles/globalstyles';
import { useAuth } from '../hooks/useAuth';
import { getAdminDetails } from '../utils/auth';

export default function Home(props) {
  const currentUser = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminJWT');
    if (token) {
      getAdminDetails(token)
        .then((adminDetails) => {
          const { email, name } = adminDetails;
          currentUser.login({ email, isAdmin: true });
          router.replace('/admin-dashboard');
        })
        .catch((err) => {
          console.log(err);
          router.replace('/admin-signin');
        });
    } else if (!currentUser.isLoggedIn) router.replace('/signin');
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
