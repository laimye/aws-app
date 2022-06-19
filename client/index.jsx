import '@fontsource/noto-sans'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './app'
import theme from './theme'

const $container = document.querySelector('#root')
const root = ReactDOM.createRoot($container)

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
)
