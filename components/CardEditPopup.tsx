import styled from 'styled-components';
import { usePopups } from '../hooks/usePopups';
import { FunctionComponent, useEffect } from 'react';
import { UserMessage } from '../utils/parseCropData';
import { FieldError, Input, StyledHeader, StyledLabel, SubmitError } from '../styles/globalstyles';
import { useInputsAndValidation } from '../hooks/useInputsAndValidation';
import MessageCard from './MessageCard';
import { sendUpdatedMessage } from '../utils/cropData';
import useToken from '../hooks/useToken';
import useSystems from '../hooks/useSystems';

export type MessageUpdateInputs = {
  _id: string;
  ph?: string;
  ec?: string;
  temperature?: string;
  systemName?: string;
};

type CardEditPopupProps = {
  message: UserMessage;
  handleUpdate: (message: UserMessage) => void;
};

const CardEditPopup: FunctionComponent<CardEditPopupProps> = ({ message, handleUpdate }) => {
  const popups = usePopups();
  const currentUserToken = useToken().userToken;
  const { handleChange, inputs, isValid, errors, submitError, setSubmitError } = useInputsAndValidation();
  const editInputs = inputs as UserMessage;
  const userSystems = useSystems();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const sendUpdate = () => {
      if (!currentUserToken) return;
      sendUpdatedMessage(currentUserToken, { ...editInputs, _id: message._id })
        .then((message) => {
          handleUpdate(message as UserMessage);
          popups.closeAll();
        })
        .catch((err) => {
          console.log('Error updating message');
          setSubmitError(err);
        });
    };

    if (isValid && currentUserToken) {
      e.preventDefault();
      sendUpdate();
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
    <StyledOverlay onClick={() => popups.handleClose('cardEditPopup')}>
      <EditPopup onClick={(e) => e.stopPropagation()}>
        <button onClick={() => popups.handleClose('cardEditPopup')} className='close'>
          &times;
        </button>
        <StyledHeader>Edit message data</StyledHeader>
        <h2>Original message data:</h2>
        <MessageCard message={message} preview={true} />
        <h2>Edit message data:</h2>
        <form onSubmit={handleSubmit} className='form_type_onboarding'>
          <StyledLabel>
            PH
            <Input name='ph' placeholder={message.ph} value={editInputs.ph || ''} minLength={2} onChange={handleChange} type='string'></Input>
          </StyledLabel>
          <FieldError>{errors.ph}</FieldError>
          <StyledLabel>
            EC
            <Input name='ec' placeholder={message.ec} value={editInputs.ec || ''} minLength={2} onChange={handleChange} type='string'></Input>
          </StyledLabel>
          <FieldError>{errors.ec}</FieldError>
          <StyledLabel>
            Temperature
            <Input
              name='temperature'
              placeholder={message.temperature}
              value={editInputs.temperature || ''}
              minLength={2}
              onChange={handleChange}
              type='string'
            ></Input>
          </StyledLabel>
          <FieldError>{errors.temperature}</FieldError>
          <StyledLabel>
            Select system
            <Select name='systemName' value={editInputs.systemName || message.systemName || ''} onChange={handleChange}>
              {userSystems.data.map((system) => (
                <option key={system._id} value={system.name}>
                  {system.name}
                </option>
              ))}
            </Select>
          </StyledLabel>
          <FieldError>{errors.temperature}</FieldError>
          {submitError && <SubmitError>{submitError}</SubmitError>}
          <ConfirmButton disabled={!isValid} isValid={isValid} type='submit'>
            Confirm Edits
          </ConfirmButton>
        </form>
      </EditPopup>
    </StyledOverlay>
  );
};

const Select = styled.select`
  width: 100%;
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 16px;
  color: #000;
  background-color: #fff;
  outline: none;
  &:focus {
    border: 1px solid #1890ff;
  }
`;

export const ConfirmButton = styled.button<{ isValid: boolean }>`
  color: ${(props) => (!props.isValid ? 'var(--lightGreen)' : 'black')};
  border: none;
  cursor: ${(props) => (props.isValid ? 'pointer' : 'default')};
  margin-top: 15px;
  line-height: 2.5rem;
  background-color: ${({ isValid }) => isValid && 'rgb(106, 184, 139)'};
  &:disabled {
    background-color: rgba(106, 184, 139, 0.4);
  }
  @media (min-width: 760px) {
    font-size: 1.7rem;
    line-height: 3.5rem;
  }
  @media (min-width: 1000px) {
    font-size: 2.5rem;
    line-height: 4.5rem;
  }
`;

const StyledOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  /* visibility: hidden;
  opacity: 0; */
`;

const EditPopup = styled.div`
  background-color: var(--popupBackgroundColor);
  border: 1px solid white;
  padding: 3rem;
  border-radius: 5px;
  width: clamp(300px, 80%, 600px);
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
    color: inherit;
  }

  & .close {
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

export default CardEditPopup;
