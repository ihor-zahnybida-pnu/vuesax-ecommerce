import styled from "styled-components";

type ButtonType = "iconLeft" | "iconRight" | "textOnly" | "iconOnly";

interface ButtonProps {
  icon?: React.ReactElement;
  title?: string;
  type: ButtonType;
  color?: string;
  background?: string;
  onClick?: () => void;
  className?: string;
}

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => props.theme.flexDirection};
  gap: 5px;
  color: ${(props) => props.theme.color};
  background: ${(props) => props.theme.background};
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    cursor: ${(props) => props.theme.cursor};
    opacity: ${(props) => props.theme.opacity};
  }
`;

const Button: React.FC<ButtonProps> = ({
  icon,
  title,
  type,
  color = "white",
  background = "#0b75c0",
  onClick,
  className,
}) => {
  return (
    <ButtonStyled
      theme={{
        background,
        color,
        flexDirection: type === "iconRight" ? "row-reverse" : "row",
        opacity: onClick ? 0.8 : 1,
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
      className={["button", className].join(" ")}
    >
      {icon}
      {title}
    </ButtonStyled>
  );
};

export default Button;
