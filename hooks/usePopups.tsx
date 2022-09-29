import { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from 'react';
import { UserMessage } from '../utils/parseCropData';

interface IPopupsContext {
  isOpen: {
    imagePopup: boolean;
    cardEditPopup: boolean;
    cardDeletePopup: boolean;
  };
  closeAll: () => void;
  handleClose: (popup: string) => void;
  handleOpen: (popup: string) => void;
  handleSelectImage: (src: string) => void;
  handleEditMessage: (message: UserMessage) => void;
  handleDeleteMessage: (message: UserMessage) => void;
  selectedImage: string;
  selectedMessage: UserMessage | null;
}

const initialPopupContext = {
  isOpen: {
    imagePopup: false,
    cardEditPopup: false,
    cardDeletePopup: false,
  },
  closeAll: () => {},
  handleClose: () => {},
  handleOpen: () => {},
  handleSelectImage: () => {},
  handleEditMessage: () => {},
  handleDeleteMessage: () => {},
  selectedImage: '',
  selectedMessage: null,
};

const PopupContext = createContext<IPopupsContext>(initialPopupContext);
PopupContext.displayName = 'PopupContext';

export const usePopups = () => useContext(PopupContext);

export const PopupProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<UserMessage | null>(null);
  const [isOpen, setIsOpen] = useState(initialPopupContext.isOpen);

  const closeAll = () => {
    setIsOpen({ imagePopup: false, cardEditPopup: false, cardDeletePopup: false });
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

  const handleEditMessage = (message: UserMessage) => {
    setSelectedMessage(message);
    setIsOpen({ ...isOpen, cardEditPopup: true });
  };

  const handleDeleteMessage = (message: UserMessage) => {
    setSelectedMessage(message);
    setIsOpen({ ...isOpen, cardDeletePopup: true });
  };

  return (
    <PopupContext.Provider
      value={{ isOpen, closeAll, handleClose, handleOpen, handleSelectImage, selectedImage, handleEditMessage, selectedMessage, handleDeleteMessage }}
    >
      {children}
    </PopupContext.Provider>
  );
};
