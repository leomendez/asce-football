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
  primary: imperialRed,
  secondary: powderBlue,
  aux: charcoal,
  fontColor: honeydew,
  font: 'Helvetica',
};

export const LIGHT_THEME: DefaultTheme = {
  background: honeydew,
  primary: imperialRed,
  secondary: powderBlue,
  aux: charcoal,
  fontColor: oxfordBlue,
  font: 'Helvetica',
};
