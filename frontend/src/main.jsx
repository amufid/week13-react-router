import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import theme from './theme.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
