import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  width: 120px;

  @media (min-width: 750px) {
    width: 200px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
`;

export const MainLogo = () => {
  return (
    <LogoWrapper>
      <Link href='/' passHref>
        <a>
          <Image layout='responsive' width={'355px'} height={'50px'} src='/hydroponics-logowebp.webp' alt='Hydroponics logo'></Image>
        </a>
      </Link>
    </LogoWrapper>
  );
};
