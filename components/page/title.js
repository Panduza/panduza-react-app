// REACT
import React from 'react';

// NEXT
import NextLink from 'next/link'

// MUI
import {
    Box,
    Typography,
    Link as MUILink
} from '@mui/material';

/**
 * Component for the page title
 */
export default function Title(props) {
    return (
        <Box sx={{
            paddingTop: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid #dbdbdb',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyItems: 'center'
        }}>
            <Typography variant='h1'>
                {props.title}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            {props.children}

        </Box>
    )
}

/**
 * Component for the page title also used as a menu
 * @param props.levels [ { level: "name of the level", url: "url/for/the/router" } ]
 */
export function TitleMenu(props) {
    return (
        <Box sx={{
            paddingTop: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid #dbdbdb',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyItems: 'center'
        }}>
            {
                props.levels.map(function (item, i) {
                    return (
                        <Box key={i} sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyItems: 'center'
                        }}>
                            <NextLink href={item.url} passHref>
                                <MUILink
                                    variant="body2"
                                    underline="hover"
                                    sx={{
                                        color: 'black',
                                        fontSize: '1.75em',
                                        fontWeight: 600
                                    }}
                                >
                                    {item.level}
                                </MUILink>
                            </NextLink>
                            <Typography variant='h1' sx={{ paddingLeft: '4px', paddingRight: '4px' }}>
                                {i == props.levels.length - 1 ? "" : " >"}
                            </Typography>
                        </Box>
                    )
                })
            }

            <Box sx={{ flexGrow: 1 }} />

            {props.children}

        </Box>
    )
}



