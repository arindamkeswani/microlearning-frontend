import React, { useState } from "react";
import { useGetProducts } from "../../../api/hooks/useGetProducts";
import Card from "../../students/common/Card";
import Loader from "../../../lib/Loader/Loader";
import NoDataFound from "../../../lib/noDataFound/NoDataFound";
import AddItemModal from "../../shared/AddItemModal";

const PwStoreScreen = () => {
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const {
    data: { data },
    isLoading,
  } = useGetProducts({
    params: {
      type: "store",
      page: 1,
      limit: 20,
    },
    route: "/items",
  });

  return (
    <div className="p-7 h-full">
      <div className="flex flex-col gap-5 h-full">
        <div className="flex justify-between items-center pr-8">
          <h2 className="text-2xl ">Products</h2>
          <i
            className="fa-solid fa-square-plus text-2xl cursor-pointer"
            onClick={() => setShowAddItemModal(true)}
          ></i>
        </div>

        <div className="w-full h-[calc(100%-40px)] overflow-auto">
          {/* <TableComponent columns={[]} data={data} /> */}
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
      {showAddItemModal && (
        <AddItemModal
          onClose={() => setShowAddItemModal(false)}
          metaData={{ type: "Product", key: "store" }}
        />
      )}
    </div>
  );
};

export default PwStoreScreen;
