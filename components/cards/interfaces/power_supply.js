// REACT
import React, { useState, useEffect, useRef } from 'react'

//
import Link from 'next/link'
import Image from 'next/image'

//
import {
    Button,
    Slider,
    Container,
    Typography,
    Chip,
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
}
    from '@mui/material';




/**
 * Manage the volts slider of the card
 *
 * @param {object} props.interface - The object containing the interface data
 * @param {object} props.interface.co - Mqtt connection informations
 * @param {float}  props.interface.volts - The number of volts to set on the power supply
 * @param {object} props.interface.base_topic - Pza base topic of this interface
 */
function SliderVolts(props) {

    const volts_marks = [
        {
            value: props.interface.volts.min,
            label: props.interface.volts.min.toString() + 'V',
        },
        {
            value: props.interface.volts.max,
            label: props.interface.volts.max.toString() + 'V',
        },
    ];

    return (<Slider
        aria-label="Volts"
        defaultValue={0}
        value={props.interface.volts.value}
        getAriaValueText={(val) => { return `${val}V`; }}
        step={props.interface.volts.scale}
        min={props.interface.volts.min}
        max={props.interface.volts.max}
        valueLabelDisplay="auto"
        marks={volts_marks}
        onChange={
            (event, newValue) => {
                // Just send the mqtt command
                props.interface.volts = newValue
                props.interface.co.client.publish(
                    props.interface.base_topic + "/cmds/volts/set",
                    JSON.stringify({ volts: newValue })
                )
            }
        }
    />)
}

/**
 * Manage the amps slider of the card
 *
 * @param {object} props.interface - The object containing the interface data
 * @param {object} props.interface.co - Mqtt connection informations
 * @param {float}  props.interface.amps - The number of amps to set on the power supply
 * @param {object} props.interface.base_topic - Pza base topic of this interface
 */
function SliderAmps(props) {

    const amps_marks = [
        {
            value: props.interface.amps.min,
            label: props.interface.amps.min.toString() + 'A',
        },
        {
            value: props.interface.amps.max,
            label: props.interface.amps.max.toString() + 'A',
        },
    ];

    return (<Slider
        aria-label="Amps"
        defaultValue={0}
        value={props.interface.amps.value}
        getAriaValueText={(val) => { return `${val}A`; }}
        step={props.interface.amps.scale}
        min={props.interface.amps.min}
        max={props.interface.amps.max}
        valueLabelDisplay="auto"
        marks={amps_marks}
        onChange={
            (event, newValue) => {
                // Just send the mqtt command
                props.interface.amps = newValue
                props.interface.co.client.publish(
                    props.interface.base_topic + "/cmds/amps/set",
                    JSON.stringify({ amps: newValue })
                )
            }
        }
    />
    )
}

/**
 * Manage the on/off button
 *
 * @param {object} props.interface - The object containing the interface data
 * @param {object} props.interface.state - The power supply state
 */
function ButtonOnOff(props) {
    return (

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>


            <Chip
                label={props.interface.state === 'on' ? 'ON' : 'OFF'}
                color={props.interface.state === 'on' ? 'success' : 'error'}
            />


            <Button
                onClick={() => {
                    let toggle_state = 'off'
                    if (props.interface.state === 'off') {
                        toggle_state = 'on'
                    }
                    props.interface.co.client.publish(
                        props.interface.base_topic + "/cmds/state/set",
                        JSON.stringify({ state: toggle_state })
                    )
                }}
                color={props.interface.state === 'on' ? 'error' : 'success'}
            >
                {props.interface.state === 'on' ? 'Turn OFF' : 'Turn ON'}
            </Button>


        </Box>
    )
}

/**
 * Card to manage a power supply interface
 * 
 * @param {object} props.interface - The object containing the interface data
 * @param {object} props.interface.base_topic - Pza base topic of this interface
 */
export default function CardPowerSupply(props) {

    return (
        <Card sx={{ minWidth: 275, maxWidth: 512 }}>

            <CardHeader
                avatar={
                    <Image src="/img/power_sup.png"
                        width={64}
                        height={64}
                    />
                }
                title={props.interface.base_topic.split("/").pop().replaceAll("_", " ")}
                subheader={props.interface.base_topic}
            />


            <CardContent >
                <Box sx={{ ml: "16px", mr: "16px" }}>
                    <SliderVolts interface={props.interface} />
                    <SliderAmps interface={props.interface} />
                </Box>
            </CardContent>


            <CardActions
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <ButtonOnOff interface={props.interface} />
            </CardActions>

        </Card>
    );
}

