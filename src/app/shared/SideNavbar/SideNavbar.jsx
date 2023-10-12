import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Tab, { TabTypes } from "./Tab";
import cn from "clsx";

const SideNavbar = ({ isCollapse, setIsCollapse, tabs = [] }) => {
  const location = useLocation();

  let tabsIcon = [
    "fa-chart-simple",
    "fa-users",
    "fa-list-check",
    "fa-thumbs-up",
  ];

  const [activeTab, setActiveTab] = useState(0);

  const getUrlKey = useCallback((key) => {
    return key.split(" ").join("-").toLowerCase();
  }, []);

  useEffect(() => {
    const pathEntities = location.pathname.split("/");
    for (let i = 0; i < tabs?.length; i++) {
      const tab = tabs[i];
      if (getUrlKey(tab.name) === pathEntities[2]) {
        setActiveTab(i);
      }
    }
  }, [getUrlKey, setActiveTab, tabs]);

  return (
    <div
      className={cn(
        `transition-all duration-300 bg-[#e6e6e6] py-9 px-3 sm:px-3.5 xl:px-4 fixed left-0 h-full z-10`,
        {
          "w-[18%] sm:w-[10%] lg:w-[7%]": isCollapse,
          "w-[100%] sm:w-[25%] lg:w-[20%]": !isCollapse,
        }
      )}
    >
      <div
        className={cn("flex w-full justify-center flex-col gap-7", {
          "overflow-hidden": isCollapse,
        })}
      >
        {tabs?.map((tab, i) => {
          const tabUrl = getUrlKey(tab.name);
          return (
            <div className="flex flex-col" key={tab.name}>
              <div className="flex justify-center w-full">
                <Tab
                  url={tabUrl}
                  type={TabTypes.Tab}
                  active={activeTab === i}
                  collapse={isCollapse}
                  clickHandler={() => {
                    setActiveTab(i);
                    setIsCollapse(false);
                  }}
                  icon={tab.icon}
                  title={tab.name}
                />
              </div>
              {/* {tab.subTabs.length > 0 && (
                <ul
                  className={`${
                    activeTab === i && !isCollapse
                      ? "scale-1 max-h-32 px-3 md:px-5.5 lg:px-[26px] py-4 mt-5"
                      : "scale-0 h-0"
                  } flex scroll-smooth flex-col origin-top transition-all duration-[450ms] text-xs lg:text-sm font-gilroy-medium  gap-3 lg:gap-4 overflow-auto scrollbar-thin scrollbar-h-10 scrollbar-w-1 scrollbar-thumb-slate-100 scrollbar-track-rounded-lg scrollbar-thumb-rounded-full scrollbar-track-[#6a6a6a]`}
                >
                  {tab.subTabs.map((subTab, index) => {
                    return (
                      <Tab
                        url={`${tabUrl}/${getUrlKey(subTab.name)}?tab=0&page=1`}
                        key={subTab.name}
                        type={TabTypes.SubTab}
                        id={activeSubTab === index ? "active" : ""}
                        clickHandler={() => {
                          if (window.innerWidth < 640) {
                            setIsCollapse(true);
                          }
                          setActiveSubTab(index);
                        }}
                        count={subTab.count}
                        active={activeSubTab === index}
                        title={subTab.name}
                      />
                    );
                  })}
                </ul>
              )} */}
            </div>
          );
        })}
      </div>
      <div
        className={cn(`absolute top-20 right-[-0.65rem] cursor-pointer group`, {
          "top-[0.6rem] right-7": window.innerWidth < 640 && !isCollapse,
        })}
        onClick={() => setIsCollapse(!isCollapse)}
      >
        <button className="bg-[#414bb2] relative text-white rounded-full flex justify-center items-center text-xs px-1.5 py-1">
          <i
            className={cn(
              `transition-all duration-300 fa-solid fa-chevron-right`,
              {
                "rotate-180": !isCollapse,
              }
            )}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
