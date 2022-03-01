import React, { useContext } from 'react'
import { Grid} from '@mui/material';
import { UserContext, PostContext } from '../../App'
import WritePostCard from '../Posts/PostForm/WritePostCard';

const ProfileTimeline = ({ user }) => {
    const { userState } = useContext(UserContext)
    const { postState } = useContext(PostContext)
    const getUserPost = () => {
        return postState.posts.filter((post) => post.user.id == user.id)
    }
    return (
        <Grid container justify="center" style={{ marginTop: '25px' }} spacing={2}>
            <Grid item xs={12} sm={12} md={8}>
                {userState.currentUser.id == user.id &&  <WritePostCard />}
            </Grid>
        </Grid>
    )
}

export default ProfileTimeline
