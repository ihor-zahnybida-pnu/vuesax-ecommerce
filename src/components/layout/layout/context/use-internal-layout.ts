import { useContext } from 'react';
import InternalLayoutContext, {
  InternalLayoutContextProps,
} from './internal-layout-context';

const useInternalLayout = () => {
  const { headerHeight, setHeaderHeight, footerHeight, setFooterHeight } =
    useContext<InternalLayoutContextProps>(InternalLayoutContext);

  return {
    headerHeight: headerHeight(),
    setHederHeight: (x: number) => {
      setHeaderHeight(x);
    },
    footerHeight: footerHeight(),
    setFooterHeight: (x: number) => setFooterHeight(x),
  };
};

export default useInternalLayout;
