import React, {useContext, useState, useRef, lazy} from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Typography, Dialog, DialogContent, FormControl, InputLabel, Select, TextField, Grid, Button } from '@mui/material';
import useCreatePost from '../../hooks/useCreatePost'
import DialogLoading from '../../../UI/DialogLoading'
import { UIContext, UserContext } from '../../../../App';
import DialogHeader from './DialogHeader';
import FileField from './FileField';
import LocationField from './LocationField.jsx';

const CameraField = lazy(() => import('./CameraField'))

const PostFormCard = () => {
    const { uiState, uiDispatch } = useContext(UIContext);
    const { userState } = useContext(UserContext);
    const [blob, setBlob] = useState(null)
    const [postImage, setPostImage] = useState(null)
    const [previewImage, setPreviewImage] = useState('')
    const [isImageCaptured, setIsImageCaptured] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const fileRef = useRef()
    const [body, setBody] = useState({
        feelings: '',
        with: [],
        at: '',
        date: '',
    })
    const [postData, setPostData] = useState({
        privacy: 'Public',
        content: '',
    })
    const { handleSubmitPost, loading } = useCreatePost({
        postData,
        body,
        postImage,
        isImageCaptured,
        blob,
    })
    const onEmojiClick = (e, emojiObject) => {
        setPostData({
            ...postData,
            content: postData.content + emojiObject.emoji,
        })
    }
    const handleContentChange = (e) => {
        setPostData({
            ...postData,
            content: e.target.value,
        })
    }
    function handleCloseDialog() {
        uiDispatch({ type: 'SET_POST_MODEL', payload: false })
    }
    return (
        <div>
            <Typography style={{
                    color: !uiState.darkMode ? 'grey' : null,
                    padding: '8px',
                    background: !uiState.darkMode ? 'rgb(240,242,245)' : null,
                    borderRadius: '20px',
                    cursor: 'pointer',
                }}
                onClick={() => uiDispatch({ type: 'SET_POST_MODEL', payload: true })}
            >
                What`s in your mind, {userState.currentUser.name} ?
            </Typography>
            {loading ? (
                <DialogLoading loading={loading} text="Uploading Post..." />
            ) : (
                <Dialog
                    disableEscapeKeyDown={false}
                    fullWidth
                    scroll="body"
                    maxWidth="sm"
                    open={uiState.postModel}
                    onClose={() => uiDispatch({ type: 'SET_POST_MODEL', payload: false })}
                    style={{ width: '100%' }}
                >
                    <DialogHeader userState={userState} handleCloseDialog={handleCloseDialog} body={body} />
                    <DialogContent>
                        <FormControl style={{ marginBottom: '16px' }}>
                            <InputLabel>Privacy</InputLabel>
                            <Select
                                native
                                value={postData.privacy}
                                onChange={(e) =>setPostData({ ...postData, privacy: e.target.value })}
                            >
                                <option value={'Only me'}>Only me</option>
                                <option value={'Public'}>Public</option>
                            </Select>
                        </FormControl>
                        <TextField
                            placeholder={`Whats in your mind ${userState.currentUser.name}`}
                            multiline
                            rows={8}
                            value={postData.content}
                            onChange={handleContentChange}
                            style={{background: !uiState.darkMode ? '#fff' : null,border: 'none',width: '100%',}}
                        />
                        <Grid container justify="center" style={{ marginTop: '16px', marginBottom: '16px' }}>
                            <Button onClick={() => setShowEmoji(!showEmoji)} variant="contained" color="secondary" size="small">
                                {showEmoji ? 'Hide Emoji Panel' : 'Show Emoji Panel'}
                            </Button>
                        </Grid>
                        <Grid container alignItems="center" justify="center" style={{ marginTop: '16px', marginBottom: '16px' }}>
                            <Grid item xs={12} sm={6} md={6}> {showEmoji && (
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            )}
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="center">
                            <Grid item xs={12} sm={6} md={6}>
                                <FileField fileRef={fileRef} />
                                <CameraField
                                    setBlob={setBlob}
                                    isImageCaptured={isImageCaptured}
                                    setIsImageCaptured={setIsImageCaptured}
                                    setPreviewImage={setPreviewImage}
                                    setPostImage={setPostImage}
                                />
                                <LocationField />
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}

export default PostFormCard
