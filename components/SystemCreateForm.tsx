import React, { FunctionComponent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../hooks/useAuth';
import useSystems from '../hooks/useSystems';
import { StyledForm, SubmitError, StyledRadio, StyledRadioContainer, Input, StyledLabel, StyledRadioLabel  } from '../styles/globalstyles';
import { ConfirmButton } from './CardEditPopup';

const SystemCreateForm: FunctionComponent = () => {
  const { data: systems, setData: setSystems } = useSystems();
  const currentUser = useAuth();
  const [newSystem, setNewSystem] = useState({
    name: '',
    isPublic: false,
    isDefault: false,
  });
  const [error, setError] = useState('');

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/systems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({
        name: newSystem.name,
        isPublic: newSystem.isPublic,
        isDefault: newSystem.isDefault,
      }),
    });
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    } else {
      setSystems([...systems, data]);
      setNewSystem({
        name: '',
        isPublic: false,
        isDefault: false,
      });
    }
  }

  return (
    <>
    <StyledForm onSubmit={handleCreate}>
      <StyledLabel>
        System name:
        <Input
          type="text"
          placeholder="System name"
          value={newSystem.name}
          onChange={(e) => setNewSystem({ ...newSystem, name: e.target.value })}
        />
      </StyledLabel>
      <StyledRadioContainer>
        <StyledRadioLabel htmlFor="public-create">
          <StyledRadio
            type="radio"
            name="access"
            id="public-create"
            value="public-create"
            checked={newSystem.isPublic}
            onChange={(e) => setNewSystem({ ...newSystem, isPublic: e.target.checked })}
          />
          Public
        </StyledRadioLabel>
        <StyledRadioLabel htmlFor="private-create">
          <StyledRadio
            type="radio"
            name="access"
            id="private-create"
            value="private-create"
            checked={!newSystem.isPublic}
            onChange={(e) => setNewSystem({ ...newSystem, isPublic: !e.target.checked })}
          />
          Private
        </StyledRadioLabel>
      </StyledRadioContainer>
      {/* radio input for selecting system as default or not */}
      <StyledRadioContainer>
        <StyledRadioLabel htmlFor="default-create">
          <StyledRadio
            type="radio"
            name="default-create"
            id="default-create"
            value="default-create"
            checked={newSystem.isDefault}
            onChange={(e) => setNewSystem({ ...newSystem, isDefault: e.target.checked })}
          />
          Default
        </StyledRadioLabel>
        <StyledRadioLabel htmlFor="notdefault">
          <StyledRadio
            type="radio"
            name="nodefault"
            id="notdefault"
            value="notdefault"
            checked={!newSystem.isDefault}
            onChange={(e) => setNewSystem({ ...newSystem, isDefault: !e.target.checked })}
          />
          Not Default
        </StyledRadioLabel>
      </StyledRadioContainer>
      <SubmitError>{error ? error : '\u00A0'}</SubmitError>
      <ConfirmButton type="submit" isValid={true}>
        Create
      </ConfirmButton>
    </StyledForm>
    </>
  );
};

export default observer(SystemCreateForm);
