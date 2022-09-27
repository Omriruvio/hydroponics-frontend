import Head from 'next/head';
import Navbar from '../components/Navbar';
import { StyledHeader, StyledPage } from '../styles/globalstyles';
import { useAuth } from '../hooks/useAuth';
import useToken from '../hooks/useToken';

// Check that transpiler is correctly set up
if (
  !new (class {
    x;
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly');

export default function Home(props) {
  const currentUser = useAuth();
  useToken();

  return (
    currentUser.isLoggedIn && (
      <StyledPage>
        <Head>
          <title>Hydroponics Dashboard</title>
        </Head>
        <Navbar />
        <StyledHeader>Welcome to Hydroponics!</StyledHeader>
      </StyledPage>
    )
  );
}
