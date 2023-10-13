import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import cn from "clsx";
import { twMerge } from "tailwind-merge";

const styles = {
  btn: "px-2.5 sm:px-6 py-2 sm:py-2.5 transition-colors duration-100",
  active: "!rounded-xl !bg-white !shadow-lg !text-primary",
};

function TabNavigator({ tabs, height }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || 0);

  return (
    <>
      <div
        className={twMerge(
          cn(`flex h-full flex-col w-full font-gilroy-bold my-2 `, {
            [`h-[calc(100%-${height}px)] top-[${height}px]`]: height,
          })
        )}
      >
        <div className="m-auto h-[70px]">
          <div className="bg-[#f2f5fd] text-[#888888] rounded-xl mx-auto px-3 sm:px-6 text-xs sm:text-sm justify-center py-2">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveTab(i);
                  setSearchParams({ tab: i, page: 1 }, { replace: true });
                }}
                className={`${styles.btn} ${
                  activeTab == i ? styles.active : ""
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full transition-all duration-200 h-[calc(100%-70px)] pt-5 ">
          {tabs[activeTab].component}
        </div>
      </div>
    </>
  );
}

export default TabNavigator;
