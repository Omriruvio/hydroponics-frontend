import Router from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CropDataDashboard from '../../components/CropDataDashboard';
import GrowerCard from '../../components/GrowerCard';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../hooks/useAuth';
import useGrowers, { Grower } from '../../hooks/useGrowers';
import { StyledHeader, StyledPage } from '../../styles/globalstyles';

const AdminDashboard = () => {
  const currentUser = useAuth();
  const growers = useGrowers();
  const [selectedGrower, setSelectedGrower] = useState<Grower | null>(null);

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
        <StyledHeader>Admin Dashboard</StyledHeader>
        <StyledUl>
          {growers.map((grower) => (
            <GrowerCard key={grower._id} grower={grower} onSelectGrower={setSelectedGrower} />
          ))}
        </StyledUl>
        {selectedGrower ? <CropDataDashboard currentUser={selectedGrower} /> : <StyledHeader>Select a grower from the list above</StyledHeader>}
      </StyledPage>
    )
  );
};

const StyledUl = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 100%;
  margin: 40px 2rem;
  place-items: center;

  li {
    overflow: hidden;
    list-style: none;
    width: 100%;
  }

  /* @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  } */
`;

export default AdminDashboard;
