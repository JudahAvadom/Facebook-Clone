import { useContext, useState } from 'react';
import axios from 'axios'
import { UserContext, UIContext } from '../App'
import { storage } from '../firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const useUpdateProfilePic = ({ profile_pic, cover_pic, history }) => {
    const [loading, setLoading] = useState(false);
    const { userState, userDispatch } = useContext(UserContext);
    const { uiDispatch } = useContext(UIContext);
    const updateProfilePic = async() => {
        let filename = `profile_pic/${userState.currentUser.name}-${Date.now()}-${
            profile_pic.name
        }`
        const storageRef = ref(storage, `images/${filename}`);
        const uploadTask = uploadBytesResumable(storageRef, profile_pic);
        uploadTask.on(
            'state_changed',() => {
              setLoading(true)
            },
            (err) => {
              console.log('error from firebase')
              setLoading(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    saveProfilePic(downloadURL)
                });
            },
        )
    }
    const saveProfilePic = async (profile_url) => {
        setLoading(true);
        try {
            let token = JSON.parse(localStorage.getItem('token'))
            const response = await axios.put(`${import.meta.env.VITE_API_URI}/api/user/profile_pic/update`,
                { profile_url },
                {headers: {Authorization: `Bearer ${token}`,},},
            )
            if (response.data) {
                uiDispatch({
                    type: 'SET_MESSAGE',
                        payload: {
                            text: response.data.message,
                            color: 'success',
                            display: true,
                        },
                    })
                userDispatch({ type: 'UPDATE_USER', payload: response.data.user })
            }
            setLoading(false)
            history.push('/home')
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    return {
        updateProfilePic,
        loading,
    }
}

export default useUpdateProfilePic;