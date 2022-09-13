import { FormEvent } from 'react';
import Navbar from '../../components/Navbar';
import { useInputsAndValidation } from '../../hooks/useInputsAndValidation';
import { FieldError, Input, StyledHeader, StyledLabel, StyledPage, SubmitButton, SubmitError } from '../../styles/globalstyles';
import { login as requestLogin } from '../../utils/auth';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import SwitchSignin from '../../components/SwitchSignin';

interface LoginInputs {
  email: string;
  phoneNumber: string;
}

// TODO: Implement custom error messages

const Signin = () => {
  const currentUser = useAuth();
  const router = useRouter();
  const { handleChange, inputs, isValid, resetForm, errors, submitError, setSubmitError } = useInputsAndValidation();
  const loginInputs = inputs as LoginInputs;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { email, phoneNumber } = loginInputs;
    requestLogin({ email: email.toLocaleLowerCase(), phoneNumber })
      .then((res) => {
        const token = (res as { token: string }).token;
        localStorage.setItem('jwt', token);
        currentUser.login({ email, phoneNumber, isAdmin: false });
        resetForm();
        router.push('/user-dashboard');
      })
      .catch((err) => {
        if (err === 'Error: 400') setSubmitError('Invalid email or phone number');
        else setSubmitError('Something went wrong');
      });
  };

  return (
    <StyledPage>
      <Navbar></Navbar>
      <StyledHeader>Log in</StyledHeader>
      <form onSubmit={handleSubmit} className='form_type_onboarding'>
        <StyledLabel>
          Email
          <Input name='email' value={loginInputs.email || ''} required={true} minLength={2} onChange={handleChange} type='email'></Input>
        </StyledLabel>
        <FieldError>{errors.email}</FieldError>
        <StyledLabel>
          Phone number
          <Input name='phoneNumber' value={loginInputs.phoneNumber || ''} required={true} minLength={6} onChange={handleChange} type='tel'></Input>
        </StyledLabel>
        <FieldError>{errors.phoneNumber}</FieldError>
        <SubmitError>{submitError}</SubmitError>
        <SubmitButton disabled={!isValid} isValid={isValid} type='submit'>
          Log in
        </SubmitButton>
      </form>
      <SwitchSignin />
    </StyledPage>
  );
};

export default Signin;
