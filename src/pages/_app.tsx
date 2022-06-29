import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import 'react-loading-skeleton/dist/skeleton.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Navbar } from '../components/';
import { useDarkMode } from '../hooks/useTheme';
import { DARK_THEME, LIGHT_THEME } from '../utils/constants';

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
      <SkeletonTheme baseColor="#294C60" highlightColor="#A8DADC" height="2em">
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
      </SkeletonTheme>
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
    /* width */
    ::-webkit-scrollbar {
      width: 5px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.primary};
      border-radius: 5px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.aux + '80'};
      border-radius: 10px;
    } 

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.aux};
    }
  }
  * {
    box-sizing: border-box;
  }
`;
