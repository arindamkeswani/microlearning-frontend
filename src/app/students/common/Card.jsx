import { Badge } from "flowbite-react";
import React from "react";

const Card = ({ data }) => {
  const { name, description, urls, price, discount, tags, rating } = data;

  return (
    <div className="w-[16rem] rounded-lg overflow-hidden relative h-[26rem] border mb-4">
      <div className="w-full h-[15rem]">
        <img
          src={urls[0]}
          className="w-full h-full contain"
          alt="thumbnail"
          loading="lazy"
        />
      </div>
      <div className="px-3 py-2 flex flex-col justify-between">
        <div className="text-sm mb-2 font-medium">{name}</div>
        <div className="flex flex-wrap gap-1">
          {tags.map((data) => (
            <Badge color="purple" key={data._id}>
              {data.name}
            </Badge>
            // <span
            //   key={data._id}
            //   className={`inline-block bg-[#5664ff] text-white text-xs px-2 py-[2px] rounded`}
            // >
            //   {data.name}
            // </span>
          ))}
        </div>
        <div className="flex justify-between absolute bottom-0 w-[93%]">
          <div className="flex mb-2 flex-col">
            <div>
              <span className="text-[#1b2124] text-base font-semibold">
                ${price}
              </span>
              {discount > 0 && (
                <span className="text-[#46b586] text-sm font-semibold ml-1">
                  ({discount}% OFF )
                </span>
              )}
            </div>
            {discount > 0 ? (
              <span className="text-[14px] text-gray-400 font-[400] line-through">
                {price + (price * discount) / 100}
              </span>
            ) : (
              <span className="text-[14px] text-gray-400 font-[400] line-through invisible">
                0
              </span>
            )}
          </div>
          <span className="text-sm font-medium bg-[#46b586] h-fit px-2 rounded text-white flex items-center gap-0.5">
            <i className="fa-solid fa-star text-xs"></i> {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
