import { useContext, useState } from 'react';
import axios from 'axios'
import { UserContext, UIContext } from '../App'

const useUpdateProfilePic = ({ profile_pic, cover_pic, history }) => {
    const [loading, setLoading] = useState(false);
    const { userState, userDispatch } = useContext(UserContext);
    const { uiDispatch } = useContext(UIContext);
    const updateProfilePic = () => {
        let filename = `profile_pic/${userState.currentUser.name}-${Date.now()}-${
            profile_pic.name
        }`
        console.log(filename);
    }
    const saveProfilePic = async (profile_url) => {
        
    }
    return {
        updateProfilePic,
        loading,
    }
}

export default useUpdateProfilePic;