import Router from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CropDataDashboard from '../../components/CropDataDashboard';
import GrowerCard from '../../components/GrowerCard';
import ImagePopup from '../../components/ImagePopup';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../hooks/useAuth';
import useGrowers, { Grower } from '../../hooks/useGrowers';
import { usePopups } from '../../hooks/usePopups';
import { StyledHeader, StyledPage } from '../../styles/globalstyles';

const AdminDashboard = () => {
  const currentUser = useAuth();
  const growers = useGrowers();
  const [selectedGrower, setSelectedGrower] = useState<Grower | null>(null);
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
        <StyledHeader>Admin Dashboard</StyledHeader>
        <StyledUl>
          {growers.map((grower) => (
            <GrowerCard key={grower._id} grower={grower} onSelectGrower={setSelectedGrower} />
          ))}
        </StyledUl>
        {selectedGrower ? (
          <CropDataDashboard isDisplayName={true} currentUser={selectedGrower} />
        ) : (
          <StyledHeader>Select a grower from the list above</StyledHeader>
        )}
      </StyledPage>
    )
  );
};

const StyledUl = styled.ul`
  padding: 0 0.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  max-width: 100%;
  place-items: center;

  li {
    overflow: hidden;
    list-style: none;
    width: 100%;
  }

  @media (min-width: 500px) {
    padding: 0;
    gap: 0.7rem;
  }

  @media (min-width: 800px) {
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default AdminDashboard;
