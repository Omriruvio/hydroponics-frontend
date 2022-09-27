import '../styles/globals.css';
import { GlobalStyles } from '../styles/globalstyles';
import { UserDataProvider } from '../hooks/useAuth';
import { PopupProvider } from '../hooks/usePopups';
import { DropdownStateProvider } from '../store/DropdownState';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <DropdownStateProvider>
        <PopupProvider>
          <UserDataProvider>
            {/* prettier-ignore */}
            <Component {...pageProps}/>
          </UserDataProvider>
        </PopupProvider>
      </DropdownStateProvider>
    </>
  );
}

export default MyApp;
