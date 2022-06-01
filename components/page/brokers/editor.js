// REACT
import React, { useState, useEffect } from 'react'

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

// External libraries
import _ from 'underscore';

// REDUX
import { useSelector, useDispatch } from 'react-redux'

// Internal redux
import { createNewBroker, updateBroker, renameBroker, deleteBroker } from '@/redux/brokers/actions'

// Internal middleware
import { brokersDataToComboBoxData, generateNewAvailableName } from '@/libs/brokers'

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Form to edit the connection
 * @param {*} props
 */
function _ConnectionForm(props) {

    // Data modified by the user
    const [data, setData] = useState({})
    const [initial, setInitial] = useState({})
    const [modified, setModified] = useState(false)

    // Initialize data with initial connection data
    useEffect(() => {
        let initial = { name: props.brokerName, ...props.state_brokers[props.brokerName] }
        setData(initial)
        setInitial(initial)
    }, [props.brokerName]);

    // console.log(">>>>>", data)

    // Check for data modification
    if (_.isEmpty(data)) {
        if (modified != false) { setModified(false) }
    }
    else {
        let flag = false
        if (initial.name != data.name) { flag = true }
        if (initial.url != data.url) { flag = true }
        if (initial.port != data.port) { flag = true }
        if (modified != flag) { setModified(flag) }
    }

    //
    return (<Box sx={{
        paddingTop: '16px',
        paddingBottom: '16px',
        borderBottom: '1px solid #dbdbdb',
        display: 'flex',
        flexDirection: 'column'
    }}>

        <Grid container spacing={2}>

            {/* ========== NAME ========== */}
            <Grid item xs={8}>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={data.name ? data.name : ""}
                    onChange={(e) => {
                        setData({
                            ...data,
                            name: e.target.value
                        })
                    }}
                />
            </Grid>

            {/* ========== PROTOCOL ========== */}
            <Grid item xs={4}>
                <TextField
                    disabled
                    fullWidth
                    variant="outlined"
                    label="Protocol"
                    defaultValue="websocket (ws://)"
                />
            </Grid>


            <Grid item xs={8}> </Grid>

            {/* ========== HOST ========== */}
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Host"
                    variant="outlined"
                    value={data.url ? data.url : ""}
                    onChange={(e) => {
                        setData({
                            ...data,
                            url: e.target.value
                        })
                    }}
                />
            </Grid>

            {/* ========== PORT ========== */}
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Port"
                    variant="outlined"
                    value={data.port ? data.port : ""}
                    onChange={(e) => {
                        setData({
                            ...data,
                            port: e.target.value
                        })
                    }}
                />
            </Grid>

            {/* ========== USERNAME BUTTON ========== */}
            <Grid item xs={6}>
                <TextField fullWidth label="Username" variant="outlined" />
            </Grid>

            {/* ========== PASSWORD BUTTON ========== */}
            <Grid item xs={6}>
                <TextField fullWidth label="Password" variant="outlined" />
            </Grid>

            {/* ========== SAVE BUTTON ========== */}
            <Grid item xs={6}>
                <Button
                    disabled={!modified}
                    variant="contained"
                    color="success"
                    onClick={() => {
                        props.onBrokerSaveModifcation(initial, data)
                    }}
                >
                    Save Changes
                </Button>
                <Button
                    disabled={!modified}
                    variant="outlined" sx={{ marginLeft: '16px' }}>
                    Cancel
                </Button>
            </Grid>

            {/* ========== DELETE BUTTON ========== */}
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }} >
                <Button
                    variant="outlined"
                    color="error"
                    onClick={props.onBrokerDelete}
                >
                    Delete
                </Button>
            </Grid>


        </Grid>

    </Box>)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Form to edit the connection
 * @param {*} props
 */
function _NoBrokerSelected(props) {
    return (<Box sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '16px'
    }} >
        <Typography>
            Create or Select a connection
        </Typography>
    </Box>)
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 
 */
function _FormBody(props) {
    if (props.brokerName) {
        return (
            <_ConnectionForm
                state_brokers={props.state_brokers}
                brokerName={props.brokerName}
                onBrokerSaveModifcation={props.onBrokerSaveModifcation}
                onBrokerDelete={props.onBrokerDelete}
            />
        )
    }
    else {
        return (
            <_NoBrokerSelected />
        )
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {*} props.onBrokerCreation
 * 
 */
function _ControlBar(props) {
    //
    const biggerThan600 = useMediaQuery('(min-width:600px)')
    // Render
    return (
        <Box sx={{
            paddingTop: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid #dbdbdb',
            display: 'flex',
            flexDirection: (biggerThan600) ? 'row' : 'column'
        }}>
            <Box>
                <Autocomplete
                    value={{ label: props.currentBroker ? props.currentBroker : "" }}
                    disablePortal
                    options={brokersDataToComboBoxData(props.state_brokers)}
                    sx={{
                        width: (biggerThan600) ? '400px' : 'auto',
                        marginBottom: (biggerThan600) ? '0px' : '16px'
                    }}
                    renderInput={(params) => <TextField {...params} label="Select a connection to edit" />}
                    onChange={(e, v) => {
                        // console.log(v)
                        props.onSelectionChange(v ? v.label : null)
                    }}
                    isOptionEqualToValue={(option, value) => { return (option.label === value.label) }}
                />
            </Box>

            {(biggerThan600) ? <Box sx={{ flexGrow: 1 }}> </Box> : <Box />}

            <Button
                variant="contained"
                onClick={props.onBrokerCreation}
            >
                New Connection
            </Button>

        </Box>
    )
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {*} props.stateBrokers
 * @param {*} props.brokerName
 * @param {*} props.setBrokerName
 */
export default function Editor(props) {

    //
    const dispatch = useDispatch()

    return (
        <Box>
            <_ControlBar
                state_brokers={props.stateBrokers}
                currentBroker={props.brokerName}
                onBrokerCreation={() => {
                    let new_name = generateNewAvailableName(props.stateBrokers)
                    dispatch(createNewBroker(new_name))
                    props.setSnack({ open: true, text: "New Connection Created !" })
                    props.setBrokerName(new_name)
                }}
                onSelectionChange={(selected_name) => { props.setBrokerName(selected_name) }}

            />

            <_FormBody
                state_brokers={props.stateBrokers}
                brokerName={props.brokerName}
                onBrokerSaveModifcation={(initial_data, modified_data) => {
                    // console.log("modification", initial_data, modified_data)

                    let new_broker_name = modified_data["name"]
                    if (initial_data["name"] !== new_broker_name) {
                        dispatch(renameBroker(initial_data["name"], new_broker_name))
                        props.setBrokerName(new_broker_name)
                    }

                    let data_to_update = { ...modified_data }
                    delete data_to_update.name
                    // console.log("=>>", data_to_update)
                    dispatch(updateBroker(new_broker_name, data_to_update))

                    // props.setBrokerName(brokerName)
                }}
                onBrokerDelete={() => {

                    // console.log("delete current", brokerName)

                    dispatch(deleteBroker(props.brokerName))
                    props.setBrokerName(null)
                }}

            />
        </Box>
    )

}

