// Modules
import React, { useContext } from 'react'
import { Container, Grid, Typography } from "@mui/material";

import { UIContext } from '../App';

const Auth = () => {
  const { uiState } = useContext(UIContext)
  return (
    <div style={{ paddingBottom: '100px', minHeight: '100vh' }}>
      <Container>
        <Grid container justify="center" alignItems="flex-start" direction="column" style={{ paddingTop: '30px' }}>
          <Typography variant="h4" style={{
              fontWeight: 800,
              color: uiState.darkMode ? 'white' : 'black',
            }}
          >
            Facebook
          </Typography>
          <Typography variant="h6"
            style={{
              fontWeight: 800,
              color: uiState.darkMode ? 'white' : 'black',
            }}
          >
            Recents Login
          </Typography>
          <Typography variant="body2"
            style={{
              marginTop: '16px',
              fontWeight: 800,
              color: uiState.darkMode ? 'white' : 'black',
            }}
          >
            Click your picture or add an account
          </Typography>
        </Grid>
      </Container>
    </div>
  )
}

export default Auth