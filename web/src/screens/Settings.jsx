import React, { useContext, useState } from 'react'
import { Container, Grid, List, ListItem, ListItemIcon, Paper, ListItemText, Divider } from '@mui/material'
import { UIContext } from '../App';
import DrawerBar from '../components/Navbar/DrawerBar'
import { PersonOutline, SecurityOutlined, LocationCityOutlined } from '@mui/icons-material';

const Settings = () => {
    const { uiState, uiDispatch } = useContext(UIContext)
    const [tab, setTab] = useState('general');
    const handleTabClick = (tab_data) => {
        setTab(tab_data)
        uiDispatch({ type: 'SET_DRAWER', payload: false })
    }
    const ListContents = (
        <>
            <List>
                <ListItem button onClick={() => handleTabClick('general')} style={{backgroundColor:tab === 'general' ? uiState.darkMode ? 'rgb(76,76,76)' : 'rgb(235,237,240)' : null}}>
                    <ListItemIcon>
                        <PersonOutline />
                    </ListItemIcon>
                    <ListItemText primary="General" />
                </ListItem>
                <ListItem button onClick={() => handleTabClick('security_and_login')} style={{backgroundColor:tab === 'security_and_login' ? uiState.darkMode ? 'rgb(76,76,76)' : 'rgb(235,237,240)' : null}}>
                    <ListItemIcon>
                        <SecurityOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Security and Login" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => handleTabClick('location')} style={{backgroundColor:tab === 'location' ? uiState.darkMode ? 'rgb(76,76,76)' : 'rgb(235,237,240)' : null,}}>
                    <ListItemIcon>
                        <LocationCityOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Location" />
                </ListItem>
            </List>
        </>
    )
    return (
        <Container style={{
            paddingTop: '100px',
            paddingBottom: '100px',
            minHeight: '100vh',
        }}>
            {!uiState.mdScreen && <DrawerBar>{ListContents}</DrawerBar>}
            <Grid container spacing={1} style={{ minHeight: '70vh' }}>
                {uiState.mdScreen && (
                    <Grid item md={4}>
                        <Paper style={{ padding: '8px', height: '100%' }}>
                            {ListContents}
                        </Paper>
                    </Grid>
                )}
                <Grid item md={8} xs={12} sm={12}>
                    <Paper style={{ padding: '16px', width: '100%', height: '100%' }}>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
  )
}

export default Settings
