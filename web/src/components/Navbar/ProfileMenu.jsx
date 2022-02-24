import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext, UIContext } from '../../App';
import { LogoutUser } from '../../services/AuthService';
import { IconButton, useTheme, useMediaQuery, Menu, List, ListItem, ListItemText, Typography, Avatar, ListItemIcon, Switch } from "@mui/material";
import { ExitToApp as LogoutIcon, Settings as SettingsIcon, } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ProfileMenu = () => {
    const navigate = useNavigate();
    const { userState, userDispatch } = useContext(UserContext)
    const { uiState, uiDispatch } = useContext(UIContext)
    const theme = useTheme()
    const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))
    const [profileMenu, setProfileMenu] = useState(null)
    const handleUserLogout = () => {
        LogoutUser().then((res) => {
            if (res.data) {
                userDispatch({
                    type: 'ADD_RECENT_ACCOUNT',
                    payload: res.data.account,
                })
                userDispatch({ type: 'LOGOUT_USER' })
                navigate('/')
            }
            if (res.error) {
                uiDispatch({
                    type: 'SET_MESSAGE',
                    payload: {
                        color: 'error',
                        display: true,
                        text: res.data.error,
                    },
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <IconButton onClick={(e) => setProfileMenu(e.currentTarget)} style={{
                marginLeft: xsScreen ? '4px' : '8px',
                color: !uiState.darkMode ? 'dark' : null,
                backgroundColor: !uiState.darkMode ? '#F0F2F5' : null,
            }}>
                <FontAwesomeIcon icon={faChevronDown} size={xsScreen ? 'xs' : 'sm'} />
            </IconButton>
            <Menu id="profile-menu" anchorEl={profileMenu} open={Boolean(profileMenu)} onClose={() => setProfileMenu(null)} style={{ marginTop: '50px' }}elevation={7}>
                <List>
                    <ListItem button component={Link} to={`/settings`}>
                        <ListItemIcon>
                            <Avatar style={{background: 'teal',color: '#fff',}}>
                                <SettingsIcon />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText>
                        <Typography style={{ fontSize: '15px' }}> Settings</Typography>
                    </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar style={{background: 'teal',color: '#fff',}}>
                            {uiState.darkMode ? (
                                <FontAwesomeIcon icon={faSun} />
                                ) : (
                                <FontAwesomeIcon icon={faMoon} />
                            )}
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText>
                            <Switch checked={uiState.darkMode} onChange={(e) =>uiDispatch({type: 'SET_DARK_MODE',payload: e.target.checked,})}name="checkedB"color="primary"/>
                        </ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleUserLogout}>
                        <ListItemIcon>
                            <Avatar style={{ background: 'teal',color: '#fff',}}>
                                <LogoutIcon />
                            </Avatar>
                    </ListItemIcon>
                        <ListItemText>
                            <Typography style={{ fontSize: '15px' }}> Logout</Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </Menu>
        </div>
    )
}

export default ProfileMenu
