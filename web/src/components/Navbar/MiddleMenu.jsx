import React, { Fragment } from 'react';
import { Button } from '@mui/material';
import { Home, HomeOutlined, Person, PersonOutlined } from "@mui/icons-material";
import { NavLink, useLocation } from 'react-router-dom';
import useStyles from './styles'

const MiddleMenu = () => {
  const classes = useStyles()
  const location = useLocation()
  return (
    <Fragment>
      <Button component={NavLink} activeclassname={classes.activeBtn} to="/home" className={classes.buttonItemMiddle}>
        {location.pathname == '/home' ? (<Home fontSize="large" style={{color: 'rgb(0,133,243)',}}/>) : (<HomeOutlined fontSize="large" />)}
      </Button>
      <Button component={NavLink} activeclassname={classes.activeBtn} to="/friends" className={classes.buttonItemMiddle}>
        {location.pathname == '/friends' ? ( <Person fontSize="large" style={{ color: 'rgb(0,133,243)' }} /> ) : ( <PersonOutlined fontSize="large" />)}
      </Button>
    </Fragment>
  )
}

export default MiddleMenu
