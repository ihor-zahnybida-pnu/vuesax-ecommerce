import { mediaQueries } from './../../../../utilities/media-queries';
import React from 'react';
import styled from 'styled-components';

export interface ContainerProps {
  children: React.ReactNode;
  fluid?: boolean;
}

const ContainerStyled = styled.div`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 ${(props) => props.theme.paddingInlineEnd} 0
    ${(props) => props.theme.paddingInlineStart};

  ${(props) =>
    !props.theme.fluid &&
    mediaQueries('sm')(`max-width: ${props.theme.smMaxWidth}px`)}
  ${(props) =>
    !props.theme.fluid &&
    mediaQueries('m')(`max-width: ${props.theme.mMaxWidth}px`)}
    ${(props) =>
    !props.theme.fluid &&
    mediaQueries('l')(`max-width: ${props.theme.lMaxWidth}px`)}
    ${(props) =>
    !props.theme.fluid &&
    mediaQueries('xl')(`max-width: ${props.theme.xlMaxWidth}px`)}
`;

export const Container: React.FC<ContainerProps> = (props: ContainerProps) => {
  const { children, fluid = false } = props;

  const ContainerTheme = {
    fluid,
    smMaxWidth: 652,
    mMaxWidth: 1014,
    lMaxWidth: 1250,
    xlMaxWidth: 1500,
    paddingInlineStart: '1em',
    paddingInlineEnd: '1em',
  };

  return (
    <ContainerStyled className="container" theme={ContainerTheme}>
      {children}
    </ContainerStyled>
  );
};

export default Container;
