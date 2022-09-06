import '../styles/globals.css';
import { GlobalStyles } from '../styles/globalstyles';
import { UserDataProvider } from '../hooks/useAuth';
import {PopupProvider} from '../hooks/usePopups';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <PopupProvider>
        <UserDataProvider>
          {/* prettier-ignore */}
          <Component {...pageProps}/>
        </UserDataProvider>
      </PopupProvider>
    </>
  );
}

export default MyApp;
