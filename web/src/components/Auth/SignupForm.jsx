import React, { Fragment } from 'react';
import { FormControl, TextField, Button, CircularProgress } from "@mui/material";

import useSignupUser from './hooks/useSignupUser'

const SignupForm = () => {
  const {
    handleSignupUser,
    loading,
    error,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange
  } = useSignupUser()
  return (
    <Fragment>
      <form onSubmit={handleSignupUser}>
        <FormControl style={{ width: '100%' }}>
          <TextField
            label="Name"
            variant="outlined"
            onChange={handleNameChange}
            error={error && error.name ? true : false}
            helperText={error && error.name ? error.name : null}
            style={{ marginTop: '16px' }}
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            style={{ marginTop: '16px' }}
            onChange={handleEmailChange}
            error={error && error.email ? true : false}
            helperText={error && error.email ? error.email : null}
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <TextField
            label="Password"
            variant="outlined"
            style={{ marginTop: '16px' }}
            type="password"
            error={error && error.password ? true : false}
            helperText={error && error.password ? error.password : null}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Button
          type="submit"
          style={{
            width: '100%',
            background: 'rgb(24,119,242)',
            color: '#fff',
            marginTop: '16px',
          }}
          variant="contained"
        >
          {loading ? 
            ( <CircularProgress variant="indeterminate" size={25} style={{ color: '#fff' }}/>) : 
            ( 'Sign up' )}
        </Button>
      </form>
    </Fragment>
  )
}

export default SignupForm