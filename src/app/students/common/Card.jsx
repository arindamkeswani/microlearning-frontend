import { Badge } from "flowbite-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import cn from "clsx";
import { CLOUDFRONT_BASE_URL } from "../../../axios";
import { useNavigate } from "react-router-dom";

const Card = ({ data, customClass = "" }) => {
  const { name, urls, price, discount, tags, rating, interest } = data;
  const navigate = useNavigate();
  return (
    <div
      className={twMerge(
        cn(
          `w-[16rem] rounded-lg overflow-hidden relative h-[26rem] border mb-4 ${customClass}`,
          {
            "w-[26rem] h-[34rem]": customClass !== "",
          }
        )
      )}
    >
      <div
        className={twMerge(
          cn("w-full h-[15rem]", {
            "mt-12": customClass !== "",
          })
        )}
      >
        <img
          src={`${CLOUDFRONT_BASE_URL + "/" + urls[0]}`}
          className="w-full h-full contain"
          alt="thumbnail"
          loading="lazy"
        />
      </div>
      {interest && (
        <div className="absolute z-10 left-0 top-0 h-12 w-12">
          <div
            className={twMerge(
              cn(
                "absolute transform rounded -rotate-45 bg-purple-500 text-center text-white font-semibold left-[-34px] top-[32px] w-[170px]",
                {
                  "bg-green-500": interest === "Strength",
                  "bg-yellow-400": interest === "Weakness",
                  hidden: customClass !== "",
                }
              )
            )}
          >
            {interest}
          </div>
        </div>
      )}
      <div className="px-3 py-2 flex flex-col justify-between">
        <div
          className={twMerge(
            cn("px-3 py-2 flex flex-col justify-between", {
              "absolute left-0 bottom-[4rem]": customClass !== "",
            })
          )}
        >
          <div className="text-sm mb-2 font-medium">{name}</div>
          <div className="flex flex-wrap gap-1">
            {tags.map((data) => (
              <Badge color="purple" key={data._id}>
                {data.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex justify-between absolute bottom-0 w-[93%]">
          <div className="flex mb-2 flex-col">
            <div>
              <span className="text-[#1b2124] text-base font-semibold">
                <i className="fa-solid fa-indian-rupee-sign text-sm"></i>{" "}
                {price}
              </span>
              {discount > 0 && (
                <span className="text-[#46b586] text-sm font-semibold ml-1">
                  ({discount}% OFF )
                </span>
              )}
            </div>
            {discount > 0 ? (
              <span className="text-[14px] text-gray-400 font-[400] line-through">
                <i className="fa-solid fa-indian-rupee-sign text-xs"></i>{" "}
                {parseInt(price + (price * discount) / 100)}
              </span>
            ) : (
              <span className="text-[14px] text-gray-400 font-[400] line-through invisible">
                0
              </span>
            )}
          </div>
          <span className="font-medium bg-[#46b586] text-xs h-fit px-2 py-.5 rounded text-white flex items-center gap-0.5">
            <i className="fa-solid fa-star "></i> {rating}
          </span>
        </div>
        {customClass !== "" && (
          <div
            onClick={() => navigate("/students/pw-store")}
            className="flex pl-3 text-sm font-semibold absolute bottom-[10rem] w-[93%] rounded text-white h-10 bg-purple-500 opacity-[0.75] items-center cursor-pointer"
          >
            See Product
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
