// REACT
import React, { useState, useEffect } from 'react';

// NEXT
import Link from 'next/link'
import Image from 'next/image'

// MUI
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Drawer,
    Box,
    useMediaQuery
} from '@mui/material';

// REDUX
import { useSelector, useDispatch } from 'react-redux'
import { restoreBrokers } from '@/redux/brokers/actions'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @param {boolean} props.bigScreen : true if the screen is bigger than the limit size to define a big screen
 */
function _TopBarRightPart(props) {
    if (props.bigScreen) {
        return (
            <Box>
                {/* Link to user connections */}
                <Link href="/brokers">
                    <Button
                        sx={{
                            color: '#424242'
                        }}
                        onClick={(e) => { }}>
                        Brokers
                        </Button>
                </Link>

                {/* Link to user workspace */}
                <Link href="/interfaces" >
                    <Button
                        sx={{
                            color: '#424242'
                        }}
                        onClick={(e) => { }}>
                        Interfaces
                        </Button>
                </Link>

                {/* Link to user workspace */}
                {/* <Link href="/workspace" >
                        <Button
                            sx={{
                                color: '#424242'
                            }}
                            onClick={(e) => { }}>
                            Workspaces
                        </Button>
                    </Link> */}

                {/* Link to user interfaces */}
                <Link href="/" >
                    <Button
                        sx={{
                            color: '#424242'
                        }}
                        onClick={(e) => { }}>
                        Sources
                        </Button>
                </Link>

                {/* Link to user interfaces */}
                <Link href="/" >
                    <Button
                        sx={{
                            color: '#424242'
                        }}
                        onClick={(e) => { }}>
                        Documentation
                        </Button>
                </Link>
            </Box>
        )
    }
    else {
        return (<Box />)
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Display the site main title
 * @param {boolean} props.bigScreen : true if the screen is bigger than the limit size to define a big screen
 */
function _TopBarMainTitle(props) {
    if (props.bigScreen) {
        return (
            <Typography variant="h6"
                sx={{
                    color: '#424242',
                    paddingLeft: '8px'
                }}
            >
                Panduza
            </Typography>
        )
    }
    else {
        return (<Box />)
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {boolean} props.bigScreen : true if the screen is bigger than the limit size to define a big screen
 */
function _TopBarHomeBox(props) {
    let boxSx = {}
    if (props.bigScreen) {
        boxSx = { padding: '4px' }
    }
    return (
        <Link href="/">
            <Box sx={boxSx}>
                <Button component="div">
                    <Image src={"/img/panduza_logo.png"}
                        width={40}
                        height={40}
                    />
                    <_TopBarMainTitle
                        bigScreen={props.bigScreen}
                    />
                </Button>
            </Box>
        </Link>
    )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Main layout of pages
export default function MainLayout(props) {

    // Hook redux
    const dispatch = useDispatch()

    // Hook size
    const bigScreen = useMediaQuery('(min-width:600px)')

    // Request to fetch connections
    useEffect(() => {
        dispatch(restoreBrokers())
    }, [])

    // Render
    return (

        <AppBar
            position="static"
            sx={{
                backgroundColor: "#FFFFFF"
            }}
        >

            <Toolbar sx={{ padding: 0 }} >

                <_TopBarHomeBox
                    bigScreen={bigScreen}
                />

                {/* Separator to push icons on the left */}
                <Box sx={{ flexGrow: 1 }} />

                <_TopBarRightPart
                    bigScreen={bigScreen}
                />

            </Toolbar>

        </AppBar>

    )
}
