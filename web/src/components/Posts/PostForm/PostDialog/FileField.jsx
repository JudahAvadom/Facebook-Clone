import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FileField = ({fileRef}) => {
  const handleImageClick = (e) => {
    e.preventDefault()
    fileRef.current.click()
  }
  return (
    <Tooltip title="Select Image from Device" arrow placement="bottom">
      <IconButton onClick={handleImageClick}>
        <FontAwesomeIcon icon={faImage} color="rgb(73,189,99)" />
      </IconButton>
    </Tooltip>
  )
}

export default FileField
