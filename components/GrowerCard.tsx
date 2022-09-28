import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Grower } from '../hooks/useGrowers';

interface GrowerCardProps {
  grower: Grower;
  onSelectGrower: (grower: Grower) => void;
}

const GrowerCard: FunctionComponent<GrowerCardProps> = ({ grower, onSelectGrower }) => {
  return (
    <StyledGrowerCard onClick={() => onSelectGrower(grower)}>
      <GrowerCardHeader>{grower.username}</GrowerCardHeader>
      <GrowerCardPhone>{grower.phoneNumber.match(/\d+/)}</GrowerCardPhone>
    </StyledGrowerCard>
  );
};

const StyledGrowerCard = styled.li`
  cursor: pointer;
  border: 1px solid var(--mainGreen);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  position: relative;

  &:hover {
    border: 1px solid rgb(106, 184, 139);
  }

  @media (min-width: 500px) {
    padding: 0.7rem 1.5rem;
  }
  @media (min-width: 760px) {
    padding: 1.1rem 1.8rem;
  }
  @media (min-width: 1000px) {
    padding: 1.3rem 2rem;
  }
`;
const GrowerCardHeader = styled.h3`
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;

  @media (min-width: 500px) {
    font-size: 1.4rem;
  }
  @media (min-width: 760px) {
    font-size: 1.7rem;
  }
  @media (min-width: 1000px) {
    font-size: 1.9rem;
  }
`;
const GrowerCardPhone = styled.p`
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  @media (min-width: 500px) {
    font-size: 1.2rem;
  }
  @media (min-width: 760px) {
    font-size: 1.5rem;
  }
  @media (min-width: 1000px) {
    font-size: 1.7rem;
  }
`;

export default GrowerCard;
