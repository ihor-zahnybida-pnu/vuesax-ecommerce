import { createContext } from 'react';

export interface InternalLayoutContextProps {
  headerHeight: () => number;
  setHeaderHeight: (x: number) => void;
  footerHeight: () => number;
  setFooterHeight: (x: number) => void;
}

const InternalLayoutContext = createContext<InternalLayoutContextProps>({
  headerHeight: () => 0,
  setHeaderHeight: () => console.log,
  footerHeight: () => 0,
  setFooterHeight: () => console.log,
});

export default InternalLayoutContext;
