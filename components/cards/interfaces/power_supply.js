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



function SliderVolts(props) {

    return (<Slider
        aria-label="Volts"
        defaultValue={0}
        // value={itrf.volts}
        getAriaValueText={(val) => { return `${val}V`; }}
        step={0.1}
        min={0}
        max={50}
        valueLabelDisplay="auto"
        marks={volts_marks}
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
    />)
}


function SliderAmps(props) {

    return (
        <Slider
            aria-label="Amps"
            defaultValue={0}
            // value={itrf.amps}
            getAriaValueText={(val) => { return `${val}A`; }}
            step={0.1}
            min={0}
            max={50}
            valueLabelDisplay="auto"
            marks={amps_marks}
        // onChange={
        //     (event, newValue) => {

        //         console.log("change !!", itrf.amps)

        //         let new_interfaces = { ...interfacesRef.current }
        //         new_interfaces[itrf.base_topic].amps = newValue
        //         setInterfaces(new_interfaces)

        //         itrf.co.client.publish(
        //             itrf.base_topic + "/cmds/amps/set",
        //             JSON.stringify({ amps: itrf.amps })
        //         )
        //     }
        // }
        />
    )
}

/**
 * 
 */
function ButtonOnOff(props) {
    return (
        <Button
            // onClick={() => {
            //     // console.log("click change !!", itrf.value)
            //     let toggle_enable = false
            //     if (itrf.enable === false) {
            //         toggle_enable = true
            //     }
            //     itrf.co.client.publish(
            //         itrf.base_topic + "/cmds/enable/set",
            //         JSON.stringify({ enable: toggle_enable })
            //     )
            // }}
            // sx={{
            //     display: 'flex',
            //     justifyContent: 'center',
            //     flexDirection: 'column',
            //     padding: 1
            // }}
        >
            on
            {/* {itrf.enable ? 'ON' : 'OFF'} */}
        </Button>
    )
}

/**
 * Card to manage a power supply interface
 * 
 * @param {object} props.interface - The object containing the interface data
 * @param {object} props.interface.base_topic - Pza base topic of this interface
 * 
 */
export default function CardPowerSupply(props) {

    return (
        <Card sx={{ minWidth: 275, maxWidth: 512 }}>
            <CardContent>

                <Typography sx={{ fontWeight: 'bold' }} variant="h5" component="div" >
                    {props.interface.base_topic.split("/").pop()}
                </Typography>
                <Typography sx={{ fontSize: '14px', mb: 1.5 }} color="text.secondary">
                    {props.interface.base_topic}
                </Typography>

                <SliderVolts />
                <SliderAmps />
                <ButtonOnOff />

            </CardContent>
        </Card>
    );
}

