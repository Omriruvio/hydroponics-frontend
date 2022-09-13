import { FieldError, Input, StyledHeader, StyledLabel, StyledPage, SubmitButton } from '../../styles/globalstyles';
import Navbar from '../../components/Navbar';
import { FormEvent } from 'react';
import { useInputsAndValidation } from '../../hooks/useInputsAndValidation';
import { register } from '../../utils/auth';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

interface RegisterInputs {
  email: string;
  phoneNumber: string;
  username: string;
  confirm: string;
}

// TODO: Implement custom error messages

const Signup = () => {
  const { handleChange, inputs, isValid, resetForm, errors } = useInputsAndValidation();
  const currentUser = useAuth();
  const router = useRouter();
  const registerInputs = inputs as RegisterInputs;
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { email, phoneNumber /* , confirm */ } = registerInputs;
    register({
      email: email,
      phoneNumber: phoneNumber,
    })
      .then(() => {
        // TODO: add success message
        router.push('/signin');
        currentUser.register({ email, phoneNumber, isAdmin: false });
        resetForm();
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledPage>
      <Navbar />
      <StyledHeader>Sign up</StyledHeader>
      <form onSubmit={handleSubmit} className='form_type_onboarding'>
        <StyledLabel>
          Email
          <Input name='email' minLength={2} required={true} value={registerInputs.email || ''} onChange={handleChange} type='email'></Input>
        </StyledLabel>
        <FieldError>{errors.email}</FieldError>
        <StyledLabel>
          Username
          <Input name='username' minLength={4} required={true} value={registerInputs.username || ''} onChange={handleChange} type='text'></Input>
        </StyledLabel>
        <FieldError>{errors.username}</FieldError>
        <StyledLabel>
          Phone Number
          <Input name='phoneNumber' minLength={6} required={true} value={registerInputs.phoneNumber || ''} onChange={handleChange} type='tel'></Input>
        </StyledLabel>
        <FieldError>{errors.phoneNumber}</FieldError>
        {/* <StyledLabel>
          Confirm password
          <Input name='confirm' minLength={6} required={true} value={registerInputs.confirm || ''} onChange={handleChange} type='tel'></Input>
        </StyledLabel> */}

        <SubmitButton disabled={!isValid} isValid={isValid} type='submit'>
          Register
        </SubmitButton>
      </form>
    </StyledPage>
  );
};

export default Signup;
