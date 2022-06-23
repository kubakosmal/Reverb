import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import PlayerLayout from '../components/playerLayout'
import 'reset-css'
import store from '../lib/store'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { AppProps } from '../types/pages'
import '@fontsource/work-sans'
import '../styles/globals.css'

const theme = extendTheme({
  fonts: {
    body: '"Work Sans", sans-serif',
  },
  colors: {
    gray: {
      100: '#F5f5f5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#272727',
      900: '#151515',
    },
    green: {
      1000: '#1DB954',
    },
    black: {
      1000: '#191414',
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          {Component.authPage ? (
            <Component {...pageProps} />
          ) : (
            <PlayerLayout>
              <Component {...pageProps} />
            </PlayerLayout>
          )}
        </Provider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
