import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: '#ec407a',
    },
  },
  typography: {
    fontFamily: [
      "Nunito Sans",
      "sans-serif"
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(236, 64, 122, 0.3)',
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
