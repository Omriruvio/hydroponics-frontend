import Head from 'next/head';
import Navbar from '../components/Navbar';
import { StyledHeader, StyledPage } from '../styles/globalstyles';
import { useAuth } from '../hooks/useAuth';
import useToken from '../hooks/useToken';
import { GlobalSummary } from '../components/GlobalSummary';
import { BASE_URL } from '../config';
import { usePopups } from '../hooks/usePopups';
import ImagePopup from '../components/ImagePopup';

// Check that transpiler is correctly set up
if (
  !new (class {
    x;
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly');

export default function Home(props) {
  const currentUser = useAuth();
  const popups = usePopups();
  useToken();

  return (
    <StyledPage>
      {popups.isOpen.imagePopup && <ImagePopup></ImagePopup>}
      <Head>
        <title>Hydroponics Dashboard</title>
      </Head>
      <Navbar />
      <StyledHeader>Welcome to Hydroponics!</StyledHeader>
      <GlobalSummary {...props} />
    </StyledPage>
  );
}

export async function getStaticProps() {
  let activeUserCount;
  try {
    const res = await fetch(`${BASE_URL}/active-user-count`);
    activeUserCount = await res.json();
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      activeUserCount: activeUserCount || 0,
    },
    revalidate: 60,
  };
}