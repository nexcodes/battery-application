import React from "react";
import clsx from "clsx"
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom'

import { useStateContext } from "../contexts/ContextProvider";

import logo from "../assets/logo.png";

const Sidebar = () => {
  const { activeMenu, setActiveMenu , screenSizeBoolean} = useStateContext();
    const location = useLocation()

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 border-r">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={() => setActiveMenu(false)}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img src={logo} alt="logo" />
            </Link>
            <button
              onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>

          <ul className="mt-8 p-4 space-y-2">
            <Link to={"/"} className="block">
              <li onClick={()=> !screenSizeBoolean && setActiveMenu(false)} className={clsx(
                "flex items-center space-x-4 text-xl p-2 rounded",
                location.pathname === "/" ? "bg-blue-500 text-white" : "hover:bg-gray-100",
              )}>
                <LuLayoutDashboard size={24} />
                <span>Dashboard</span>
              </li>
            </Link>
            <Link to={"/create"} className="block">
              <li onClick={()=> !screenSizeBoolean && setActiveMenu(false)} className={clsx(
                "flex items-center space-x-4 text-xl p-2 rounded",
                location.pathname === "/create" ? "bg-blue-500 text-white" : "hover:bg-gray-100",
              )}>
                <IoCreateOutline size={24} />
                <span>Registro</span>
              </li>
            </Link>
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
