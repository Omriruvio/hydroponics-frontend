// form to set access to system with radio buttons for either public or private
// uses useInputAndValidation hook to validate input and styled components for styling

import { FunctionComponent, useState } from 'react';
import useSystems from '../hooks/useSystems';
import { System } from '../hooks/useSystems';
import { StyledForm, StyledRadio, StyledRadioContainer, StyledRadioLabel, SubmitError } from '../styles/globalstyles';
import { observer } from 'mobx-react-lite';
import { StyledLabel } from '../styles/globalstyles';
import { ConfirmButton } from './CardEditPopup';

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
