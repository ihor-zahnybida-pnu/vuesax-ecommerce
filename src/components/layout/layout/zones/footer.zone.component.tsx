import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useInternalLayout from '../context/use-internal-layout';

const FooterStyled = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

interface FooterZoneProps {
  children: React.ReactNode;
}

export const FooterZone: React.FC<FooterZoneProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setFooterHeight } = useInternalLayout();

  useEffect(() => {
    const firstChild = ref.current && (ref.current.firstChild as HTMLElement);
    if (firstChild) {
      setFooterHeight(firstChild.clientHeight);
    }
  });
  return (
    <FooterStyled ref={ref} className="footer-zone">
      {children}
    </FooterStyled>
  );
};
