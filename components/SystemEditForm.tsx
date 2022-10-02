import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';
import { useInputsAndValidation } from '../hooks/useInputsAndValidation';
import useSystems, { System } from '../hooks/useSystems';
import useToken from '../hooks/useToken';
import { FieldError, Input, StyledForm, StyledLabel, SubmitError } from '../styles/globalstyles';
import { ConfirmButton } from './CardEditPopup';

interface SystemEditFormProps {
  system: System;
  onRename: (systemId: string, newName: string) => void;
}

const SystemEditForm: FunctionComponent<SystemEditFormProps> = observer(({ system, onRename }) => {
  // const currentUser = useAuth();
  const currentUserToken = useToken();
  const { sendRenameRequest } = useSystems();
  const { handleChange, inputs, isValid, errors, submitError, setSubmitError, resetForm } = useInputsAndValidation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid && currentUserToken.userToken) {
      sendRenameRequest(currentUserToken.userToken, system._id, inputs.systemName)
        .then((res) => {
          onRename(system._id, res.newSystemName);
          resetForm();
        })
        .catch((err) => {
          setSubmitError(err.message || 'Error updating system');
        });
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          Rename system
          <Input name='systemName' value={inputs.systemName || ''} minLength={2} onChange={handleChange} type='string' required></Input>
        </StyledLabel>
        <FieldError>{errors.systemName}</FieldError>
        {submitError && <SubmitError>{String(submitError)}</SubmitError>}
        <ConfirmButton disabled={!isValid} isValid={isValid} type='submit'>
          Update system name
        </ConfirmButton>
      </StyledForm>
    </>
  );
});

export default SystemEditForm;
