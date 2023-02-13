import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useInternalLayout from '../context/use-internal-layout';

const HeaderStyled = styled.div.attrs(({ ref }) => ({
  ref: ref,
}))`
  position: fixed;
  right: 0;
  width: 100%;
  z-index: 1;

  height: ${(props) => props.theme.height};
`;

interface HeaderZoneProps {
  children: React.ReactNode;
}

export const HeaderZone: React.FC<HeaderZoneProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setHederHeight } = useInternalLayout();
  
  useEffect(() => {
    const firstChild = ref.current && (ref.current.firstChild as HTMLElement);
    if (firstChild) {
      setHederHeight(firstChild.clientHeight);
    }
  }, []);

  return (
    <HeaderStyled ref={ref} className="header-zone">
      {children}
    </HeaderStyled>
  );
};
