import { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { storage } from '../../../firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UIContext, PostContext } from '../../../App'

const useCreatePost = ({postData,body,isImageCaptured,postImage,blob,}) => {
    const [loading, setLoading] = useState(false)
    const { uiDispatch } = useContext(UIContext)
    const { postDispatch } = useContext(PostContext)
    const navigate = useNavigate();
    const createPost = async (data) => {
        setLoading(true)
        let token = localStorage.token && JSON.parse(localStorage.getItem('token'))
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/post/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setLoading(false)
            postDispatch({ type: 'ADD_POST', payload: response.data.post })
                uiDispatch({
                    type: 'SET_MESSAGE',
                    payload: {
                    color: 'success',
                    display: true,
                    text: response.data.message,
                },
            })
            uiDispatch({ type: 'SET_POST_MODEL', payload: false })
            navigate('/')
        } catch (err) {
            setLoading(false)
            if (err && err.response) {
                uiDispatch({
                    type: 'SET_MESSAGE',
                    payload: {
                        display: true,
                        text: err.response.data.error,
                        color: 'error',
                    },
                })
            }
            console.log(err)
        }
    }
    const createUserPost = async(uri = '') => {
        await createPost({
            ...postData,
            image: uri ? uri : '',
            body: {
                ...body,
            },
        })
    }
    const handleSubmitPost = (e) => {
        e.preventDefault()
        if (isImageCaptured) {
            let filename = `post/post-${Date.now()}.png`
            const storageRef = ref(storage, `images/${filename}`);
            const uploadTask = uploadBytesResumable(storageRef, blob);
            uploadTask.on(
                'state_changed',() => {
                    setLoading(true)
                },
                (err) => {
                    console.log('error from firebase');
                    setLoading(false);
                    uiDispatch({ type: 'SET_POST_MODEL', payload: false });
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        createUserPost(downloadURL)
                        setLoading(false)
                    });
                },
            )
        }
        else if (postImage) {
            let filename = `post/post-${Date.now()}-${postImage.name}`;
            const storageRef = ref(storage, `images/${filename}`);
            const uploadTask = uploadBytesResumable(storageRef, postImage);
            uploadTask.on(
                'state_changed',() => {
                    setLoading(true)
                },
                (err) => {
                    console.log('error from firebase');
                    setLoading(false);
                    uiDispatch({ type: 'SET_POST_MODEL', payload: false });
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        createUserPost(downloadURL)
                    });
                },
            )
        } else {
            createUserPost()
        }
    }
    return {
        handleSubmitPost,
        loading,
    }
}

export default useCreatePost