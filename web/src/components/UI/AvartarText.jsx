import { Avatar, Typography } from '@mui/material'
import React from 'react'

const AvartarText = ({ text, bg, size = '40px', fontSize = '16px' }) => {
  return (
    <Avatar style={{ background: bg, color: '#fff', width: size, height: size }}>
        <Typography style={{ fontWeight: '800', fontSize: fontSize, color: '#fff' }}>
            {text.split('')[0]}
        </Typography>
    </Avatar>
  )
};

export default AvartarText
