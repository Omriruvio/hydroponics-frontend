// form to set access to system with radio buttons for either public or private
// uses useInputAndValidation hook to validate input and styled components for styling

import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import useSystems from '../hooks/useSystems';
import { System } from '../hooks/useSystems';
import { SubmitError } from '../styles/globalstyles';
import { observer } from 'mobx-react-lite';
import { StyledLabel } from '../styles/globalstyles';
import { ConfirmButton } from './CardEditPopup';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 1rem;
  padding: 1rem;
  width: calc(100vw - 2rem);
  max-width: 500px;
  border: 1px solid var(--mainGreen);
  border-radius: 0.5rem;
  background-color: var(--mainWhite);
  box-shadow: 0 0 0.5rem 0.1rem var(--mainGreen);
`;

// const StyledInput = styled.input`
//   width: 100%;
//   padding: 0.5rem;
//   border: 1px solid var(--mainGreen);
//   border-radius: 0.5rem;
//   background-color: var(--mainWhite);
//   box-shadow: 0 0 0.5rem 0.1rem var(--mainGreen);
//   font-size: 1rem;
//   font-family: inherit;
//   color: var(--mainGreen);
//   outline: none;
//   transition: all 0.2s ease-in-out;

//   &:focus {
//     box-shadow: 0 0 0.5rem 0.1rem var(--mainGreen);
//   }
// `;

const StyledRadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledRadio = styled.input`
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--mainGreen);
  border-radius: 50%;
  background-color: var(--mainWhite);
  font-size: 2rem;
  font-family: inherit;
  color: var(--mainGreen);
  outline: none;
  transition: all 0.2s ease-in-out;
`;

const StyledRadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-family: inherit;
  color: var(--mainWhite);
  outline: none;
  transition: all 0.2s ease-in-out;

  &:focus {
    box-shadow: 0 0 0.5rem 0.1rem var(--mainGreen);
  }
`;

const SystemSetAccessForm: FunctionComponent<{
  system: System;
  onSetAccess: (systemId: string, isPublic: boolean) => void;
}> = ({ system, onSetAccess }) => {
  const { setSystemAccess } = useSystems();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [access, setAccess] = useState<'public' | 'private'>(system.isPublic ? 'public' : 'private');
  const [accessInput, setAccessInput] = useState<'public' | 'private'>(system.isPublic ? 'public' : 'private');
  const currentUserToken = localStorage.getItem('jwt');

  const handleAccess = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccess(e.target.value as 'public' | 'private');
    setAccessInput(e.target.value as 'public' | 'private');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!currentUserToken) {
      setError('You must be logged in to set access');
      console.log('You must be logged in to set access');
      return;
    }

    e.preventDefault();
    setError(null);
    setSystemAccess(currentUserToken, system._id, access === 'public' ? true : false)
      .then((res) => {
        console.log(res);
        setLoading(false);
        onSetAccess(system._id, access === 'public' ? true : false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor='access'>Set Access</StyledLabel>
      <StyledRadioContainer>
        <StyledRadioLabel htmlFor='public'>
          <StyledRadio type='radio' name='access' id='public' value='public' checked={accessInput === 'public'} onChange={handleAccess} />
          Public
        </StyledRadioLabel>
        <StyledRadioLabel htmlFor='private'>
          <StyledRadio type='radio' name='access' id='private' value='private' checked={accessInput === 'private'} onChange={handleAccess} />
          Private
        </StyledRadioLabel>
      </StyledRadioContainer>
      <SubmitError>{error ? error : '\u00A0'}</SubmitError>
      <ConfirmButton type='submit' isValid={true}>
        {loading ? 'Loading...' : 'Set Access'}
      </ConfirmButton>
    </StyledForm>
  );
};

export default observer(SystemSetAccessForm);
