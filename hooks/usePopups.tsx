import { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from 'react';

interface IPopupsContext {
  isOpen: {
    imagePopup: boolean;
  };
  closeAll: () => void;
  handleClose: (popup: string) => void;
  handleOpen: (popup: string) => void;
  handleSelectImage: (src: string) => void;
  selectedImage: string;
}

const initialPopupContext = {
  isOpen: {
    imagePopup: false,
  },
  closeAll: () => {},
  handleClose: () => {},
  handleOpen: () => {},
  handleSelectImage: () => {},
  selectedImage: '',
};

const PopupContext = createContext<IPopupsContext>(initialPopupContext);
PopupContext.displayName = 'PopupContext';

export const usePopups = () => useContext(PopupContext);

export const PopupProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [isOpen, setIsOpen] = useState(initialPopupContext.isOpen);

  const closeAll = () => {
    setIsOpen({ imagePopup: false });
  };

  const handleClose = (popup: string) => {
    setIsOpen({ ...isOpen, [popup]: false });
  };

  const handleOpen = (popup: string) => {
    setIsOpen({ ...isOpen, [popup]: true });
  };

  const handleSelectImage = (src: string) => {
    setSelectedImage(src);
    setIsOpen({ ...isOpen, imagePopup: true });
  };

  return (
    <PopupContext.Provider value={{ isOpen, closeAll, handleClose, handleOpen, handleSelectImage, selectedImage }}>{children}</PopupContext.Provider>
  );
};
