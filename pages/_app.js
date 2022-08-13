import '../styles/globals.css';
import { GlobalStyles } from '../styles/globalstyles';
import { UserDataProvider } from '../hooks/useAuth';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <UserDataProvider>
        {/* prettier-ignore */}
        <Component {...pageProps}/>
      </UserDataProvider>
    </>
  );
}

export default MyApp;
