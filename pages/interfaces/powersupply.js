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


/**
 * Card to manage a power supply interface
 * 
 * 
 * @param {string} props.department - The employee's department.
 * 
 */
function CardPowerSupply(props) {

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                
                <Typography variant="h5" component="div">
                    benevolent
                </Typography>
                
            </CardContent>
            <CardActions>
                <Slider
                    aria-label="Volts"
                    defaultValue={0}
                    // value={itrf.volts}
                    // getAriaValueText={(val) => { return `${val}V`; }}
                    // step={0.1}
                    // min={0}
                    // max={50}
                    // valueLabelDisplay="auto"
                    // marks={volts_marks}
                    // onChange={
                    //     (event, newValue) => {

                    //         console.log("change !!", itrf.volts)

                    //         let new_interfaces = { ...interfacesRef.current }
                    //         new_interfaces[itrf.base_topic].volts = newValue
                    //         setInterfaces(new_interfaces)

                    //         itrf.co.client.publish(
                    //             itrf.base_topic + "/cmds/volts/set",
                    //             JSON.stringify({ volts: itrf.volts })
                    //         )
                    //     }
                    // }
                />

                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

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

                if (message_object.type === "power_supply") {

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



    const volts_marks = [
        {
            value: 0,
            label: '0V',
        },
        {
            value: 50,
            label: '50V',
        },
    ];

    const amps_marks = [
        {
            value: 0,
            label: '0A',
        },
        {
            value: 50,
            label: '50A',
        },
    ];



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

                        return (<CardPowerSupply />)
                    })
                }

            </Box>

            {/* <Box sx={{ marginTop: '16px' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Broker</TableCell>
                                <TableCell>Base Topic</TableCell>
                                <TableCell>Volts</TableCell>
                                <TableCell>Amps</TableCell>
                                <TableCell>Enable</TableCell>
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
                                            <TableCell> {itrf.co.broker} </TableCell>
                                            <TableCell> {itrf.base_topic} </TableCell>
                                            <TableCell>

                                                <Slider
                                                    aria-label="Volts"
                                                    defaultValue={0}
                                                    value={itrf.volts}
                                                    getAriaValueText={(val) => { return `${val}V`; }}
                                                    step={0.1}
                                                    min={0}
                                                    max={50}
                                                    valueLabelDisplay="auto"
                                                    marks={volts_marks}
                                                    onChange={
                                                        (event, newValue) => {

                                                            console.log("change !!", itrf.volts)

                                                            let new_interfaces = { ...interfacesRef.current }
                                                            new_interfaces[itrf.base_topic].volts = newValue
                                                            setInterfaces(new_interfaces)

                                                            itrf.co.client.publish(
                                                                itrf.base_topic + "/cmds/volts/set",
                                                                JSON.stringify({ volts: itrf.volts })
                                                            )
                                                        }
                                                    }
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <Slider
                                                    aria-label="Amps"
                                                    defaultValue={0}
                                                    value={itrf.amps}
                                                    getAriaValueText={(val) => { return `${val}A`; }}
                                                    step={0.1}
                                                    min={0}
                                                    max={50}
                                                    valueLabelDisplay="auto"
                                                    marks={amps_marks}
                                                    onChange={
                                                        (event, newValue) => {

                                                            console.log("change !!", itrf.amps)

                                                            let new_interfaces = { ...interfacesRef.current }
                                                            new_interfaces[itrf.base_topic].amps = newValue
                                                            setInterfaces(new_interfaces)

                                                            itrf.co.client.publish(
                                                                itrf.base_topic + "/cmds/amps/set",
                                                                JSON.stringify({ amps: itrf.amps })
                                                            )
                                                        }
                                                    }
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <Button
                                                    onClick={() => {
                                                        // console.log("click change !!", itrf.value)
                                                        let toggle_enable = false
                                                        if(itrf.enable === false) {
                                                            toggle_enable = true
                                                        }
                                                        itrf.co.client.publish(
                                                            itrf.base_topic + "/cmds/enable/set",
                                                            JSON.stringify({ enable: toggle_enable })
                                                        )
                                                    }}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                        padding: 1
                                                    }}
                                                >
                                                    { itrf.enable ? 'ON' : 'OFF' }
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
            </Box> */}

        </Container>
    )

}




