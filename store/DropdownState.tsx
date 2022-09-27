import { makeObservable, observable, action } from 'mobx';
import { createContext, FunctionComponent, PropsWithChildren, useContext } from 'react';
import { observer } from 'mobx-react-lite';

// export type DropdownStateType = {
//   isOpen: boolean;
//   toggle: () => void;
// };

class DropdownState {
  isOpen = false;

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      toggle: action,
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

export const dropdownStateContext = createContext<DropdownState | null>(null);
dropdownStateContext.displayName = 'DropdownStateContext';

export const DropdownStateProvider: FunctionComponent = observer((props: PropsWithChildren<{}>) => {
  const dropdownState = new DropdownState();
  return <dropdownStateContext.Provider value={dropdownState}>{props.children}</dropdownStateContext.Provider>;
});

export const useDropdown = () => {
  const context = useContext(dropdownStateContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownStateProvider');
  }
  return context;
};
