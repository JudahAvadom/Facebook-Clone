import React from 'react'
import { Paper, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div style={{
        minHeight: '100vh',
        minWidth: '100vw', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center' }}
    >
        <Paper style={{ padding: '16px' }} elevation={14}>
            <CircularProgress />    
        </Paper>     
    </div>
  )
}

export default Loader
