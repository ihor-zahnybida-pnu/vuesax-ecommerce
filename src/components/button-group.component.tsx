import styled from "styled-components";

interface ButtonGroupProps {
  children: React.ReactElement[];
  gap?: string;
  fluid?: boolean;
}
const ButtonGroupStyled = styled.div`
  display: flex;
  gap: ${(props) => props.theme.gap};
  width: ${(props) => props.theme.width};
  .button {
    flex: 1;
    white-space: nowrap;
  }
  &.splitted {
    .button {
        border-radius: 0;
    }
  }
`;

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  gap,
  fluid = false,
}) => {
  return (
    <ButtonGroupStyled
      theme={{ gap: gap ?? "5px", width: fluid ? "100%" : "initial" }}
      className={gap === '0' ? 'button-group splitted' : 'button-group'}
    >
      {children}
    </ButtonGroupStyled>
  );
};

export default ButtonGroup;
