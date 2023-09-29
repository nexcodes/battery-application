import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const screenSizeBoolean = window.innerWidth < 768 ? false : true;
  
  const [activeMenu, setActiveMenu] = useState(screenSizeBoolean);

  return (
    <StateContext.Provider
      value={{ activeMenu, setActiveMenu, screenSizeBoolean }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
