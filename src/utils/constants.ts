import { DefaultTheme } from 'styled-components';
import {
  charcoal,
  honeydew,
  imperialRed,
  oxfordBlue,
  powderBlue,
} from './colors';

export const DARK_THEME: DefaultTheme = {
  background: oxfordBlue,
  primary: charcoal,
  secondary: imperialRed,
  aux: powderBlue,
  fontColor: honeydew,
  font: 'Helvetica',
  name: 'dark'
};

export const LIGHT_THEME: DefaultTheme = {
  background: honeydew,
  primary: powderBlue,
  secondary: imperialRed,
  aux: charcoal,
  fontColor: oxfordBlue,
  font: 'Helvetica',
  name: 'light'
};
