import React from "react";
import { Link } from "react-router-dom";
import cn from "clsx";
import s from "./SideNavbar.module.css";

export const TabTypes = Object.freeze({
  Tab: "tab",
  SubTab: "subtab",
});

const Tab = ({
  url,
  active,
  collapse,
  clickHandler,
  icon,
  title,
  type,
  id,
  count,
}) => {
  return (
    <Link
      to={url}
      className={cn(
        {
          [s.tab]: type === TabTypes.Tab,
          [s.activeSubTab]: type === TabTypes.SubTab && active,
          [s.activeTab]: type === TabTypes.Tab && active,
          "justify-center": collapse,
        },
        "relative"
      )}
      onClick={clickHandler}
      {...(id && { id: id })}
    >
      {icon && (
        <i
          className={cn(`fa-solid ${icon} text-sm sm:text-base lg:text-xl`, {
            "text-white": active,
            "text-primary": !active,
          })}
        ></i>
      )}
      {title && !collapse && (
        <span>
          <span>{title}</span>
          {/* {count ? (
            !collapse ? (
              <span
                className={cn(
                  "!rounded-[50%] absolute right-0 flex justify-center items-center h-4 w-4 !text-[9px]",
                  {
                    "text-primary bg-white": type === TabTypes.Tab && active,
                    "bg-primary text-white":
                      (type === TabTypes.Tab && !active) ||
                      type === TabTypes.SubTab,
                    "top-0": type === TabTypes.SubTab,
                    "top-[11px] right-1.5": type === TabTypes.Tab && active,
                    "top-0 right-2": type === TabTypes.Tab && !active,
                  }
                )}
              >
                {count}
              </span>
            ) : (
              <>
                <span
                  className={cn("w-3 h-3 rounded-[50%] absolute left-0", {
                    "bg-white": type === TabTypes.Tab && active,
                    "bg-primary": type === TabTypes.Tab && !active,
                  })}
                ></span>
              </>
            )
          ) : (
            ""
          )} */}
        </span>
      )}
    </Link>
  );
};

export default Tab;
