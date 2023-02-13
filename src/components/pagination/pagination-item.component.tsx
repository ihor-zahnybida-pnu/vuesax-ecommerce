import React from 'react';
import styled from 'styled-components';

export interface PaginationItemProps {
  value: number | React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const PaginationItemStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  padding: 0;
  cursor: ${(props) => props.theme.cursor};
  width: ${(props) => props.theme.width};
  height: ${(props) => props.theme.height};
  border-radius: ${(props) => props.theme.borderRadius};
  margin: ${(props) => props.theme.margin};
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.color};
  
  &:hover {
    background-color: ${(props) => props.theme.bgHoverColor};
  }

  .typography {
    color: ${(props) => props.theme.color};
  }
  svg {
    fill: ${(props) => props.theme.color};
  }
`;

export const PaginationItem: React.FC<PaginationItemProps> = (
  props: PaginationItemProps
) => {
  const {
    value,
    selected = false,
    onClick,
  } = props;

  const PaginationItemTheme = {
    height: '40px',
    width: '40px',
    borderRadius: '20px',
    margin: '0 15px',
    bgColor: selected ? '#0b75c0' : 'transparent',
    color: selected ? 'white' : 'black',
    cursor: 'pointer',
  };

  return (
    <PaginationItemStyled
      className="pagination-item"
      theme={PaginationItemTheme}
      onClick={onClick}
    >
       {value}
    </PaginationItemStyled>
  );
};

export default PaginationItem;
