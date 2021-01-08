import React from 'react'
import LogoIMG from './resources/icon/512x512.png'
import { Button, Grid, makeStyles, Typography, } from '@material-ui/core';
import FirebaseIMG from './resources/sponsor/firebase.svg'
import MaterialIMG from './resources/sponsor/material.png'
import ReactIMG from './resources/sponsor/reactjs.png'
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme=>({
    root:{
        width:'100vw',
        height:'100vh',
        backgroundColor:theme.palette.grey[900],
    },
    grid:{
        height:'100%',
        textAlign:'center',
    },
    logo:{ maxHeight:150, },
    title:{
        fontSize:'4em',
        fontWeight:'400',
        fontFamily:'Fredoka One',
        color:theme.palette.grey[50],
        '& .au':{color:'#0086F8',},
        '& .r':{color:'#34A853',},
        '& .or':{color:'#FBBC05',},
        '& .a':{color:'#EA4335',},
    },
    subtitle:{
        color:'#fff'
    },
    providers:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-evenly',
        '& > div':{
            display:'flex',
            textAlign:'center',
            alignItems:'center',
            flexDirection:'column',
            '& img':{
                maxHeight:50,
                maxWidth:100,
                marginBottom:10,
            },
        },
        [theme.breakpoints.down('sm')]:{
            flexDirection:'column',
            '& > div':{
                marginBottom:10,
            },
        },

    },
}));
export default function Welcome(){
    const classes = useStyles();
    return (<div className={classes.root}>
        <Grid container spacing={0} alignItems="center" justify="space-evenly" direction="column" className={classes.grid}>
            <Grid item>
                <img alt="Aurora Icon" src={LogoIMG} className={classes.logo} />
                <Typography variant="body2" component="p" className={classes.title}>
                    <span className="au">au</span>
                    <span className="r">r</span>
                    <span className="or">or</span>
                    <span className="a">a</span>
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    Una aplicación ReactJS con Firebase Services
                </Typography>
            </Grid>
            <Grid item className={classes.providers}>
                <div>
                    <img alt="Provider" src={ReactIMG} />
                    <Button component={Link} to="/react" color="primary" variant="outlined">Documentacion</Button>
                </div>
                <div>
                    <img alt="Provider" src={MaterialIMG} />
                    <Button component={Link} to="/material" color="primary" variant="contained">Documentacion</Button>
                </div>
                <div>
                    <img alt="Provider" src={FirebaseIMG} />
                    <Button component={Link} to="/firebase" color="secondary" variant="contained">Documentacion</Button>
                </div>
            </Grid>
        </Grid>
    </div>);
}