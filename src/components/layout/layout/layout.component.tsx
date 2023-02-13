import styled from "styled-components";

import LayoutProvider from "./context/layout-provider";
import useInternalLayout from "./context/use-internal-layout";
import { HeaderZone } from "./zones/header.zone.component";
import { FooterZone } from "./zones/footer.zone.component";
import { ContentZone } from "./zones/content.zone.component";
import { breakpoints } from "@/utilities/media-queries";

export interface LayoutStyledProps {
  headerHeight?: string;
  footerHeight?: string;
}
interface LayoutProps {
  content: React.ReactElement;
  header?: React.ReactElement;
  footer?: React.ReactElement;
  isSidebarOpen?: boolean;
}

const LayoutStyled = styled.div.attrs<LayoutStyledProps>((props) => {
  const { headerHeight, footerHeight } = useInternalLayout();
  props.headerHeight = `${headerHeight}px`;
  props.footerHeight = `${footerHeight}px`;
})<LayoutStyledProps>`
  display: flex;
  height: 100vh;

  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;

  .header-zone {
    height: ${(props) => props.headerHeight};
  }
  .footer-zone {
    height: ${(props) => props.footerHeight};
  }
  .content-zone {
    margin-block-start: ${(props) => props.headerHeight};
  }
`;
const Layout: React.FC<LayoutProps> = ({ header, content, footer, isSidebarOpen }) => {
  
  return (
    <LayoutProvider isSidebarOpen={isSidebarOpen}>
      <LayoutStyled theme={{maxWidth: `${breakpoints.max}px`}} className="layout">
        {header && <HeaderZone>{header}</HeaderZone>}
        <ContentZone>{content}</ContentZone>
        {footer && <FooterZone>{footer}</FooterZone>}
      </LayoutStyled>
    </LayoutProvider>
  );
};

export default Layout;
