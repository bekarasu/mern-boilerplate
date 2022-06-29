import { blue, orange, purple } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';
import { SET_THEME } from '../../../../../@types/client/admin/redux';
import { ITheme, IThemeOptions } from '../../../../../@types/client/admin/theme';
export function setTheme(theme: 'dark' | 'light') {
  const muiTheme: ITheme = createTheme({
    spacing: 4,
    palette: {
      type: theme,
      primary: {
        main: theme === 'dark' ? purple[500] : blue[500],
        contrastText: theme === 'dark' ? '#eeeeee' : '#000000',
      },
      secondary: {
        main: theme === 'dark' ? purple[900] : blue[900],
      },
      third: {
        main: theme === 'dark' ? orange[900] : orange[500],
        contrastText: '#eeeeee',
      },
      editor: {
        main: theme === 'dark' ? orange[900] : orange[500],
        contrastText: theme === 'dark' ? '#eeeeee' : '#000000',
      },
    },
  } as IThemeOptions);
  localStorage.setItem('admin:theme', theme);
  return {
    type: SET_THEME,
    payload: muiTheme,
  };
}
