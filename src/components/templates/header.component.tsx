import { breakpoints } from "@/utilities/media-queries";
import styled from "styled-components";

interface HeaderProps {
  icon: React.ReactElement;
  title: string;
}

const HeaderStyled = styled.header`
  display: flex;
  gap: 0.7em;
  padding: 0.7em 1em;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #0b75c0;
`;

const Header: React.FC<HeaderProps> = ({ icon, title }) => {
  return (
    <HeaderStyled theme={{ maxWidth: `${breakpoints.max}px` }}>
      {icon}
      <Title>{title}</Title>
    </HeaderStyled>
  );
};

export default Header;
