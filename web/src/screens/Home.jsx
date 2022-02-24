import React, { Fragment, useContext } from 'react'
import { PostContext, UIContext, UserContext } from '../App'

const Home = () => {
  const { uiState, uiDispatch } = useContext(UIContext)
  const { userState } = useContext(UserContext)
  const {  postState } = useContext(PostContext)
  return (
    <div>
      {uiState.mdScreen ? (
        <Fragment>

        </Fragment>
      ) : (
        <>
        </>
      )}
    </div>
  )
}

export default Home
