import React, { useState } from 'react';
import InternalLayoutContext from './internal-layout-context';
import LayoutContext from './layout-context';

export interface LayoutProps {
  children: React.ReactNode;
  isSidebarOpen?: boolean;
}

export const LayoutProvider: React.FC<LayoutProps> = ({
  children,
  isSidebarOpen = false,
}) => {
  const [open, setOpen] = useState<boolean>(isSidebarOpen);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [footerHeight, setFooterHeight] = useState<number>(0);

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen: () => open,
        toggleSidebar: () => setOpen((prev) => (prev = !prev)),
      }}
    >
      <InternalLayoutContext.Provider
        value={{
          headerHeight: () => headerHeight,
          setHeaderHeight: (height: number) => {
            setHeaderHeight((prev) => (prev = height));
          },
          footerHeight: () => footerHeight,
          setFooterHeight: (height: number) =>
            setFooterHeight((prev) => (prev = height)),
        }}
      >
        {children}
      </InternalLayoutContext.Provider>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
