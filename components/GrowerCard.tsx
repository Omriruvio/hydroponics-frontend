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
`;
const GrowerCardHeader = styled.h3``;
const GrowerCardPhone = styled.p``;

export default GrowerCard;
