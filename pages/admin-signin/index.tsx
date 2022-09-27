import { FormEvent } from 'react';
import Navbar from '../../components/Navbar';
import { useInputsAndValidation } from '../../hooks/useInputsAndValidation';
import { FieldError, Input, StyledHeader, StyledLabel, StyledPage, SubmitButton, SubmitError } from '../../styles/globalstyles';
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
  const { handleChange, inputs, isValid, resetForm, errors, submitError, setSubmitError } = useInputsAndValidation();
  const loginInputs = inputs as AdminLoginInputs;
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = loginInputs;
    requestAdminLogin({ email: email.toLocaleLowerCase(), password })
      .then((res) => {
        const response = res as { token: string };
        if (!response.token) {
          throw new Error('No token received.');
        }
        localStorage.setItem('adminJWT', response.token);
        currentUser.login({ email, isAdmin: true });
        resetForm();
        router.push('/admin-dashboard');
      })
      .catch((err) => {
        if (err === 'Error: 403') setSubmitError('Invalid email or password');
        else setSubmitError('Something went wrong');
        console.log(err);
      });
  };
  return (
    <StyledPage>
      <Navbar />
      <StyledHeader>Admin Log in</StyledHeader>
      <form onSubmit={handleSubmit} className='form_type_onboarding'>
        <StyledLabel>
          Email
          <Input name='email' value={loginInputs.email || ''} required={true} minLength={2} onChange={handleChange} type='email'></Input>
        </StyledLabel>
        <FieldError>{errors.email}</FieldError>
        <StyledLabel>
          Password
          <Input name='password' value={loginInputs.password || ''} required={true} minLength={6} onChange={handleChange} type='password'></Input>
        </StyledLabel>
        <FieldError>{errors.password}</FieldError>
        <SubmitError>{submitError}</SubmitError>
        <SubmitButton disabled={!isValid} isValid={isValid} type='submit'>
          Log in
        </SubmitButton>
      </form>
      <SwitchSignin />
    </StyledPage>
  );
};

export default AdminSignin;
