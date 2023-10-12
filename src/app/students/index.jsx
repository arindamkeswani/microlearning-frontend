import React, { useState } from "react";
import cn from "clsx";
import { createRoutes } from "../../App";
import { routes } from "./routes";
import { Routes } from "react-router-dom";
import SideNavbar from "../shared/SideNavbar/SideNavbar";

const tabs = [
  {
    name: "Quick Learning",
    icon: "fa-lightbulb",
    route: "/quick-learning",
  },
  {
    name: "Courses",
    icon: "fa-layer-group",
    route: "/courses",
  },
  {
    name: "PW Store",
    icon: "fa-cart-shopping",
    route: "/pw-store",
  },
  {
    name: "Leaderboard",
    icon: "fa-chart-simple",
    route: "/leaderboard",
  },
];

const StudentHomeScreen = () => {
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <div className={cn("w-full gap-4 h-[calc(100vh-75px)] relative")}>
      <SideNavbar
        tabs={tabs}
        isCollapse={isCollapse}
        setIsCollapse={setIsCollapse}
      />
      <div
        className={cn(
          "h-full transition-all duration-300 scrollbar-none  absolute pb-3",
          {
            "left-[18%] sm:left-[10%] lg:left-[7%] w-[82%] sm:w-[90%] lg:w-[93%]":
              isCollapse,
            "left-[100%] sm:left-[25%] lg:left-[20%] w-[0%] sm:w-[75%] lg:w-[80%]":
              !isCollapse,
          }
        )}
      >
        <Routes>{createRoutes(routes)}</Routes>
      </div>
    </div>
  );
};

export default StudentHomeScreen;
