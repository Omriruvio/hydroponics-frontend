import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --mainBackgroundColor: #171717;
    --popupBackgroundColor: #171717;
    --errorRed: #a20000;
    --warningOrange: #E95B2D;
    --mainGreen: rgb(46, 80, 60);
    --lightGreen: rgb(106,184,139);
    --headerHeight: 1.8rem;
    --headerPaddingTop: 2.5rem;
    --brightGreen: rgb(106, 184, 139);
    --messageCardHoverTraisitionDelay: 0.2s;
    --mainGray: #e0e0e020;

    @media (min-width: 760px) {
      --headerHeight: 2.6rem;
    }

    @media (min-width: 1000px) {
      --headerHeight: 3.2rem;
    }

    /* @media (min-width: 1440px) {
      --headerHeight: 4.2rem;
    } */
  }

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

  body {
    background-color: var(--mainBackgroundColor);
    font-family: 'Roboto', sans-serif;
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
  display: flex;
  flex-direction: column;

  @media (min-width: 500px) {
    padding: 0 2rem;
  }
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;

  @media (min-width: 760px) {
    font-size: 1.7rem;
  }
  @media (min-width: 1000px) {
    font-size: 2.2rem;
  }
`;

export const StyledLinkLabel = styled.a<{ isActive: boolean }>`
  cursor: pointer;
  border-bottom: ${({ isActive }) => isActive && '1px solid rgb(106, 184, 139)'};
  font-size: 1.2rem;
  line-height: var(--headerHeight);
  transition: all 0.2s ease-in-out;

  &:hover {
    // fade out
    opacity: 0.7;
  }

  @media (min-width: 760px) {
    font-size: 2rem;
  }
  @media (min-width: 1000px) {
    font-size: 2.5rem;
  }
`;

export const Nav = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StyledUl = styled.ul`
  padding: 0 0.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  max-width: 100%;
  place-items: center;

  li {
    overflow: hidden;
    list-style: none;
    width: 100%;
  }

  @media (min-width: 500px) {
    padding: 0;
    gap: 0.7rem;
  }

  @media (min-width: 800px) {
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
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

  @media (min-width: 760px) {
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

  @media (min-width: 760px) {
    font-size: 3rem;
  }
  @media (min-width: 1000px) {
    font-size: 3.5rem;
  }
`;

export const StyledDivider = styled.hr`
  border: 1px solid var(--mainGray);
  margin: 1rem 0;
`;

export const OpaqueDivider = styled.hr`
  margin: 1rem 0;
  border: 1px solid var(--mainGray);
  opacity: 0;
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
  @media (min-width: 760px) {
    font-size: 1.7rem;
    line-height: 3.5rem;
  }
  @media (min-width: 1000px) {
    font-size: 2.5rem;
    line-height: 4.5rem;
  }
`;

export const SubmitError = styled.p`
  color: var(--errorRed);
  font-size: 1.5rem;
  text-align: center;
  @media (min-width: 760px) {
    font-size: 1.7rem;
  }
  @media (min-width: 1000px) {
    font-size: 2.2rem;
  }
`;

export const FieldError = styled.span`
  --baseSize: 1.1rem;
  --midSize: 1.4rem;
  --largeSize: 1.7rem;
  --baseMargin: 0.2rem;
  min-height: calc(var(--baseSize) + var(--baseMargin) * 2);
  margin: var(--baseMargin) 0;
  padding: 0;
  color: var(--errorRed);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  @media (min-width: 760px) {
    --midMargin: calc(var(--baseMargin) * 1.5);
    font-size: var(--midSize);
    min-height: calc(var(--midSize) + var(--midMargin) * 2);
  }
  @media (min-width: 1000px) {
    --largeMargin: calc(var(--baseMargin) * 2);
    font-size: var(--largeSize);
    min-height: calc(var(--largeSize) + var(--largeMargin) * 2);
  }
`;
