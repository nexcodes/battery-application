import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Create from "./pages/Create";
import Home from "./pages/Home";

import {CgMenuLeft} from "react-icons/cg"
import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const { activeMenu , setActiveMenu } = useStateContext();

  return (
    <>
      <BrowserRouter>
        {activeMenu ? (
          <div className="w-72 fixed sidebar bg-white z-10">
            <Sidebar />
          </div>
        ) : (
          <div onClick={()=> setActiveMenu(prev => !prev)} className="p-4">
            <CgMenuLeft size={28} />
          </div>
        )}

        <Routes>
          <Route path="/" element={
              <section className="md:w-[calc(100%-18rem)] md:float-right p-4">
                <Home />
              </section>
            } />
          <Route
            path="/create"
            element={
              <section className="md:w-[calc(100%-18rem)] md:float-right p-4">
                <Create />
              </section>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
