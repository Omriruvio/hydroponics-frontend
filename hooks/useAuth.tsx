import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useState } from 'react';

interface IUserContext {
  email: string;
  phoneNumber: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (user: { email: string; phoneNumber: string; isAdmin: boolean }) => void;
  logout: () => void;
}

const UserContext = createContext<IUserContext>({
  isLoggedIn: false,
  phoneNumber: '',
  email: '',
  isAdmin: false,
  login: () => {},
  logout: () => {},
});
UserContext.displayName = 'UserDataContext';

export const useAuth = (): IUserContext => useContext(UserContext);

export const UserDataProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const login = useCallback((user: { email: string; phoneNumber: string; isAdmin: boolean }) => {
    const { email, phoneNumber, isAdmin } = user;
    setEmail(email);
    setPhoneNumber(phoneNumber);
    setIsAdmin(isAdmin);
    setIsLoggedIn(true);
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPhoneNumber('');
  };

  // const handleRegister = () => { };

  return <UserContext.Provider value={{ login, logout, isLoggedIn, phoneNumber, email, isAdmin }}>{children}</UserContext.Provider>;
};
