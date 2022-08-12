import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  .form_type_onboarding {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin: auto;
  }
`;

export const GridChartContainer = styled.li`
  padding: 0;
  margin: 0;
  width: 100%;
  height: 200px;

  & .recharts-default-legend {
    font-size: 1.2rem;

    @media (min-width: 760px) {
      font-size: 1.5rem;
    }

    @media (min-width: 1000px) {
      font-size: 1.7rem;
    }
  }

  @media (min-width: 760px) {
    height: 270px;
  }

  @media (min-width: 1000px) {
    height: 330px;
  }
`;

export const StyledPage = styled.div`
  margin: auto;
  max-width: 1440px;
  padding: 0 2rem;
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.6rem;

  @media (min-width: 750px) {
    font-size: 1.7rem;
  }
  @media (min-width: 1000px) {
    font-size: 2.2rem;
  }
`;

export const Input = styled.input`
  margin-top: 0.2rem;
  min-width: 200px;
  line-height: 1.8rem;
  font-size: 1.5rem;

  &:focus {
    background-color: rgb(106, 184, 139);
  }

  @media (min-width: 750px) {
    line-height: 2.2rem;
    font-size: 1.7rem;
  }
  @media (min-width: 1000px) {
    line-height: 3rem;
    font-size: 2.5rem;
  }
`;

export const StyledHeader = styled.h1`
  margin: 3rem 0;
  text-align: center;
  font-size: 2.2rem;

  @media (min-width: 750px) {
    font-size: 3rem;
  }
  @media (min-width: 1000px) {
    font-size: 3.5rem;
  }
`;

export const SubmitButton = styled.button<{ isValid: boolean }>`
  border: none;
  cursor: pointer;
  margin-top: 15px;
  line-height: 2.5rem;
  background-color: ${({ isValid }) => isValid && 'rgb(106, 184, 139)'};
  &:disabled {
    background-color: rgba(106, 184, 139, 0.4);
  }
  @media (min-width: 750px) {
    font-size: 1.7rem;
    line-height: 3.5rem;
  }
  @media (min-width: 1000px) {
    font-size: 2.5rem;
    line-height: 4.5rem;
  }
`;
