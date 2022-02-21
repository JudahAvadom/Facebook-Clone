import React from 'react'
import { Route, Navigate } from 'react-router-dom'

function ProtectedRoute(props) {
    console.log(props);
    return (
        <>
            {props.isLoggedIn ? props.children: <Navigate to={{pathname: '/'}}/>}
        </>
    )
}

export default ProtectedRoute