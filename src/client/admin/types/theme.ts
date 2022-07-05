import { Palette, PaletteColor, PaletteColorOptions, PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Theme, ThemeOptions } from '@material-ui/core/styles/createTheme';

export interface ITheme extends Theme {
  palette: IPalette;
}

export interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
}

export interface IPaletteOptions extends PaletteOptions {
  third?: PaletteColorOptions;
  editor?: PaletteColorOptions;
}

interface IPalette extends Palette {
  third?: PaletteColor;
  editor?: PaletteColor;
}
