import React, { useState, useRef } from 'react'
import { Tooltip, IconButton, Dialog, Container, Grid, Avatar } from '@mui/material'
import { Close, Check, Camera } from "@mui/icons-material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

const CameraField = ({setBlob,isImageCaptured,setIsImageCaptured,setPreviewImage,setPostImage}) => {
    const [open, setOpen] = useState(false)
    const videoRef = useRef()
    const canvasRef = useRef()
    const initCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream
            })
            .catch((error) => {
                console.log(error)
            })
    } 
    function removeCameraImage() {
        setIsImageCaptured(false)
        initCamera()
    }
    function disableCamera() {
        if (videoRef.current.srcObject) {
            videoRef.current.srcObject.getVideoTracks().forEach((track) => {
                track.stop()
            })
        }
    }
    const handleOpenCameraDialog = () => {
        initCamera()
        setOpen(true)
    }    
    const handleCloseCameraDialog = () => {
        disableCamera()
        setOpen(false)
    }
    const addImageToPost = () => {
        canvasRef.current.toBlob((blob) => {
          setPostImage(false)
          setPreviewImage('')
          setBlob(blob)
        })
        disableCamera()
        setOpen(false)
    }
    const handleCapture = () => {
        let video = videoRef.current
        let canvas = canvasRef.current
        canvas.width = video.getBoundingClientRect().width
        canvas.height = video.getBoundingClientRect().height
        let context = canvas.getContext('2d')
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        setIsImageCaptured(true)
        disableCamera()
    }
    return (
        <>
            <Tooltip title="Click Image from Camera" arrow placement="bottom">
                <IconButton onClick={handleOpenCameraDialog}>
                    <FontAwesomeIcon icon={faCamera} color="rgb(24,119,242)" />
                </IconButton>
            </Tooltip>  
            <Dialog disableEscapeKeyDown fullWidth scroll="body" maxWidth="sm" open={open} onClose={handleCloseCameraDialog} style={{ width: '100%' }}>
                <Container>
                    <Grid container alignItems="center" justify="center">
                        <Grid item xs={12} sm={12} md={12}>
                            <video ref={videoRef} autoPlay playsInline style={{
                                display: isImageCaptured ? 'none' : 'block',
                                width: '100%',
                            }}/>
                            <canvas ref={canvasRef} height="240" style={{ display: isImageCaptured ? 'block' : 'none' }}/>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '16px',
                                marginBottom: '16px',
                            }}>
                                {isImageCaptured ? (
                                    <>
                                        <IconButton onClick={removeCameraImage} size="medium">
                                            <Avatar style={{ background: 'tomato', color: 'white'}}>
                                                <Close />
                                            </Avatar>
                                        </IconButton>
                                        <IconButton onClick={addImageToPost} size="medium">
                                            <Avatar style={{ background: 'seagreen', color: 'white' }}>
                                              <Check />
                                            </Avatar>
                                        </IconButton>
                                    </>
                                ) : (
                                    <IconButton onClick={handleCapture} color="primary" size="medium">
                                        <Avatar style={{ background: 'teal', color: 'white' }}>
                                            <Camera />
                                        </Avatar>
                                    </IconButton>
                                ) }
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </>
    )
}

export default CameraField
