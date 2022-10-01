import moment from 'moment';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { usePopups } from '../hooks/usePopups';
import useWindowSize from '../hooks/useWindowSize';
import { UserMessage } from '../utils/parseCropData';

interface MessageCardProps {
  message: UserMessage;
  preview: boolean;
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

const MessageCard: FunctionComponent<MessageCardProps> = ({ message, preview }) => {
  const { width } = useWindowSize();
  const popups = usePopups();

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
      <StyledMessageCard message={message} preview={preview}>
        {!preview && (
          <MessageCardOverlay preview={preview}>
            <Button edit onClick={() => popups.handleEditMessage(message)}>
              Edit
            </Button>
            <Button delete onClick={() => popups.handleDeleteMessage(message)}>
              Delete
            </Button>
          </MessageCardOverlay>
        )}
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
    <StyledMessageCard message={message} preview={preview}>
      {!preview && (
        <MessageCardOverlay preview={preview}>
          <Button edit onClick={() => popups.handleEditMessage(message)}>
            Edit
          </Button>
          <Button delete onClick={() => popups.handleDeleteMessage(message)}>
            Delete
          </Button>
        </MessageCardOverlay>
      )}
      <TextContainer>
        <MessageCardHeader>{formatMessageTime(message.dateReceived.toString())}</MessageCardHeader>
        <MessageCardHeader>System - {message.systemName}</MessageCardHeader>
        <CropDataContainer>{getDataText(message)}</CropDataContainer>
      </TextContainer>
    </StyledMessageCard>
  );
};

// styled button that takes edit / delete as props and renders the appropriate button style
const Button = styled.button<{ edit?: boolean; delete?: boolean }>`
  background-color: ${(props) => (props.edit ? '#f2f2f2' : '#f2f2f2')};
  border: 1px solid ${(props) => (props.edit ? '#f2f2f2' : '#f2f2f2')};
  border-radius: 5px;
  color: ${(props) => (props.edit ? '#000000' : '#000000')};
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem 0.5rem;
  padding: 0.5rem 1rem;
  transition: all var(--messageCardHoverTraisitionDelay) ease-in-out;

  &:hover {
    background-color: ${(props) => (props.edit ? 'var(--lightGreen)' : 'var(--warningOrange)')};
    border: 1px solid ${(props) => (props.edit ? 'var(--lightGreen)' : 'var(--warningOrange)')};
    color: ${(props) => (props.edit ? '#000000' : '#000000')};
  }
`;

// overlay that shows when the message is hovered for over 1 second and isplays an edit and delete buttons
const MessageCardOverlay = styled.div<{ preview: Boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  opacity: 0;
  transition: opacity var(--messageCardHoverTraisitionDelay) ease-in-out;
  cursor: ${({ preview }) => (preview ? 'default' : 'pointer')};
  z-index: 1;
`;

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

const StyledMessageCard = styled.li<{ message: UserMessage; preview?: boolean }>`
  position: relative;
  cursor: ${({ preview }) => (preview ? 'default' : 'pointer')};
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
  transition: border var(--messageCardHoverTraisitionDelay) ease-in-out;

  &:hover {
    border: ${({ preview }) => !preview && '1px solid rgb(106, 184, 139)'};
    ${MessageCardOverlay} {
      opacity: 1;
    }
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
