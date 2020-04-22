import React from 'react';
import Routes from './routes';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';
import BaseTheme from '~/utils/theme';

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  //Config statusBar
  StatusBar.setBackgroundColor(BaseTheme.colors.primary);
  StatusBar.setBarStyle('light-content');

  return (
    <ThemeProvider theme={BaseTheme}>
      <Routes />
    </ThemeProvider>
  );
};
export default App;
