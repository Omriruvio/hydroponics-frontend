import { useDropdown } from '../store/DropdownState';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useRef } from 'react';
import { StyledLinkLabel } from '../styles/globalstyles';

const AccountDropdown = observer(() => {
  const currentUser = useAuth();
  const dropdown = useDropdown();

  // clicks outside of the dropdown should close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const current = dropdownRef.current as unknown as HTMLElement;
      if (current && !current.contains(event.target as Node)) {
        dropdown.toggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdown]);

  const dropdownRef = useRef(null);

  return (
    <DropdownWrapper ref={dropdownRef}>
      <DropdownClose onClick={() => dropdown.toggle()}>X</DropdownClose>
      <DropdownContent>
        <DropdownItem>
          <StyledLinkLabel isActive={false} href='/user-dashboard'>
            Dashboard
          </StyledLinkLabel>
        </DropdownItem>
        <DropdownItem>
          <StyledLinkLabel isActive={false} href='/user-dashboard'>
            Settings
          </StyledLinkLabel>
        </DropdownItem>
        <DropdownItem>
          <StyledLinkLabel isActive={false} onClick={currentUser.logout}>
            Logout
          </StyledLinkLabel>
        </DropdownItem>
      </DropdownContent>
    </DropdownWrapper>
  );
});

export default AccountDropdown;

const DropdownWrapper = styled.div`
  --dropdownPaddingVertical: 1rem;
  --dropdownPaddingHorizontal: 2rem;
  position: absolute;
  top: calc(var(--headerHeight) + var(--headerPaddingTop) + var(--headerHeight) / 2);
  right: 0;
  flex-direction: column;
  width: 100%;

  z-index: 1;
  padding: var(--dropdownPaddingVertical) var(--dropdownPaddingHorizontal);
  background-color: var(--mainGreen);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media (min-width: 500px) {
    width: 30%;
  }
  @media (min-width: 760px) {
  }
  @media (min-width: 1000px) {
  }
`;

const DropdownClose = styled.button`
  position: absolute;
  color: inherit;
  font-size: 1.5rem;
  top: var(--dropdownPaddingVertical);
  right: calc(var(--dropdownPaddingHorizontal) / 2);
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// const DropdownLink = styled.a`
//   font-size: 1.2rem;
//   font-weight: 500;
//   color: #000;
//   cursor: pointer;
// `;
