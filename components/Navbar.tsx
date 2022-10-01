import styled from 'styled-components';
import Link from 'next/link';
import { MainLogo } from './MainLogo';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { observer } from 'mobx-react-lite';
import { useDropdown } from '../store/DropdownState';
import SettingsDropdown from './SettingsDropdown';
import { StyledLinkLabel, Nav } from '../styles/globalstyles';

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  /* justify-content: center; */
  padding-top: var(--headerPaddingTop);
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  padding-bottom: 0;
`;

const Navbar = () => {
  const { pathname } = useRouter();
  const currentUser = useAuth();
  const dropdown = useDropdown();

  return (
    <>
      {currentUser.isLoggedIn && <div style={{ textAlign: 'center' }}>{`Logged in as ${currentUser.email}`}</div>}
      <HeaderWrapper>
        <MainLogo />
        <Nav>
          {/* Home link */}
          {currentUser.isLoggedIn && (
            <Link href='/' passHref>
              <StyledLinkLabel isActive={pathname === '/'}>Home</StyledLinkLabel>
            </Link>
          )}
          {/* User dashboard link */}
          {!currentUser.isAdmin && currentUser.isLoggedIn && (
            <Link href='/user-dashboard' passHref>
              <StyledLinkLabel isActive={pathname === '/user-dashboard'}>User</StyledLinkLabel>
            </Link>
          )}
          {/* Admin link */}
          {currentUser.isAdmin && currentUser.isLoggedIn && (
            <Link href='/admin-dashboard' passHref>
              <StyledLinkLabel isActive={pathname === '/admin-dashboard'}>Admin</StyledLinkLabel>
            </Link>
          )}
          {/* Log in link */}
          {!currentUser.isLoggedIn && (
            <Link href='/signin' passHref>
              <StyledLinkLabel isActive={pathname === '/signin'}>Login</StyledLinkLabel>
            </Link>
          )}
          {/* Account menu & settings link */}
          {!currentUser.isAdmin && currentUser.isLoggedIn && (
            <StyledLinkLabel onClick={() => dropdown?.toggle()} isActive={pathname === '/signin'}>
              Menu
            </StyledLinkLabel>
          )}
          {/* Log out link */}
          {currentUser.isLoggedIn && (
            <Link href='/signin' passHref>
              <StyledLinkLabel onClick={currentUser.logout} isActive={pathname === '/signin'}>
                Logout
              </StyledLinkLabel>
            </Link>
          )}
          {/* Register link */}
          {!currentUser.isLoggedIn && (
            <Link href='/signup' passHref>
              <StyledLinkLabel isActive={pathname === '/signup'}>Register</StyledLinkLabel>
            </Link>
          )}
        </Nav>
        {dropdown.isOpen && <SettingsDropdown />}
      </HeaderWrapper>
    </>
  );
};

export default observer(Navbar);
