import { FormEvent } from 'react';
import Navbar from '../../components/Navbar';
import { useInputsAndValidation } from '../../hooks/useInputsAndValidation';
import { Input, StyledHeader, StyledLabel, StyledPage, SubmitButton } from '../../styles/globalstyles';
import { adminLogin as requestAdminLogin } from '../../utils/auth';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import SwitchSignin from '../../components/SwitchSignin';

interface AdminLoginInputs {
  email: string;
  password: string;
}

const AdminSignin = () => {
  const currentUser = useAuth();
  const router = useRouter();
  const { handleChange, inputs, isValid, resetForm } = useInputsAndValidation();
  const loginInputs = inputs as AdminLoginInputs;
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = loginInputs;
    requestAdminLogin({ email, password })
      .then(() => {
        // set user context logged in
        // set JWT in cookies
        currentUser.login({ email, isAdmin: true });
        resetForm();
        router.push('/admin-dashboard');
      })
      .catch((err) => console.log(err));
  };
  return (
    <StyledPage>
      <Navbar></Navbar>
      <StyledHeader>Admin Log in</StyledHeader>
      <form onSubmit={handleSubmit} className='form_type_onboarding'>
        <StyledLabel>
          Email
          <Input name='email' value={loginInputs.email || ''} required={true} minLength={2} onChange={handleChange} type='email'></Input>
        </StyledLabel>
        <StyledLabel>
          Password
          <Input name='password' value={loginInputs.password || ''} required={true} minLength={6} onChange={handleChange} type='password'></Input>
        </StyledLabel>
        <SubmitButton disabled={!isValid} isValid={isValid} type='submit'>
          Log in
        </SubmitButton>
      </form>
      <SwitchSignin />
    </StyledPage>
  );
};

export default AdminSignin;
