import React from 'react';

//
import Link from 'next/link'

//
import {
    Button,
    Container,
    Typography,
    Chip,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
}
    from '@mui/material';


import { useSelector, useDispatch } from 'react-redux'

/**
 * 
 */
export default function Workspace(props) {

    return (
        <Container>

            <Box sx={{
                paddingTop: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid #dbdbdb'
            }}>
                <Typography variant='h1'>
                    Settings
                </Typography>
            </Box>



        </Container>
    )

}




