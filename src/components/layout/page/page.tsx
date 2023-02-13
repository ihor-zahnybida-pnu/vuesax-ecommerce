import styled from "styled-components";

import { LayoutStyledProps } from "./../layout/layout.component";
import useInternalLayout from "./../layout/context/use-internal-layout";
import { useWindowDimensions } from "@/utilities/use-window-dimensions";
import { breakpoints } from "@/utilities/media-queries";
import { SidebarZone } from "./sidebar.zone.component";

interface PageProps {
  content: React.ReactElement;
  sidebar?: React.ReactElement;
}

const Page: React.FC<PageProps> = ({ sidebar, content }) => {
  const { width: windowsWidth } = useWindowDimensions();
  const isMobile = windowsWidth < breakpoints.m;

  return (
    <>
      {sidebar && <SidebarZone>{sidebar}</SidebarZone>}
      <ContentWrapper className="content-wrapper">
        <Scrollable theme={{ gap: isMobile ? "150px" : "200px" }}>
          {content}
        </Scrollable>
      </ContentWrapper>
    </>
  );
};

export default Page;

const ContentWrapper = styled.div`
  flex: 1;
  overflow: scroll;
  scroll-behavior: smooth;
`;

const Scrollable = styled.div.attrs<LayoutStyledProps>((props) => {
  const { footerHeight } = useInternalLayout();
  props.footerHeight = `${footerHeight}px`;
})<LayoutStyledProps>`
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.gap};

  &:after {
    content: "";
    display: block;
    height: ${(props) => props.footerHeight};
  }
`;
