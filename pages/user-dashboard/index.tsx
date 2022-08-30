import Navbar from '../../components/Navbar';
import { useEffect } from 'react';
import { StyledPage } from '../../styles/globalstyles';
import { useAuth } from '../../hooks/useAuth';
import Router from 'next/router';
import CropDataDashboard from '../../components/CropDataDashboard';

const UserDashboard = () => {
  const currentUser = useAuth();

  useEffect(() => {
    if (!currentUser.isLoggedIn) {
      Router.replace('/');
      return;
    }
  }, [currentUser]);

  return (
    currentUser.isLoggedIn && (
      <StyledPage>
        <Navbar></Navbar>
        <CropDataDashboard currentUser={currentUser}></CropDataDashboard>
      </StyledPage>
    )
  );
};

export default UserDashboard;
