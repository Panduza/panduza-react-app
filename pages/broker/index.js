// REACT
import React, { useState, useEffect } from 'react'

//
import Link from 'next/link'

//
import {
    Button,
    Container,
    Typography,
    Chip,
    Grid,
    TextField,
    Box,
    Switch,
    Autocomplete,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Snackbar,
    Alert,
    Badge,
    Stack,
    styles,
    useMediaQuery
}
    from '@mui/material';

import { useTheme } from '@mui/material/styles';


import { useSelector, useDispatch } from 'react-redux'



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Page entry point
 * @param {*} props
 */
export default function PAGE(props) {

    // // Get registered brokers
    // let state_brokers = useSelector((state) => state.brokers)

    // // State to store the index of the connection edited
    // const [brokerName, setBrokerName] = useState(null)

    // // Snack context
    // const [snack, setSnack] = useState({ open: false, text: "" })
    // let handleSnackClose = (event, reason) => {
    //     if (reason === 'clickaway') { return; }
    //     setSnack({ ...snack, open: false })
    // }

    // // Load a first broker
    // useEffect(() => {
    //     if (!brokerName && Object.keys(state_brokers).length) {
    //         setBrokerName(Object.keys(state_brokers)[0])
    //     }
    // }, [brokerName, state_brokers]);

    // // Debug
    // // console.log("brokerName:", brokerName)

    // // If true display the scanner, else the form
    // const [flagEditor, setFlagEditor] = useState(true)

    // Render
    return (
        <Container>

            {/* <_SnackBar
                snackOpts={snack}
                onClose={handleSnackClose}
            />

            <_PageTile
                flag={flagEditor}
                setFlag={setFlagEditor}
            /> */}


        </Container>
    )

}

