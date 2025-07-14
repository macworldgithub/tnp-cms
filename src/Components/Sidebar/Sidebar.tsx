import { useState } from "react";
import "../../App.css";

import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import Logo from "../../../public/logo.png";
import { FaMoon, FaRegImage, FaRegUser } from "react-icons/fa";
// import { IoWalletOutline } from "react-icons/io5";
import { LuCalendarDays, LuWallet2 } from "react-icons/lu";
// import { CiSettings } from "react-icons/ci";
import { PiChartLineLight } from "react-icons/pi";
import { ImFileText } from "react-icons/im";
// import { TiUserOutline } from "react-icons/ti";
// import { Avatar } from "antd";
// import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
// import { TbPackages } from "react-icons/tb";
import { BsTree } from "react-icons/bs";

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currOption, setCurrOption] = useState("dashboard");

  return (
    <>
      <div
        className={`h-full flex flex-col justify-between  min-h-[100vh] py-5 rounded-xl m-3 ${
          isCollapsed ? "w-20" : "w-60"
        } bg-primary animate-width`}
      >
        <div className="">
          <div className="flex items-center justify-start px-5 cursor-pointer">
            <div
              className="flex justify-start w-16 h-16 items-center"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <img src={Logo} className="w-full h-full" />
            </div>

            <p
              className={`${
                isCollapsed ? "w-0" : "ms-3"
              } text-white font-bold overflow-hidden text-lg`}
            >
              Tourism
            </p>
          </div>

          <Link to={"/"}>
            <div
              onClick={() => setCurrOption("dashboard")}
              className={`${
                isCollapsed && currOption === "dashboard"
                  ? "bg-white text-primary rounded-lg py-1 px-1"
                  : ""
              } ${
                isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
              } flex justify-start mt-10 text-3xl items-center cursor-pointer py-3 ${
                currOption === "dashboard" && !isCollapsed
                  ? "rounded-l-xl bg-white text-primary"
                  : ""
              } ${currOption !== "dashboard" ? "text-white" : ""}`}
            >
              <MdDashboard />
              <p
                className={`${
                  isCollapsed ? "w-0" : "ms-3"
                } font-old overflow-hidden text-base`}
              >
                Dashboard
              </p>
            </div>
          </Link>
          <Link to={"/users"}>
            <div
              onClick={() => setCurrOption("users")}
              className={`${
                isCollapsed && currOption === "users"
                  ? "bg-white text-primary rounded-lg py-1 px-1"
                  : ""
              } ${
                isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
              } flex justify-start text-3xl items-center cursor-pointer text- py-3 ${
                currOption === "users" && !isCollapsed
                  ? "rounded-l-xl bg-white text-primary"
                  : ""
              } ${currOption !== "users" ? "text-white" : ""}`}
            >
              <FaRegUser />
              <p
                className={`${
                  isCollapsed ? "w-0" : "ms-3"
                } font-old overflow-hidden text-base`}
              >
                Users
              </p>
            </div>
          </Link>
          <Link to={"/analytics"}>
            <div
              onClick={() => setCurrOption("analytics")}
              className={`${
                isCollapsed && currOption === "analytics"
                  ? "bg-white text-primary rounded-lg py-1 px-1"
                  : ""
              } ${
                isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
              } flex justify-start cursor-pointer text-3xl items-center ext-white py-3 ${
                currOption === "analytics" && !isCollapsed
                  ? "rounded-l-xl bg-white text-primary"
                  : ""
              } ${currOption !== "analytics" ? "text-white" : ""}`}
            >
              <PiChartLineLight className="font-bold" />
              <p
                className={`${
                  isCollapsed ? "w-0" : "ms-3"
                } font-old overflow-hidden text-base`}
              >
                Analytics
              </p>
            </div>
          </Link>
          <Link to={"/banners"}>
            <div
              onClick={() => setCurrOption("banners")}
              className={`${
                isCollapsed && currOption === "banners"
                  ? "bg-white text-primary rounded-lg py-1 px-1"
                  : ""
              } ${
                isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
              } flex justify-start cursor-pointer text-3xl items-center ext-white py-3 ${
                currOption === "banners" && !isCollapsed
                  ? "rounded-l-xl bg-white text-primary"
                  : ""
              } ${currOption !== "banners" ? "text-white" : ""}`}
            >
              <FaRegImage className="font-bold" />
              <p
                className={`${
                  isCollapsed ? "w-0" : "ms-3"
                } font-old overflow-hidden text-base`}
              >
                Banners
              </p>
            </div>
          </Link>
          <Link to={"/packages"}>
            <div
              onClick={() => setCurrOption("packages")}
              className={`${
                isCollapsed && currOption === "packages"
                  ? "bg-white text-primary rounded-lg py-1 px-1"
                  : ""
              } ${
                isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
              } flex cursor-pointer justify-start  text-3xl items-center txt-white py-3 ${
                currOption === "packages" && !isCollapsed
                  ? "rounded-l-xl bg-white text-primary"
                  : ""
              } ${currOption !== "packages" ? "text-white" : ""}`}
            >
              <LuWallet2 />
              <p
                className={`${
                  isCollapsed ? "w-0" : "ms-3"
                } font-old overflow-hidden text-base`}
              >
                Packages
              </p>
            </div>
          </Link>
          <Link to={"/trips"}>
            <div
              onClick={() => setCurrOption("trips")}
              className={`${
                isCollapsed && currOption === "trips"
                  ? "bg-white text-primary rounded-lg py-1 px-1"
                  : ""
              } ${
                isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
              } flex cursor-pointer justify-start  text-3xl items-center txt-white py-3 ${
                currOption === "trips" && !isCollapsed
                  ? "rounded-l-xl bg-white text-primary"
                  : ""
              } ${currOption !== "trips" ? "text-white" : ""}`}
            >
              <BsTree />
              <p
                className={`${
                  isCollapsed ? "w-0" : "ms-3"
                } font-old overflow-hidden text-base`}
              >
                Trips
              </p>
            </div>
          </Link>
          {/* <Link to={"/hotel"}>
            <div
              onClick={() => setCurrOption("hotel")}
              className={`${
                isCollapsed && currOption === "hotel"
                  ? "bg-white text-primary rounded-lg py-1 px-1"
                  : ""
              } ${
                isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
              } cursor-pointer flex justify-start  text-3xl items-center text-whte py-3 ${
                currOption === "hotel" && !isCollapsed
                  ? "rounded-l-xl bg-white text-primary"
                  : ""
              } ${currOption !== "hotel" ? "text-white" : ""}`}
            >
              <LuCalendarDays />
              <p
                className={`${
                  isCollapsed ? "w-0" : "ms-3"
                } font-old overflow-hidden text-base`}
              >
                Hotel 
              </p>
            </div>
          </Link> */}
          {/* <Link to={"/carRental"}>
            <div
              onClick={() => setCurrOption("carRental")}
              className={`${
                isCollapsed && currOption === "carRental"
                  ? "bg-white text-primary rounded-lg py-1 px-1"
                  : ""
              }cursor-pointer ${
                isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
              } flex justify-start text-3xl items-center txt-white py-3 ${
                currOption === "carRental" && !isCollapsed
                  ? "rounded-l-xl bg-white text-primary"
                  : ""
              } ${currOption !== "carRental" ? "text-white" : ""}`}
            >
              <ImFileText />
              <p
                className={`${
                  isCollapsed ? "w-0 hidden" : "ms-3"
                } font-old overflow-hidden text-base`}
              >
                Car Rental
              </p>
            </div>
          </Link> */}
          <Link to={"/settings"}>
            <div
              onClick={() => setCurrOption("settings")}
              className={`${
                isCollapsed && currOption === "settings"
                  ? "bg-white text-primary rounded-lg py-1 px-1"
                  : ""
              } cursor-pointer ${
                isCollapsed ? "mx-3 flex justify-center" : "ms-5 ps-1"
              } flex justify-start text-3xl items-center tet-white py-3 ${
                currOption === "settings" && !isCollapsed
                  ? "rounded-l-xl bg-white text-primary"
                  : ""
              } ${currOption !== "settings" ? "text-white" : ""}`}
            >
              <MdOutlineSettings />
              <p
                className={`${
                  isCollapsed ? "w-0" : "ms-3"
                } font-old overflow-hidden text-base`}
              >
                Settings
              </p>
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-center bg-white rounded-lg mx-2 py-2">
          <div className="py-2">
            <FaMoon className="text-2xl" />
          </div>
          <div
            className={`${
              isCollapsed ? "w-0 hidden" : "w-full"
            } text-center  animate-width py-2 text-sm text-white bg-secondary rounded px-12`}
          >
            Dark Mode
          </div>
          <div className={`py-2 text-sm ${isCollapsed ? "w-0 hidden" : ""}`}>
            Light Mode
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
