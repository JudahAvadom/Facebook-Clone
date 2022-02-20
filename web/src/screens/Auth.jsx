// Modules
import React, { useContext, useState } from 'react'
import { Container, Grid, Typography, Paper, Divider, Button } from "@mui/material";

import { UIContext } from '../App';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';

const Auth = () => {
  const [toggleLoginForm, setToggleLoginForm] = useState(true)
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
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6} md={8}>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={8} style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {toggleLoginForm ? <LoginForm /> : <SignupForm />}
              <Divider />
              <Button
                onClick={() => setToggleLoginForm(!toggleLoginForm)}
                style={{
                  marginTop: '32px',
                  background: 'rgb(74,183,43)',
                  color: '#fff',
                }}
              >
                {toggleLoginForm
                  ? 'Create New Account'
                  : ' Already have an Account'}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Auth