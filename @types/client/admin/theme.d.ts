import { Palette, PaletteColor, PaletteColorOptions, PaletteOptions } from '@material-ui/core/styles/createPalette';
import { Theme, ThemeOptions } from '@material-ui/core/styles/createTheme';

interface ITheme extends Theme {
  palette: IPalette;
}

interface IPaletteOptions extends PaletteOptions {
  third?: PaletteColorOptions;
  editor?: PaletteColorOptions;
}

interface IPalette extends Palette {
  third?: PaletteColor;
  editor?: PaletteColor;
}

interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
}
