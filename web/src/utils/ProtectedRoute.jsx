import React from 'react'
import { Route, Navigate } from 'react-router-dom'

function ProtectedRoute(props) {
    return (
        <>
            {props.isLoggedIn ? props.children: <Navigate to={{pathname: '/'}}/>}
        </>
    )
}

export default ProtectedRoute