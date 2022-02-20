import React, { Fragment } from 'react';
import { FormControl, TextField, Button } from "@mui/material";

import useSignupUser from './hooks/useSignupUser'

const SignupForm = () => {
  const {
    handleSignupUser,
  } = useSignupUser()
  return (
    <Fragment>
      <form onSubmit={handleSignupUser}>
        <FormControl style={{ width: '100%' }}>
          <TextField
            label="Name"
            variant="outlined"
            style={{ marginTop: '16px' }}
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            style={{ marginTop: '16px' }}
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <TextField
            label="Password"
            variant="outlined"
            style={{ marginTop: '16px' }}
            type="password"
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
          Sign up
        </Button>
      </form>
    </Fragment>
  )
}

export default SignupForm