import Navbar from '../../components/Navbar';
import { useEffect } from 'react';
import { StyledPage } from '../../styles/globalstyles';
import { useAuth } from '../../hooks/useAuth';
import Router from 'next/router';
import CropDataDashboard from '../../components/CropDataDashboard';
import ImagePopup from '../../components/ImagePopup';
import { usePopups } from '../../hooks/usePopups';

const UserDashboard = () => {
  const currentUser = useAuth();
  const popups = usePopups();

  useEffect(() => {
    if (!currentUser.isLoggedIn) {
      Router.replace('/');
      return;
    }
  }, [currentUser]);

  return (
    currentUser.isLoggedIn && (
      <StyledPage>
        {popups.isOpen.imagePopup && <ImagePopup></ImagePopup>}
        <Navbar></Navbar>
        <CropDataDashboard currentUser={currentUser}></CropDataDashboard>
      </StyledPage>
    )
  );
};

export default UserDashboard;
