import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components'

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Style>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </Style>
}

const Style = styled.div`
  font-family: Helvetica;
`
