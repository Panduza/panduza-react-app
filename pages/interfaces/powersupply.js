// REACT
import React, { useState, useEffect, useRef } from 'react'

//
import Link from 'next/link'

//
import {
    Button,
    Slider,
    Container,
    Typography,
    Chip,
    Box,
    Card,
    CardContent,
    CardActions,
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

import CardPowerSupply from '@/components/cards/interfaces/power_supply'


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

                if (message_object.type === "psu") {

                    var is_new = true
                    if (base_topic in interfacesRef.current) {
                        is_new = false
                    }

                    if (is_new) {

                        co.client.subscribe(base_topic + '/atts/amps')
                        co.client.subscribe(base_topic + '/atts/volts')
                        co.client.subscribe(base_topic + '/atts/enable')

                        let new_interfaces = { ...interfacesRef.current }
                        new_interfaces[base_topic] = {
                            co: co,
                            base_topic: base_topic,
                            amps: 0,
                            volts: 0,
                            enable: false
                        }

                        setInterfaces(new_interfaces)
                    }
                }
            }
            else if (topic.endsWith('/atts/enable')) {

                let base_topic = topic.slice(0, -12)
                const obj = JSON.parse(message);

                // console.log(base_topic, topic, message, co)
                // console.log("====", interfacesRef.current)

                if (base_topic in interfacesRef.current) {
                    let new_interfaces = { ...interfacesRef.current }
                    new_interfaces[base_topic].enable = obj.enable

                    setInterfaces(new_interfaces)
                }

            }
            // else if (topic.endsWith('/atts/value')) {
            //     // console.log(topic, message, co)

            //     let base_topic = topic.slice(0, -11)
            //     const obj = JSON.parse(message);

            //     // console.log(base_topic, topic, message, co)
            //     // console.log("====", interfacesRef.current)

            //     if (base_topic in interfacesRef.current) {
            //         let new_interfaces = { ...interfacesRef.current }
            //         new_interfaces[base_topic].value = parseInt(obj.value)

            //         setInterfaces(new_interfaces)
            //     }

            // }
        })

    }, [state_brokers])






    return (
        <Container>

            <TitleMenu levels={[
                { "level": "Interfaces", "url": "/interfaces" },
                { "level": "Power Supply", "url": "/interfaces/powersupply" }
            ]} />


            <Box sx={{ marginTop: '16px' }}>

                {
                    Object.keys(interfaces).map((base_topic, i) => {

                        let itrf = interfaces[base_topic]

                        // return (<div />)
                        return (<CardPowerSupply interface={itrf} />)
                    })
                }

            </Box>



        </Container>
    )

}




