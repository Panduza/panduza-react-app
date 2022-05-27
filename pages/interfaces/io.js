// REACT
import React, { useState, useEffect, useRef } from 'react'

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

// Internal Components
import { TitleMenu } from '@/components/page/title'

//
import { MqttConns } from '@/libs/mqttconns'

/**
 * 
 */
export default function Connections(props) {


    // Get registered brokers
    let state_brokers = useSelector((state) => state.brokers)

    //
    const [mqttconns, setMqttconns] = useState(new MqttConns())

    //
    const [interfaces, setInterfaces] = useState({})
    const interfacesRef = useRef()
    interfacesRef.current = interfaces;

    //
    useEffect(() => {
        // console.log("init")

        mqttconns.setBrokers(state_brokers)
        mqttconns.start()

        mqttconns.on_connect((connack, co) => {
            // console.log("coo", co)
            co.client.subscribe('pza/+/+/+/info')
        })

        mqttconns.on_message((topic, message, co) => {
            // console.log("mess from", co)

            if (topic.endsWith('/info')) {

                let base_topic = topic.slice(0, -5)
                let message_string = new TextDecoder().decode(message)
                let message_object = JSON.parse(message_string)

                if (message_object.type === "io") {

                    var is_new = true
                    if (base_topic in interfacesRef.current) {
                        is_new = false
                    }

                    if (is_new) {

                        co.client.subscribe(base_topic + '/atts/direction')
                        co.client.subscribe(base_topic + '/atts/value')

                        let new_interfaces = { ...interfacesRef.current }
                        new_interfaces[base_topic] = {
                            co: co,
                            base_topic: base_topic,
                            direction: "in",
                            value: 0
                        }

                        setInterfaces(new_interfaces)
                    }
                }
            }
            else if (topic.endsWith('/atts/direction')) {

                let base_topic = topic.slice(0, -15)
                const obj = JSON.parse(message);

                // console.log(base_topic, topic, message, co)
                // console.log("====", interfacesRef.current)

                if (base_topic in interfacesRef.current) {
                    let new_interfaces = { ...interfacesRef.current }
                    new_interfaces[base_topic].direction = obj.direction

                    setInterfaces(new_interfaces)
                }

            }
            else if (topic.endsWith('/atts/value')) {
                // console.log(topic, message, co)

                let base_topic = topic.slice(0, -11)
                const obj = JSON.parse(message);

                // console.log(base_topic, topic, message, co)
                // console.log("====", interfacesRef.current)

                if (base_topic in interfacesRef.current) {
                    let new_interfaces = { ...interfacesRef.current }
                    new_interfaces[base_topic].value = parseInt(obj.value)

                    setInterfaces(new_interfaces)
                }

            }
        })

    }, [state_brokers])




    return (
        <Container>

            <TitleMenu levels={[
                { "level": "Interfaces", "url": "/interfaces" },
                { "level": "Io", "url": "/interfaces/io" }
            ]} />

            <Box sx={{ marginTop: '16px' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell>Broker</TableCell> */}
                                <TableCell>Base Topic</TableCell>
                                <TableCell>Direction</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Object.keys(interfaces).map((base_topic, i) => {

                                    let itrf = interfaces[base_topic]

                                    return (
                                        <TableRow
                                            key={i}
                                        >
                                            {/* <TableCell> {itrf.co.broker} </TableCell> */}
                                            <TableCell> {itrf.base_topic} </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => {
                                                        // console.log("click change !!", itrf.value)
                                                        let toggle_dir = "in"
                                                        if(itrf.direction === "in") {
                                                            toggle_dir = "out"
                                                        }
                                                        itrf.co.client.publish(
                                                            itrf.base_topic + "/cmds/direction/set",
                                                            JSON.stringify({ direction: toggle_dir })
                                                        )
                                                    }}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                        padding: 1
                                                    }}
                                                >
                                                    {itrf.direction}
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                
                                                <Button
                                                    onClick={() => {
                                                        console.log("click change !!", itrf.value)
                                                        itrf.co.client.publish(
                                                            itrf.base_topic + "/cmds/value/set",
                                                            JSON.stringify({ value: (itrf.value ? 0 : 1).toString() })
                                                        )
                                                    }}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                        padding: 1
                                                    }}
                                                >{itrf.value}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }

                                )
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </Container>
    )

}




