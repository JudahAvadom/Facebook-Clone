import React, { createContext, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import { initialUIState, UIReducer } from './context/UIContext';
export const UIContext = createContext()

// Components
import Auth from "./screens/Auth";

function App() {
  const [uiState, uiDispatch] = useReducer(UIReducer, initialUIState);
  return (
    <UIContext.Provider value={{ uiState, uiDispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </UIContext.Provider>
  )
}

export default App
