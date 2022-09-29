import { useDropdown } from '../store/DropdownState';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';

const SettingsDropdown = observer(() => {
  const dropdown = useDropdown();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const current = dropdownRef.current as unknown as HTMLElement;
      if (current && !current.contains(event.target as Node)) {
        dropdown.toggle();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dropdown.toggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [dropdown]);

  const dropdownRef = useRef(null);

  return (
    <DropdownWrapper ref={dropdownRef}>
      <DropdownClose onClick={() => dropdown.toggle()}>&times;</DropdownClose>
      <DropdownContent>
        <DropdownItem>
          <DropdownLabel isActive={false} href='/user-messages'>
            Messages - view and edit
          </DropdownLabel>
        </DropdownItem>
        {/* <DropdownItem>
          <DropdownLabel isActive={false} href='/user-dashboard'>
            Dashboard
          </DropdownLabel>
        </DropdownItem>
        <DropdownItem>
          <DropdownLabel isActive={false} href='/user-settings'>
            Settings
          </DropdownLabel>
        </DropdownItem>
        <DropdownItem>
          <DropdownLabel isActive={false} onClick={currentUser.logout}>
            Logout
          </DropdownLabel>
        </DropdownItem> */}
      </DropdownContent>
    </DropdownWrapper>
  );
});

export default SettingsDropdown;

const DropdownLabel = styled.a<{ isActive: boolean }>`
  cursor: pointer;
  border-bottom: ${({ isActive }) => isActive && '1px solid rgb(106, 184, 139)'};
  font-size: 1rem;
  line-height: var(--headerHeight);
  transition: all 0.2s ease-in-out;

  &:hover {
    // fade out
    opacity: 0.7;
  }

  @media (min-width: 760px) {
    font-size: 1.7rem;
  }
  @media (min-width: 1000px) {
    font-size: 2.2rem;
  }
`;

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

  &:hover {
    opacity: 0.7;
  }
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
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
