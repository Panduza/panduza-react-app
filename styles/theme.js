import { createTheme } from '@mui/material/styles'

const appTheme = createTheme({
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
    }
})

appTheme.typography.h1 = {
    fontSize: '1.75em',
    fontWeight: 600
}

export default appTheme;

