import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import App from './App.jsx'
import './index.css'

const colors = {
    brand: {
        900: '#8e1817',
        800: '#b21d1c',
        700: '#df0606',
        600: '#e12d2d',
        500: '#e63946',
        400: '#f56565',
        300: '#f56565',
        200: '#f56565',
        100: '#f56565',
        50: '#f56565',
    },
}
const theme = extendTheme({colors})
const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App/>
        </ChakraProvider>
    </React.StrictMode>,
)
