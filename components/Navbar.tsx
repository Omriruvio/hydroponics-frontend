import styled from 'styled-components';
import Link from 'next/link';
import { MainLogo } from './MainLogo';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

const Nav = styled.div`
  display: flex;
  gap: 1rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  padding: 2.5rem 2rem 0;
`;

const StyledLinkLabel = styled.a<{ isActive: boolean }>`
  border-bottom: ${({ isActive }) => isActive && '1px solid rgb(106, 184, 139)'};
  font-size: 1.2rem;

  @media (min-width: 750px) {
    font-size: 2rem;
  }
  @media (min-width: 1000px) {
    font-size: 2.5rem;
  }
`;

const Navbar = () => {
  const { pathname } = useRouter();
  const currentUser = useAuth();

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
          {currentUser.isAdmin && (
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
      </HeaderWrapper>
    </>
  );
};

export default Navbar;
