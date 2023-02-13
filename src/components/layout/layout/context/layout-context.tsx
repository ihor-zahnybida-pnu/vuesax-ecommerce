import { createContext } from 'react';

export interface LayoutContextProps {
  isSidebarOpen: () => boolean;
  toggleSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextProps>({
  isSidebarOpen: () => false,
  toggleSidebar: console.log,
});

export default LayoutContext;
