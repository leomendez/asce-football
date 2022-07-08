import { DefaultTheme } from 'styled-components';

export const underline = (theme: DefaultTheme, bottom?: string) => `
  cursor: pointer;
  display: inline-block;
  position: relative;
  text-decoration: none;
  color: ${theme.fontColor};
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 3px;
    bottom: ${bottom || '-4px'};
    left: 0;
    background-color: ${theme.secondary};
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;