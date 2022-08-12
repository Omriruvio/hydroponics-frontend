import { Input, StyledHeader, StyledLabel, StyledPage, SubmitButton } from '../../styles/globalstyles';
import Navbar from '../../components/Navbar';
import { FormEvent } from 'react';
import { useInputsAndValidation } from '../../hooks/useInputsAndValidation';
import { register as registerUser } from '../../utils/auth';
import { useRouter } from 'next/router';

interface RegisterInputs {
  email: string;
  phoneNumber: string;
  confirm: string;
}

// TODO: Implement custom error messages

const Signup = (props: any) => {
  const { handleChange, inputs, isValid, resetForm } = useInputsAndValidation();
  const router = useRouter();
  const registerInputs = inputs as RegisterInputs;
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { email, phoneNumber /* , confirm */ } = registerInputs;
    registerUser({
      email: email,
      phoneNumber: phoneNumber,
    })
      .then((user) => {
        router.push('/signin');
        // set state to logged in
        // TODO: add success message
        props.handleRegister(user);
        resetForm();
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledPage>
      <Navbar handleLogout={props.handleLogout}></Navbar>
      <StyledHeader>Sign up</StyledHeader>
      <form onSubmit={handleSubmit} className='form_type_onboarding'>
        <StyledLabel>
          Email
          <Input name='email' minLength={2} required={true} value={registerInputs.email || ''} onChange={handleChange} type='email'></Input>
        </StyledLabel>
        <StyledLabel>
          Phone Number
          <Input name='phoneNumber' minLength={6} required={true} value={registerInputs.phoneNumber || ''} onChange={handleChange} type='tel'></Input>
        </StyledLabel>
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
