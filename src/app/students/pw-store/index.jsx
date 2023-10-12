import React from "react";
import { useGetProducts } from "../../../api/hooks/useGetProducts";
import Loader from "../../../lib/Loader/Loader";
import NoDataFound from "../../../lib/noDataFound/NoDataFound";
import Card from "../common/Card";

const PWStoreScreen = () => {
  const {
    data: { data },
    isLoading,
  } = useGetProducts({
    params: {
      type: "store",
      page: 1,
      limit: 20,
    },
  });
  return (
    <div>
      <div className="mx-3 my-5">
        <h3 className="font-medium text-2xl px-4 text-gray-600 mb-2 underline">
          Recommended
        </h3>
        <div className="container mx-auto p-4 flex gap-2 flex-wrap">
          {isLoading ? (
            <Loader />
          ) : data && data?.length > 0 ? (
            data?.map((data) => <Card data={data} key={data._id} />)
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
      <div className="mx-3 ">
        <h3 className="font-medium text-2xl px-4 text-gray-600 mb-2 underline">
          All Items
        </h3>
        <div className="container mx-auto p-4 flex gap-2 flex-wrap">
          {isLoading ? (
            <Loader />
          ) : data && data?.length > 0 ? (
            data?.map((data) => <Card data={data} key={data._id} />)
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default PWStoreScreen;
