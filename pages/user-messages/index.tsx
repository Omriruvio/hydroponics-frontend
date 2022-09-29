import Navbar from '../../components/Navbar';
import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { StyledHeader, StyledPage } from '../../styles/globalstyles';
import { useAuth } from '../../hooks/useAuth';
import { observer } from 'mobx-react-lite';
import useToken from '../../hooks/useToken';
import { UserMessage } from '../../utils/parseCropData';
import { getUserMessages } from '../../utils/cropData';
import MessageCard from '../../components/MessageCard';
import styled from 'styled-components';
import { usePopups } from '../../hooks/usePopups';
import CardEditPopup from '../../components/CardEditPopup';
import CardDeletePopup from '../../components/CardDeletePopup';

const UserMessagesPage: FunctionComponent = () => {
  const userToken = useToken().userToken;
  const currentUser = useAuth();
  const popups = usePopups();

  const [messages, setMessages] = useState<UserMessage[]>([]);

  useEffect(() => {
    if (userToken) {
      getUserMessages(userToken).then((messages) => {
        const filteredMessages = (messages as UserMessage[]).filter((message) => {
          if (message.messageBody !== '' || message.imageUrl) return message;
        });
        setMessages(filteredMessages);
      });
    }
  }, [userToken]);

  const handleMessagesUpdate = (message: UserMessage) => {
    const updatedMessages = messages.map((msg) => {
      if (msg._id === message._id) return message;
      return msg;
    });
    setMessages(updatedMessages);
  };

  return (
    <>
      {currentUser.isLoggedIn && (
        <StyledPage>
          {popups.isOpen.cardEditPopup && popups.selectedMessage && (
            <CardEditPopup message={popups.selectedMessage} handleUpdate={handleMessagesUpdate}></CardEditPopup>
          )}
          {popups.isOpen.cardDeletePopup && popups.selectedMessage && <CardDeletePopup message={popups.selectedMessage}></CardDeletePopup>}
          <Navbar />
          {messages.length > 0 && (
            <>
              <StyledHeader>My messages</StyledHeader>
              <MessageList>
                {messages.reduceRight((acc: ReactElement[], message) => {
                  acc.push(<MessageCard key={message._id} message={message} preview={false} />);
                  return acc;
                }, [])}
              </MessageList>
            </>
          )}
        </StyledPage>
      )}
    </>
  );
};

export const MessageList = styled.ul`
  padding: 0 0.5rem;
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.5rem;
  max-width: 100%;

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
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1440px) {
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default observer(UserMessagesPage);
