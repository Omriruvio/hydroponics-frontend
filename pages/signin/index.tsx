import { FormEvent } from 'react';
import Navbar from '../../components/Navbar';
import { useInputsAndValidation } from '../../hooks/useInputsAndValidation';
import { Input, StyledHeader, StyledLabel, StyledPage, SubmitButton } from '../../styles/globalstyles';
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
  const { handleChange, inputs, isValid, resetForm } = useInputsAndValidation();
  const loginInputs = inputs as LoginInputs;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { email, phoneNumber } = loginInputs;
    requestLogin({ email, phoneNumber })
      .then(() => {
        // set user context logged in
        // set JWT in cookies
        currentUser.login({ email, phoneNumber, isAdmin: false });
        resetForm();
        router.push('/user-dashboard');
      })
      .catch((err) => console.log(err));
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
        <StyledLabel>
          Phone number
          <Input name='phoneNumber' value={loginInputs.phoneNumber || ''} required={true} minLength={6} onChange={handleChange} type='tel'></Input>
        </StyledLabel>
        <SubmitButton disabled={!isValid} isValid={isValid} type='submit'>
          Log in
        </SubmitButton>
      </form>
      <SwitchSignin />
    </StyledPage>
  );
};

export default Signin;
