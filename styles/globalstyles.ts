import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  .form_type_onboarding {
    display: flex;
    flex-direction: column;
    width: min-content;
    margin: auto;
    font-size: 1.2rem;
  }
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.6rem;
`;

export const Input = styled.input`
  margin-top: 0.2rem;
  min-width: 200px;
  &:focus {
    background-color: rgb(106, 184, 139);
  }
`;

export const StyledHeader = styled.h1`
  margin: 3rem 0;
  text-align: center;
  font-size: 2.2rem;
`;

export const SubmitButton = styled.button<{ isValid: boolean }>`
  border: none;
  line-height: 22px;
  cursor: pointer;
  background-color: ${({ isValid }) => isValid && 'rgb(106, 184, 139)'};
  &:disabled {
    background-color: rgba(106, 184, 139, 0.4);
  }
`;
