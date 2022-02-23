import React, { Fragment } from 'react'
import { FormControl, TextField, Button, CircularProgress } from '@mui/material';

import useLoginUser from './hooks/useLoginUser'

const LoginForm = () => {
  const { loading, handlePasswordChange, handleEmailChange, error, handleLoginUser } = useLoginUser()
  return (
    <Fragment>
      <form onSubmit={handleLoginUser}>
        <FormControl style={{ width: '100%' }}>
          <TextField
            onChange={handleEmailChange}
            error={error && error.email ? true : false}
            helperText={error && error.email ? error.email : null}
            label="Email"
            variant="outlined"
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <TextField
            onChange={handlePasswordChange}
            error={error && error.email ? true : false}
            helperText={error && error.email ? error.email : null}
            label="Password"
            variant="outlined"
            style={{ marginTop: '16px' }}
            type="password"
          />
        </FormControl>
        <Button type="submit" variant="contained" disabled={loading}style={{
          width: '100%',
          background: 'rgb(24,119,242)',
          color: '#fff',
          marginTop: '16px',
        }}>
          {loading ? ( <CircularProgress variant="indeterminate" size={25} style={{ color: '#fff' }}/>) : (' Log In')}
        </Button>
      </form>
    </Fragment>
  )
}

export default LoginForm
