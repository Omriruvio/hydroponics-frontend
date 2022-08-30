import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useState } from 'react';

export interface UserData {
  email: string;
  phoneNumber?: string | null;
}

export interface UserAuth extends UserData {
  isAdmin: boolean;
}

export interface IUserContext extends UserData {
  username?: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (user: UserAuth) => void;
  logout: () => void;
  register: (user: UserAuth) => void;
}

const UserContext = createContext<IUserContext>({
  isLoggedIn: false,
  phoneNumber: '',
  email: '',
  isAdmin: false,
  login: () => {},
  logout: () => {},
  register: () => {},
});
UserContext.displayName = 'UserDataContext';

export const useAuth = (): IUserContext => useContext(UserContext);

export const UserDataProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>('');
  const [email, setEmail] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const login = useCallback((user: { email: string; phoneNumber?: string | null; isAdmin: boolean }) => {
    const { email, phoneNumber, isAdmin } = user;
    setEmail(email);
    setPhoneNumber(phoneNumber || null);
    setIsAdmin(isAdmin);
    setIsLoggedIn(true);
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPhoneNumber('');
  };

  const register = () => {};

  return <UserContext.Provider value={{ register, login, logout, isLoggedIn, phoneNumber, email, isAdmin }}>{children}</UserContext.Provider>;
};
