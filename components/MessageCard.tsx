import moment from 'moment';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import useWindowSize from '../hooks/useWindowSize';
import { UserMessage } from '../utils/parseCropData';

interface MessageCardProps {
  message: UserMessage;
}

const getAssessmentText = (message: UserMessage) => {
  const { healthState } = message;
  if (healthState.hasDeficiencies === 'positive') {
    return <MessageCardItem warning>Your plant has deficiencies</MessageCardItem>;
  }
  if (healthState.hasPestPresence === 'positive') {
    return <MessageCardItem warning>Your plant has pests</MessageCardItem>;
  }
  if (healthState.isHealthy === 'positive') {
    return <MessageCardItem healthy>Your plant is healthy</MessageCardItem>;
  }
  return <MessageCardItem>No assessment available</MessageCardItem>;
};

const getDataText = (message: UserMessage) => {
  const { ph, ec, temperature } = message;
  return (
    <>
      {ph && <MessageCardItem>PH: {ph}</MessageCardItem>}
      {ec && <MessageCardItem>EC: {ec}</MessageCardItem>}
      {temperature && <MessageCardItem>Temperature: {temperature}</MessageCardItem>}
    </>
  );
};

const MessageCard: FunctionComponent<MessageCardProps> = ({ message }) => {
  const { width } = useWindowSize();

  const formatMessageTime = (date: string) => {
    // above 1000px render moment format as 'ddd, hA', below 1000px render as 'ddd, h:mmA'
    if (width > 1000) {
      return moment(date).format('DD - MMM - yyyy');
    } else {
      return moment(date).format('DD/MM/yy');
    }
  };

  // if the message is an image containing message:
  if (message.imageUrl) {
    return (
      <StyledMessageCard message={message}>
        <TextContainer>
          <MessageCardHeader>{formatMessageTime(message.dateReceived.toString())}</MessageCardHeader>
          <MessageCardHeader>System - {message.systemName}</MessageCardHeader>
          <CropDataContainer>
            <MessageCardItem>Plant health assessment:</MessageCardItem>
            {getAssessmentText(message)}
          </CropDataContainer>
        </TextContainer>
        <ImageContainer>
          <Image src={message.imageUrl} objectFit='contain' alt='message' width={160} height={90} />
        </ImageContainer>
      </StyledMessageCard>
    );
  }

  // if the message is a text containing message:
  return (
    <StyledMessageCard message={message}>
      <TextContainer>
        <MessageCardHeader>{formatMessageTime(message.dateReceived.toString())}</MessageCardHeader>
        <MessageCardHeader>System - {message.systemName}</MessageCardHeader>
        <CropDataContainer>{getDataText(message)}</CropDataContainer>
      </TextContainer>
    </StyledMessageCard>
  );
};

const CropDataContainer = styled.div`
  margin-top: 1.5rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledMessageCard = styled.li<{ message: UserMessage }>`
  position: relative;
  cursor: pointer;
  border: 1px solid var(--mainGreen);
  box-shadow: ${({ message }) => message.imageUrl && message.healthState.isHealthy === 'positive' && 'inset 0px 0px 15px 0px var(--lightGreen)'};
  box-shadow: ${({ message }) =>
    message.imageUrl &&
    (message.healthState.hasDeficiencies === 'positive' || message.healthState.hasPestPresence === 'positive') &&
    'inset 0px 0px 15px 0px var(--warningOrange)'};

  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  gap: 0.3rem;
  position: relative;

  &:hover {
    border: 1px solid rgb(106, 184, 139);
  }

  @media (min-width: 500px) {
    padding: 0.7rem 1rem;
  }
  @media (min-width: 760px) {
    padding: 1.1rem 1.2rem;
  }
  @media (min-width: 1000px) {
    padding: 1.3rem 1.5rem;
  }
`;
const MessageCardHeader = styled.h3`
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
const MessageCardItem = styled.p<{ warning?: boolean; healthy?: boolean }>`
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  color: ${({ warning, healthy }) => {
    if (warning) return 'var(--warningOrange)';
    if (healthy) return 'var(--brightGreen)';
    return 'inherit';
  }};

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

export default MessageCard;
