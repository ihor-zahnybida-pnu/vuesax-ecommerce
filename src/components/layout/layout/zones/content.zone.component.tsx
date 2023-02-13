import styled from "styled-components";

const ContentStyled = styled.div`
  min-height: 200px;
  display: flex;
  width: 100%;
`;
interface ContentZoneProps {
  children: React.ReactNode;
}

export const ContentZone: React.FC<ContentZoneProps> = ({ children }) => {
  return <ContentStyled className="content-zone">{children}</ContentStyled>;
};
