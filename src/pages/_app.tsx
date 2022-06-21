import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Navbar } from '../components/';
import { useDarkMode } from '../hooks/useTheme';
import { DARK_THEME, LIGHT_THEME } from '../utils/constants';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const theme = darkMode ? DARK_THEME : LIGHT_THEME;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <title>Asce Football</title>
        <meta name="description" content="Football stats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} theme={theme} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.fontColor};
    font-size: 16px;
    transition: background-color 1s;
    transition: color 1s;
  }
  * {
    box-sizing: border-box;
  }
`;
