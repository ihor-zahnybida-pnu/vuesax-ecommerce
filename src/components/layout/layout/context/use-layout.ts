import { useContext } from 'react';
import LayoutContext, { LayoutContextProps } from './layout-context';

const useLayout = () => {
  const { isSidebarOpen, toggleSidebar } =
    useContext<LayoutContextProps>(LayoutContext);

  return {
    isSidebarOpen: isSidebarOpen(),
    toggleSidebar: () => toggleSidebar(),
  };
};

export default useLayout;
