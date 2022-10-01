import Navbar from '../../components/Navbar';
import { FunctionComponent } from 'react';
import { StyledHeader, StyledPage, StyledUl } from '../../styles/globalstyles';
import { useAuth } from '../../hooks/useAuth';
import useSystems from '../../hooks/useSystems';
import SystemCard from '../../components/SystemCard';
import { observer } from 'mobx-react-lite';
import useToken from '../../hooks/useToken';
import SystemEditForm from '../../components/SystemEditForm';
import SystemSetAccessForm from '../../components/SystemSetAccessForm';

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
          {selectedSystem && (
            <>
              <h1>System details</h1>
              <p>System name: {selectedSystem.name}</p>
              <p>System owner: {selectedSystem.ownerName}</p>
              <p>{`System type: ${selectedSystem.isPublic ? 'Public' : 'Private'}`}</p>
              <p>Collaborators: {selectedSystem.users.length}</p>
              <SystemEditForm system={selectedSystem} onRename={handleRename} />
              <SystemSetAccessForm system={selectedSystem} onSetAccess={handleSetAccess} />
            </>
          )}
        </StyledPage>
      )}
    </>
  );
};

export default observer(UserSystems);
