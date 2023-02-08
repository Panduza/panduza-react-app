// REACT
import React, { useState, useEffect, useRef } from 'react'

// NEXT
import Link from 'next/link'
import { useRouter } from 'next/router'

//
import {
    Button,
    Container,
    Typography,
    Chip,
    Grid,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    Switch,
    Paper
}
    from '@mui/material';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'

// Internal Components
import Title from '@/components/page/title'

//
import { MqttConns } from '@/libs/mqttconns'

/**
 * 
 */
function DisplayCategories(props) {

    const router = useRouter()

    return (
        <Grid container spacing={2} sx={{ marginTop: '16px' }}>

            <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea onClick={() => {
                        router.push('/interfaces/io')
                    }} >
                        <CardMedia
                            component="img"
                            height="140"
                            image="/img/icon_io.png"
                            alt="io"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                I/O
                            </Typography>
                            {/* <Typography variant="body2" color="text.secondary">
                                Interfaces : 5
                            </Typography> */}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>


            <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea onClick={() => {
                        router.push('/interfaces/serial')
                    }} >
                        <CardMedia
                            component="img"
                            height="140"
                            image="/img/icon_serial.png"
                            alt="io"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Serial
                            </Typography>
                            {/* <Typography variant="body2" color="text.secondary">
                                Interfaces : 5
                            </Typography> */}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>


            <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea onClick={() => {
                        router.push('/interfaces/powersupply')
                    }} >
                        <CardMedia
                            component="img"
                            height="140"
                            image="/img/icon_psu.jpg"
                            alt="io"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Power Supply
                            </Typography>
                            {/* <Typography variant="body2" color="text.secondary">
                                Interfaces : 5
                            </Typography> */}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            

        </Grid>
    )
}

/**
 * 
 */
function DisplayArray(props) {

    // Get registered brokers
    let state_brokers = useSelector((state) => state.brokers)

    //
    const [mqttconns, setMqttconns] = useState(new MqttConns())

    //
    const [interfaces, setInterfaces] = useState([])
    const interfacesRef = useRef()
    interfacesRef.current = interfaces

    //
    useEffect(() => {
        // console.log("init")

        mqttconns.setBrokers(state_brokers)
        mqttconns.start()

        mqttconns.on_connect((connack, co) => {
            // console.log("coo", co)
            co.client.subscribe('pza/+/+/+/+/info')
            co.client.subscribe('pza/+/+/+/info')
            co.client.publish('pza','*')
        })

        mqttconns.on_message((topic, message, co) => {
            // console.log("mess from", co)

            if (topic.endsWith('/info')) {

                let base_topic = topic.slice(0, -5)
                let message_string = new TextDecoder().decode(message)
                let message_object = JSON.parse(message_string)

                var is_new = true
                interfacesRef.current.forEach((itrf) => {
                    if(itrf.base_topic === base_topic) {
                        is_new = false
                    }
                })

                // console.log("is_new", is_new, interfaces)

                if(is_new) {
                    let new_interfaces = [ ...interfacesRef.current, {
                            broker: co.broker,
                            base_topic: base_topic,
                            type: message_object.type
                        } 
                    ]
                    setInterfaces(new_interfaces)
                }
            }

        })

    }, [state_brokers])


    // console.log("reload ", interfaces)

    return (
        <Box sx={{ marginTop: '16px' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Broker</TableCell> */}
                            <TableCell>Base Topic</TableCell>
                            <TableCell>Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            interfaces.map((itrf, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                    >
                                        {/* <TableCell> {itrf.broker} </TableCell> */}
                                        <TableCell> {itrf.base_topic} </TableCell>
                                        <TableCell> {itrf.type} </TableCell>

                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    )
}

/**
 * 
 */
export default function Interfaces(props) {




    // Flag to manage the display
    const [flagCategories, setFlagCategories] = useState(false);



    // co name
    // base topic
    // type
    // version

    return (
        <Container>

            <Title title="Interfaces">

                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Array</Typography>
                    <Switch
                        checked={flagCategories}
                        onChange={(e) => {
                            setFlagCategories(e.target.checked)
                        }}
                    />
                    <Typography>Categories</Typography>
                </Stack>

            </Title>

            {flagCategories ? <DisplayCategories /> : <DisplayArray />}







        </Container>
    )

}




