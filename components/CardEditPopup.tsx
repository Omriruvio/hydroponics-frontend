import styled from 'styled-components';
import { usePopups } from '../hooks/usePopups';
import { FunctionComponent, useEffect } from 'react';
import { UserMessage } from '../utils/parseCropData';

const StyledOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  /* visibility: hidden;
  opacity: 0; */
`;

const StyledImagePopup = styled.div`
  border-radius: 5px;
  max-width: 80%;
  position: relative;
  transition: all 2s ease-in-out;

  & .close {
    position: absolute;
    top: -75px;
    right: -50px;
    transition: all 200ms;
    font-size: 50px;
    font-weight: bold;
    text-decoration: none;
    color: #333;
  }

  & button {
    background: none;
    border: none;
    cursor: pointer;
  }

  @media screen and (max-width: 675px) {
    & .close {
      right: -10px;
    }
    max-width: 95%;
  }

  @media screen and (max-width: 550px) {
    & .close {
      font-size: 30px;
      top: -45px;
    }
  }
`;

const CardEditPopup: FunctionComponent<{ message: UserMessage }> = ({ message }) => {
  const popups = usePopups();
  useEffect(() => {
    const closeByEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && popups.closeAll();
    };
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [popups]);

  return (
    <StyledOverlay onClick={() => popups.handleClose('cardEditPopup')}>
      <StyledImagePopup className='popup'>
        <>
          <button onClick={() => popups.handleClose('cardEditPopup')} className='close'>
            &times;
          </button>
          <h1>EDIT CARD</h1>
          <div>{message._id}</div>
          <div>{message.dateReceived.toString()}</div>
        </>
      </StyledImagePopup>
    </StyledOverlay>
  );
};

export default CardEditPopup;
