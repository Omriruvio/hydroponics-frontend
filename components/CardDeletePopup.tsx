import { usePopups } from '../hooks/usePopups';
import { FunctionComponent, useEffect } from 'react';
import { UserMessage } from '../utils/parseCropData';
import { StyledHeader, SubmitError } from '../styles/globalstyles';
import { useInputsAndValidation } from '../hooks/useInputsAndValidation';
import MessageCard from './MessageCard';
import { sendDeleteMessage } from '../utils/cropData';
import useToken from '../hooks/useToken';
import { ConfirmButton, PopupWindow, StyledOverlay } from './CardEditPopup';

type CardDeletePopupProps = {
  message: UserMessage;
  handleDelete: (messageId: string) => void;
};

const CardDeletePopup: FunctionComponent<CardDeletePopupProps> = ({ message, handleDelete }) => {
  const popups = usePopups();
  const currentUserToken = useToken().userToken;
  const { submitError, setSubmitError } = useInputsAndValidation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sendDelete = () => {
      if (!currentUserToken) return;
      sendDeleteMessage(currentUserToken, message._id)
        .then(() => {
          handleDelete(message._id);
          popups.closeAll();
        })
        .catch((err) => {
          console.log('Error updating message');
          setSubmitError(err);
        });
    };

    if (currentUserToken) {
      sendDelete();
    }
  };

  useEffect(() => {
    const closeByEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && popups.closeAll();
    };
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [popups]);

  return (
    <StyledOverlay onClick={() => popups.handleClose('cardDeletePopup')}>
      <PopupWindow onClick={(e) => e.stopPropagation()}>
        <button onClick={() => popups.handleClose('cardDeletePopup')} className='close'>
          &times;
        </button>
        <StyledHeader>Delete this card?</StyledHeader>
        <h2>Card to be deleted:</h2>
        <MessageCard message={message} preview={true} />
        <form onSubmit={handleSubmit} className='form_type_onboarding'>
          {submitError && <SubmitError>{submitError}</SubmitError>}
          <ConfirmButton isValid={true} type='submit'>
            DELETE CARD
          </ConfirmButton>
        </form>
      </PopupWindow>
    </StyledOverlay>
  );
};

export default CardDeletePopup;
