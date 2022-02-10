// REACT
import React, { useState, useEffect, useRef } from 'react'

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

//
import { useSelector, useDispatch } from 'react-redux'

//
import { MqttConns } from '@/libs/mqttconns'




export default function Scanner(props) {

    // Get registered brokers
    let state_brokers = useSelector((state) => state.brokers)

    //
    const [mqttconns, setMqttconns] = useState(new MqttConns())

    //
    const [brokerStates, setBrokerStates] = useState([])
    const brokerStatesRef = useRef()
    brokerStatesRef.current = brokerStates

    //
    useEffect(() => {
        // console.log("init")


        let new_broker_state = {}
        for (const [broker_name, broker_object] of Object.entries(state_brokers)) {
            new_broker_state[broker_name] = {
                state: 'disconnected'
            }
        }
        setBrokerStates(new_broker_state)


        mqttconns.setBrokers(state_brokers)

        mqttconns.on_connect((connack, co) => {
            console.log(connack, co)
            let update = { ...brokerStatesRef.current }
            update[co.broker] = {
                state: "connected !"
            }
            setBrokerStates(update)
        })

        mqttconns.on_reconnect((co) => {
            // console.log('RECOOO', co)
            // let update = { ...brokerStatesRef.current }
            // update[co.broker] = {
            //     state: "connected !"
            // }
            // setBrokerStates(update)

        })

        mqttconns.on_close((co) => {
            let update = { ...brokerStatesRef.current }
            update[co.broker] = {
                state: "disconnected"
            }
            setBrokerStates(update)
        })

        mqttconns.start({ reconnectPeriod: 200 })

    }, [state_brokers])

    return (
        <Box>
            {
                Object.keys(brokerStates).map((broker_name, i) => {
                    return (<p key={i}>{broker_name} :: {brokerStates[broker_name].state}</p>)
                })
            }
        </Box>
    )
}


