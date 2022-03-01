import React, { useContext } from 'react';
import { Paper, Avatar } from '@mui/material';
import { UIContext, UserContext } from '../../../App'
import AvartarText from '../../UI/AvartarText';

const WritePostCard = () => {
    const { userState } = useContext(UserContext);
    const { uiState } = useContext(UIContext);
    return (
        <div>
            <Paper style={{maxWidth: '100%',padding: '16px',backgroundColor: uiState.darkMode && 'rgb(36,37,38)',}}>
                <div style={{display: 'flex',alignItems: 'center',justifyContent: 'flex-start',}}>
                    {userState.currentUser.profile_pic ? (
                    <Avatar>
                        <img src={userState.currentUser.profile_pic} width="100%" height="100%"/>
                    </Avatar>
                    ) : (
                    <AvartarText text={userState.currentUser.name} bg={userState.currentUser.active ? 'seagreen' : 'tomato'}/>
                    )}
                    <div style={{ width: '100%', marginLeft: '16px', marginRight: '16px' }}>
                        
                    </div>
                </div>
            </Paper>
        </div>
    )
}

export default WritePostCard
