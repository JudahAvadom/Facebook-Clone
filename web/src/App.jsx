import React, { createContext, useReducer, lazy, Suspense, useState, Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, useTheme, createTheme } from "@mui/material";
import { fetchCurrentUser } from './services/AuthService'
import jwtDecode from 'jwt-decode'

// Context
import { initialUIState, UIReducer } from './context/UIContext';
import { initialUserState, UserReducer } from "./context/UserContext";
import { ChatReducer, initialChatState } from "./context/ChatContext";
import { initialPostState, PostReducer } from "./context/PostContext";
export const UIContext = createContext()
export const UserContext = createContext()
export const PostContext = createContext()
export const ChatContext = createContext()

// Components
import Loader from "./components/Loader";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";
const Auth = lazy(() => import('./screens/Auth'))
const Home = lazy(() => import('./screens/Home'))

const token = localStorage.token && JSON.parse(localStorage.token)

function App() {
  const [loading, setLoading] = useState(false)
  const [uiState, uiDispatch] = useReducer(UIReducer, initialUIState);
  const [userState, userDispatch] = useReducer(UserReducer, initialUserState)
  const [postState, postDispatch] = useReducer(PostReducer, initialPostState)
  const [chatState, chatDispatch] = useReducer(ChatReducer, initialChatState)
  const Theme = React.useMemo(() => createTheme({
      active: {
        success: 'rgb(63,162,76)',
      },
      palette: {
        type: uiState.darkMode ? 'dark' : 'light',
        primary: {
          main: 'rgb(1,133,243)',
        },
        secondary: {
          main: 'rgb(63,162,76)',
        },
      },
    }), [uiState.darkMode])
  const theme = useTheme()
  useEffect(()=>{
    async function loadCurrentUser() {
      if (token) {
        const decodeToken = jwtDecode(token)
        console.log(decodeToken);
        if (decodeToken.exp * 1000 < Date.now()) {
          userDispatch({ type: 'LOGOUT_USER' })
        } else {
          const currentUser = await fetchCurrentUser()
          if (currentUser && currentUser.data) {
            userDispatch({
              type: 'SET_CURRENT_USER',
              payload: currentUser.data.user,
            })
            uiDispatch({
              type: 'SET_NOTIFICATIONS',
              payload: currentUser.data.notifications,
            })
          }
        }
      }
    }
    loadCurrentUser();
  }, [])
  return (
    <UIContext.Provider value={{ uiState, uiDispatch }}>
      <UserContext.Provider value={{ userState, userDispatch }}>
        <PostContext.Provider value={{ postState, postDispatch }}>
          <ChatContext.Provider value={{ chatState, chatDispatch }}>
            <ThemeProvider theme={Theme}>
              <Fragment>
                <BrowserRouter>
                  {userState.isLoggedIn && <Navbar />}
                  <div style={{
                      backgroundColor: !uiState.darkMode ? 'rgb(240,242,245)' : 'rgb(24,25,26)',
                    }}
                  >
                    <Suspense fallback={<Loader />}>
                      {loading ? ( <Loader /> ) : (
                        <Routes>
                          <Route path='/' element={!userState.isLoggedIn ? ( <Auth /> ) : ( <Navigate to='/home' /> )} />
                          <Route path='/home' element={<ProtectedRoute isLoggedIn={userState.isLoggedIn}><Home /></ProtectedRoute>} />
                        </Routes>
                      )}
                    </Suspense>
                  </div>
                </BrowserRouter>
              </Fragment>
            </ThemeProvider>
          </ChatContext.Provider>
        </PostContext.Provider>
      </UserContext.Provider>
    </UIContext.Provider>
  )
}

export default App
