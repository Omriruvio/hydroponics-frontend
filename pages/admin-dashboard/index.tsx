import Router from 'next/router';
import { useEffect, useState } from 'react';
import CropDataDashboard from '../../components/CropDataDashboard';
import GrowerCard from '../../components/GrowerCard';
import ImagePopup from '../../components/ImagePopup';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../hooks/useAuth';
import useGrowers, { Grower } from '../../hooks/useGrowers';
import { usePopups } from '../../hooks/usePopups';
import useSystems from '../../hooks/useSystems';
import { StyledHeader, StyledPage, StyledUl } from '../../styles/globalstyles';

const AdminDashboard = () => {
  const currentUser = useAuth();
  const { growers, getDefaultSystem } = useGrowers();
  const [selectedGrower, setSelectedGrower] = useState<Grower | null>(null);
  const popups = usePopups();
  const { /* data: system, */ selectedSystem, setSelectSystem } = useSystems();

  // on change to selected grower setSelectSystem with the growers default system
  useEffect(() => {
    if (selectedGrower?.defaultSystem) {
      getDefaultSystem(selectedGrower.phoneNumber).then((system) => {
        setSelectSystem(system);
      });
    }
  }, [selectedGrower, setSelectSystem, getDefaultSystem]);

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
        <Navbar />
        <StyledHeader>Admin Dashboard</StyledHeader>
        <StyledUl>
          {growers.map((grower) => (
            <GrowerCard key={grower._id} grower={grower} onSelectGrower={setSelectedGrower} />
          ))}
        </StyledUl>
        {selectedGrower && selectedSystem ? (
          <CropDataDashboard isDisplayName={true} currentUser={selectedGrower} selectedSystem={selectedSystem} />
        ) : (
          <StyledHeader>Select a grower from the list above</StyledHeader>
        )}
      </StyledPage>
    )
  );
};

export default AdminDashboard;
