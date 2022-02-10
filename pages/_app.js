// React
import React from 'react'

// Next
import App from 'next/app'

// Mui
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles'

// Redux
import { Provider } from 'react-redux'
import store from '@/redux/store'

// Components
import MainLayout from '@/components/layouts/main'

// Styles
// Import global css rules for all pages
import '@/styles/globals.css'
import theme from '@/styles/theme'

/**
 * Local style
 */
const styles = (theme) => ({
    root: {
        flexGrow: 1
    }
})

/**
 * Main top class for all the pages of the app
 */
class PanduzApp extends App {

    /**
     * Constructor 
     */
    constructor(props) {
        super(props)
    }

    /**
     * Render
     */
    render() {
        // Get props
        const { Component, pageProps } = this.props

        //
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Box>
                        <MainLayout />
                        <Component {...pageProps} />
                    </Box>
                </ThemeProvider>
            </Provider>
        );

    }
}
export default withStyles(styles)(PanduzApp);
