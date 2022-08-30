import { useRouter } from 'next/router';
import styled from 'styled-components';
import { StyledLabel } from '../styles/globalstyles';

const SwitchSignin = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const switchToPath = currentPath === '/signin' ? '/admin-signin' : '/signin';
  const switchToName = currentPath === '/signin' ? 'Admin signin' : 'Grower signin';

  const handleSwitchClick = () => {
    router.push(switchToPath);
  };

  return <StyledSwitch onClick={handleSwitchClick}>{switchToName}</StyledSwitch>;
};

const StyledSwitch = styled(StyledLabel)`
  cursor: pointer;
  padding-top: 2rem;
  margin: auto;
  width: fit-content;

  &:hover {
    text-decoration: underline;
    text-decoration-color: rgb(106, 184, 139);
  }
`;
export default SwitchSignin;
