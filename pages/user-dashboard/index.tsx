import Navbar from '../../components/Navbar';
import { FunctionComponent, useEffect } from 'react';
import { StyledDivider, StyledHeader, StyledPage, StyledUl } from '../../styles/globalstyles';
import { useAuth } from '../../hooks/useAuth';
import Router from 'next/router';
import CropDataDashboard from '../../components/CropDataDashboard';
import ImagePopup from '../../components/ImagePopup';
import { usePopups } from '../../hooks/usePopups';
import useSystems from '../../hooks/useSystems';
import SystemCard from '../../components/SystemCard';
import { observer } from 'mobx-react-lite';

const UserDashboard: FunctionComponent = () => {
  const currentUser = useAuth();
  const popups = usePopups();
  const { data: systems, selectedSystem, setSelectSystem } = useSystems();

  useEffect(() => {
    if (!currentUser.isLoggedIn) {
      Router.replace('/');
      return;
    }
  }, [currentUser]);

  return (
    <>
      {currentUser.isLoggedIn && (
        <StyledPage>
          {popups.isOpen.imagePopup && <ImagePopup></ImagePopup>}
          <Navbar />
          {systems?.length > 0 && (
            <>
              <StyledHeader>My systems</StyledHeader>
              <StyledUl>
                {systems.map((system) => (
                  <SystemCard key={system._id} system={system} onSelectSystem={setSelectSystem} />
                ))}
              </StyledUl>
            </>
          )}
          {selectedSystem && (
            <>
              <StyledDivider />
              <CropDataDashboard currentUser={currentUser} selectedSystem={selectedSystem}></CropDataDashboard>
            </>
          )}
        </StyledPage>
      )}
    </>
  );
};

export default observer(UserDashboard);
