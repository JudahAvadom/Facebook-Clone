import React, { createContext, useReducer, lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/Loader";

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
const Auth = lazy(() => import('./screens/Auth'))

function App() {
  const [loading, setLoading] = useState(false)
  const [uiState, uiDispatch] = useReducer(UIReducer, initialUIState);
  const [userState, userDispatch] = useReducer(UserReducer, initialUserState)
  const [postState, postDispatch] = useReducer(PostReducer, initialPostState)
  const [chatState, chatDispatch] = useReducer(ChatReducer, initialChatState)
  return (
    <UIContext.Provider value={{ uiState, uiDispatch }}>
      <UserContext.Provider value={{ userState, userDispatch }}>
        <PostContext.Provider value={{ postState, postDispatch }}>
          <ChatContext.Provider value={{ chatState, chatDispatch }}>
            <BrowserRouter>
              <div style={{
                  backgroundColor: !uiState.darkMode ? 'rgb(240,242,245)' : 'rgb(24,25,26)',
                }}
              >
                <Suspense fallback={<Loader />}>
                  {loading ? ( <Loader /> ) : (
                    <Routes>
                      <Route path='/' element={!userState.isLoggedIn ? ( <Auth /> ) : ( <Navigate to='/home' /> )} />
                    </Routes>
                  )}
                </Suspense>
              </div>
            </BrowserRouter>
          </ChatContext.Provider>
        </PostContext.Provider>
      </UserContext.Provider>
    </UIContext.Provider>
  )
}

export default App
