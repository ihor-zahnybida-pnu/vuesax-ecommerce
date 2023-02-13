import styled from 'styled-components';
import { breakpoints } from './../../../utilities/media-queries';
import { useWindowDimensions } from './../../../utilities/use-window-dimensions';
import useLayout from '../layout/context/use-layout';

const SidebarStyled = styled.div`
  transition: margin-inline-start 0.6s;
  overflow: scroll;
  padding: 0.7em 0 2em 1em;
  flex-basis: ${props => props.theme.flexBasis};
  margin-inline-start: ${props => props.theme.marginInlineStart};
`;

interface SidebarZoneProps {
  children: React.ReactNode;
}

export const SidebarZone: React.FC<SidebarZoneProps> = ({ children }) => {
  const { width: windowsWidth } = useWindowDimensions();
  const isScreenMax = windowsWidth >= breakpoints.max;
  const { isSidebarOpen } = useLayout();
  return (
    <SidebarStyled
      style={{
        marginInlineStart: isSidebarOpen
          ? 'initial'
          : isScreenMax
          ? '-295px'
          : '-265px',
        flexBasis: isScreenMax ? '320px' : '280px',
      }}
      className="sidebar-zone"
    >
      {children}
    </SidebarStyled>
  );
};
