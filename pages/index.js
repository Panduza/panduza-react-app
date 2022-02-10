import React from 'react';

// NEXT
import Link from 'next/link'
import Image from 'next/image'

// MUI
import {
  Container,
  Typography,
  Button,
  Grid,
} from '@mui/material';

//
function GridItem(props) {

  return (
    <Grid item xs={6}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >

      <Link href={props.link} >
        <Button
          sx={{
            backgroundColor: props.backColor,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: 3,
            '&:hover': {
              backgroundColor: props.backColorHover,
            },
          }}
        >
          <Image src={props.imgsrc}
            width={256}
            height={256}
          />
          <Typography
            variant='caption'
            sx={{
              color: "#FFFFFF",
              fontSize: 16,
              marginTop: 3
            }}
          >
            {props.label}
          </Typography>
        </Button>
      </Link>

    </Grid>
  )
}

//
export default function Home(props) {

  return (
    <Container
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column'
      }}
    >

      <Grid container spacing={2}>

        <GridItem
          imgsrc="/img/brokers.png"
          label="Brokers"
          link="/brokers"
          backColor="#16a085"
          backColorHover="#1abc9c"
        />

        <GridItem
          imgsrc="/img/interface.png"
          label="Interfaces"
          link="/interfaces"
          backColor="#f39c12"
          backColorHover="#f1c40f"
        />

        <GridItem
          imgsrc="/img/documentation.png"
          label="Documentation"
          link="https://panduza-doc.readthedocs.io/en/latest/"
          backColor="#8e44ad"
          backColorHover="#9b59b6"
        />

        <GridItem
          imgsrc="/img/github.png"
          label="Sources"
          link="https://github.com/Panduza"
          backColor="#2980b9"
          backColorHover="#3498db"
        />

      </Grid>

    </Container >
  )
}

