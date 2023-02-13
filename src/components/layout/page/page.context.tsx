import { createContext } from 'react';

export interface PageContextProps {
  filters: {
    property: string;
    value: string;
  }[];
}

const PageContext = createContext<PageContextProps>({
    filters: [],
    
});

export default PageContext;
