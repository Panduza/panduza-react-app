import React, { useState, useEffect } from 'react';
import Mqtt from 'mqtt';

//
import Link from 'next/link'

//
import {
    Button,
    Container,
    Typography,
    Chip,
    Box,
    TextField,
    Autocomplete,
    TextareaAutosize,
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

// Internal Components
import { TitleMenu } from '@/components/page/title'


function interfacesArrayToComboBoxData(interfaces_array) {
    let data = []
    interfaces_array.forEach((itrf, index) => {
        data.push({ label: itrf.base_topic, index: index, itrf: itrf })
    })
    return data
}

/**
 * 
 */
export default function Connections(props) {


    // const [interfaceIndex, setInterfaceIndex] = useState(null)
    // const [text, setText] = useState("")
    // const [mqttClient, setMqttClient] = useState(null)


    // let pza_interfaces = useSelector((state) => state.pza.interfaces)

    // console.log("pza_interfaces", pza_interfaces)

    // let combobox_data = interfacesArrayToComboBoxData(pza_interfaces);


    // // Request to fetch connections
    // useEffect(() => {

    //     if (mqttClient) {
    //         mqttClient.end()
    //     }

    //     if (interfaceIndex !== null) {

    //         let itrf = pza_interfaces[interfaceIndex]
    //         // Generate the connection url
    //         const conn_url = "ws://" + itrf.co.url + ":" + itrf.co.port
    //         console.log(conn_url)

    //         // Start connection
    //         let mqtt_client = Mqtt.connect(conn_url, {
    //             reconnectPeriod: 10000
    //         })

    //         // -----
    //         // Action on connection
    //         mqtt_client.on('connect', () => {
    //             // Subscribe to all interface infos topics (to scan the broker)
    //             mqtt_client.subscribe(itrf.base_topic + '/atts/data')
    //         })


    //         // -----
    //         // Manage message reception
    //         mqtt_client.on('message', (topic, message) => {
    //             var string = new TextDecoder().decode(message)
    //             // console.log("!!!!!! MSG:", topic, message, string)
    //             setText(current_text => {
    //                 let new_text = current_text + message
    //                 return new_text
    //             })
    //         })

    //         setMqttClient(mqtt_client)
    //     }
    //     else {
    //         setMqttClient(null)
    //     }

    // }, [interfaceIndex])




    return (
        <Container>


            <TitleMenu levels={[
                { "level": "Interfaces", "url": "/interfaces" },
                { "level": "Serial", "url": "/interfaces/serial" }
            ]} />


            <Box >

                {/* <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={combobox_data}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Interface" />}
                    onChange={(e, v) => {
                        if (v) { setInterfaceIndex(v.index) }
                        else { setInterfaceIndex(null) }
                    }}
                    isOptionEqualToValue={(option, value) => {
                        // console.log("!!!!!!!!!!!!", option, value)
                        return (option.index === value.index)
                    }}
                />

                <Box> {interfaceIndex} </Box>

                <Box> {text} </Box>
 */}

            </Box>


        </Container>
    )

}




