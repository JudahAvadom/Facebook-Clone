import React, {Fragment, useContext} from 'react';
import { UIContext, UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Toolbar, useMediaQuery, useTheme, Tooltip, IconButton } from '@mui/material'
import useStyles from './styles'

// Components
import RightMenu from './RightMenu'
import MiddleMenu from './MiddleMenu'
import SearchFriends from '../Friends/SearchFriends'

const Navbar = () => {
    const { uiState, uiDispatch } = useContext(UIContext)
    const classes = useStyles()
    const theme = useTheme()
    const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))
    return (
        <Fragment>
            <AppBar color="default" className={classes.root} elevation={1}  style={{
                backgroundColor: !uiState.darkMode ? 'white' : 'rgb(36,37,38)',
                color: !uiState.darkMode ? 'blue' : null,
                zIndex:"10000"
            }}>
                <Toolbar>
                    <div className={classes.leftMenu}>
                    <FontAwesomeIcon icon={faFacebook} size={xsScreen ? 'xs' : '2x'} style={{
                        width: '40px',
                        height: '40px',
                        color: !uiState.darkMode ? 'rgb(0,133,243)' : null,
                        marginRight: '8px',
                    }} />
                    <SearchFriends />
                    {!uiState.mdScreen && uiState.navDrawerMenu && (
                        <Tooltip arrow title={
                            uiState.drawer
                              ? 'click to close drawer '
                              : ' click to open drawer'
                        }>
                            <IconButton onClick={() => uiDispatch({ type: 'SET_DRAWER', payload: !uiState.drawer })}>
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    </div>
                    {uiState.mdScreen && (
                        <div className={classes.middleMenu}>
                            <MiddleMenu />
                        </div>
                    )}
                    <div className={classes.rightMenu}>
                        <RightMenu />
                    </div>
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}

export default Navbar
