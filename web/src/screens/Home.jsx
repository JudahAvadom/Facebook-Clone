import { List, ListItem, ListItemIcon, Avatar, ListItemText } from '@mui/material';
import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import { PostContext, UIContext, UserContext } from '../App'
import { homeLeftItems } from '../data/Home'
import Sidebar from '../components/Sidebar'
import AvartarText from '../components/UI/AvartarText.jsx';

const Home = () => {
  const { uiState, uiDispatch } = useContext(UIContext)
  const { userState } = useContext(UserContext)
  const {  postState } = useContext(PostContext)
  return (
    <div>
      {uiState.mdScreen ? (
        <Fragment>
          <Sidebar
            anchor="left"
            background={
              !uiState.darkMode ? 'rgb(240,242,245)' : 'rgb(24,25,26)'
            }
            boxShadow={false}
          >
            <List>
              <ListItem
                button
                component={Link}
                to={`/profile/${userState.currentUser.id}`}
              >
                <ListItemIcon>
                  {userState.currentUser.profile_pic ? (
                    <Avatar
                      style={{
                        width: '50px',
                        height: '50px',
                      }}
                    >
                      <img
                        src={userState.currentUser.profile_pic}
                        width="100%"
                        height="100%"
                      />
                    </Avatar>
                  ) : (
                    <AvartarText 
                      text={userState.currentUser.name}
                      bg={userState.currentUser.active ? 'seagreen' : 'tomato'}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: '6px' }}
                  primary={userState.currentUser.name}
                />
              </ListItem>
              {homeLeftItems.map((list, index) => (
                <ListItem button key={index} component={Link} to={list.to}>
                  <ListItemIcon>
                    <Avatar
                      alt={list.title}
                      src={`../src/assets/${list.img}`}
                    />
                  </ListItemIcon>
                  <ListItemText primary={list.title} />
                </ListItem>
              ))}
            </List>
          </ Sidebar>
        </Fragment>
      ) : (
        <>
        </>
      )}
    </div>
  )
}

export default Home
