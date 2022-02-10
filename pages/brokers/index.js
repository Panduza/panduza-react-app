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

// Icons
// import {
//     Done,
//     MailIcon,
//     Dashboard
// } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';

import { useSelector, useDispatch } from 'react-redux'


// Internal Components
import Title from '@/components/page/title'
import Editor from '@/components/page/brokers/editor'
import Scanner from '@/components/page/brokers/scanner'

// Internal middleware
import { brokersDataToComboBoxData, generateNewAvailableName } from '@/libs/brokers'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param {
 *      open: boolean, 
 *      text: string    
 *  } props.snackOpts
 * 
 * @param {function} props.onClose : called when snack bar close
 */
function _SnackBar(props) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={props.snackOpts.open}
            autoHideDuration={6000}
            onClose={props.onClose}
        >
            <Alert onClose={props.onClose} severity="success" sx={{ width: '100%' }}>
                {props.snackOpts.text}
            </Alert>
        </Snackbar>
    )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function _PageTile(props) {
    return (
        <Title title="Brokers">
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Scanner</Typography>
                <Switch
                    checked={props.flag}
                    onChange={(e) => {
                        props.setFlag(e.target.checked)
                    }}
                />
                <Typography>Editor</Typography>
            </Stack>
        </Title>
    )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function _Body(props) {
    if (props.mustDisplayEditor) {
        return (
            <Editor

                stateBrokers={props.stateBrokers}
                brokerName={props.brokerName}
                setBrokerName={props.setBrokerName}

                setSnack={props.setSnack}
            />
        )
    }
    else {
        return (
            <Scanner

            />
        )
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Page entry point
 * @param {*} props
 */
export default function PAGE(props) {

    // Get registered brokers
    let state_brokers = useSelector((state) => state.brokers)

    // State to store the index of the connection edited
    const [brokerName, setBrokerName] = useState(null)

    // Snack context
    const [snack, setSnack] = useState({ open: false, text: "" })
    let handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setSnack({ ...snack, open: false })
    }

    // Load a first broker
    useEffect(() => {
        if (!brokerName && Object.keys(state_brokers).length) {
            setBrokerName(Object.keys(state_brokers)[0])
        }
    }, [brokerName, state_brokers]);

    // Debug
    // console.log("brokerName:", brokerName)

    // If true display the scanner, else the form
    const [flagEditor, setFlagEditor] = useState(true)

    // Render
    return (
        <Container>

            <_SnackBar
                snackOpts={snack}
                onClose={handleSnackClose}
            />

            <_PageTile
                flag={flagEditor}
                setFlag={setFlagEditor}
            />

            <_Body
                mustDisplayEditor={flagEditor}

                stateBrokers={state_brokers}
                brokerName={brokerName}
                setBrokerName={setBrokerName}

                setSnack={setSnack}
            />

        </Container>
    )

}

