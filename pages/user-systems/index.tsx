import Navbar from '../../components/Navbar';
import { FunctionComponent } from 'react';
import { OpaqueDivider, StyledDivider, StyledHeader, StyledPage, StyledUl } from '../../styles/globalstyles';
import { useAuth } from '../../hooks/useAuth';
import useSystems, { System } from '../../hooks/useSystems';
import SystemCard, { SystemCardHeader, SystemDetails } from '../../components/SystemCard';
import { observer } from 'mobx-react-lite';
import useToken from '../../hooks/useToken';
import SystemEditForm from '../../components/SystemEditForm';
import SystemSetAccessForm from '../../components/SystemSetAccessForm';
import styled from 'styled-components';
import SystemCreateForm from '../../components/SystemCreateForm';

const UserSystems: FunctionComponent = () => {
  useToken();
  const currentUser = useAuth();
  const { data: systems, setData: setSystems, selectedSystem, setSelectSystem } = useSystems();

  const handleRename = (systemId: string, newName: string) => {
    const updatedSystems = systems.map((system) => {
      if (system._id === systemId) {
        return { ...system, name: newName };
      }
      return system;
    });
    setSystems(updatedSystems);
    setSelectSystem(null);
  };

  const handleSetAccess = (systemId: string, isPublic: boolean) => {
    const updatedSystems = systems.map((system) => {
      if (system._id === systemId) {
        return { ...system, isPublic };
      }
      return system;
    });
    setSystems(updatedSystems);
    setSelectSystem(null);
  };

  const handleCreateSystem = (newSystem: System) => {
    setSystems([...systems, newSystem]);
  };

  return (
    <>
      {currentUser.isLoggedIn && (
        <StyledPage>
          <Navbar />
          {systems.length > 0 && (
            <>
              <StyledHeader>System settings</StyledHeader>
              <StyledUl>
                {systems.map((system) => (
                  <SystemCard key={system._id} system={system} onSelectSystem={setSelectSystem} />
                ))}
              </StyledUl>
            </>
          )}
          <StyledDivider />
          {selectedSystem && (
            <>
              <SystemCardHeader>Selected system details:</SystemCardHeader>
              <SystemDetailsWrapper>
                <SystemDetails>System name: {selectedSystem.name}</SystemDetails>
                <SystemDetails>System owner: {selectedSystem.ownerName}</SystemDetails>
                <SystemDetails>{`System access: ${selectedSystem.isPublic ? 'Public' : 'Private'}`}</SystemDetails>
                <SystemDetails>Collaborators: {selectedSystem.users.length}</SystemDetails>
              </SystemDetailsWrapper>
              <StyledDivider />
              <StyledHeader>Edit system - {selectedSystem.name}</StyledHeader>
              <SystemEditForm system={selectedSystem} onRename={handleRename} />
              <OpaqueDivider />
              <SystemSetAccessForm system={selectedSystem} onSetAccess={handleSetAccess} />
              <OpaqueDivider />
              <SystemCreateForm onSystemCreated={handleCreateSystem} />
            </>
          )}
        </StyledPage>
      )}
    </>
  );
};

const SystemDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 3rem;
  /* align-items: center; */
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;
  
export default observer(UserSystems);
