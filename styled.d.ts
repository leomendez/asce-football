import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    primary: string;
    secondary: string;
    font: string;
    fontColor: string;
    aux: string;
    name: string;
  };
}