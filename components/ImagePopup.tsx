import Image from 'next/image';
import styled from 'styled-components';
import { usePopups } from '../hooks/usePopups';
import { useEffect } from 'react';

const StyledOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  /* visibility: hidden;
  opacity: 0; */
`;

const StyledImagePopup = styled.div`
  border-radius: 5px;
  max-width: 80%;
  position: relative;
  transition: all 2s ease-in-out;

  & .close {
    position: absolute;
    top: -75px;
    right: -50px;
    transition: all 200ms;
    font-size: 50px;
    font-weight: bold;
    text-decoration: none;
    color: inherit;
  }

  & button {
    background: none;
    border: none;
    cursor: pointer;
  }

  @media screen and (max-width: 675px) {
    & .close {
      right: -10px;
    }
    max-width: 95%;
  }

  @media screen and (max-width: 550px) {
    & .close {
      font-size: 30px;
      top: -45px;
    }
  }
`;

const ImagePopup = () => {
  const popups = usePopups();
  useEffect(() => {
    const closeByEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && popups.closeAll();
    };
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [popups]);

  return (
    <StyledOverlay onClick={() => popups.handleClose('imagePopup')}>
      <StyledImagePopup className='popup'>
        <button onClick={() => popups.handleClose('imagePopup')} className='close'>
          &times;
        </button>
        <Image quality={100} objectFit='cover' width={'1600'} height={'900'} src={popups.selectedImage} alt='user uploaded image'></Image>
      </StyledImagePopup>
    </StyledOverlay>
  );
};

export default ImagePopup;
