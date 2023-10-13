import React, { useState } from "react";
import { useGetStudentsInsights } from "../../../api/hooks/useGetStudentsInsights";
import TableComponent from "../../../lib/Table/Table";
import DetailsModal from "./DetailsModal";

const DashboardScreen = () => {
  const { data, isLoading } = useGetStudentsInsights({ params: {} });
  const [showDetails, setShowDetails] = useState(null);

  const columns = [
    {
      title: "S No.",
      cellRender: (_, __, rowIndex) => {
        //   ("index", index);
        return rowIndex + 1;
      },
    },
    {
      title: "Name",
      key: "username",
    },
    {
      title: "Contact",
      key: "contact",
    },
    {
      title: "Details",
      key: "topics",
      cellStyle: "",
      cellRender: (data) => {
        return (
          <button
            onClick={() => setShowDetails(data)}
            style={{ float: "left" }}
            className="cursor-pointer whitespace-nowrap flex items-center rounded-xl border  p-1 px-2 mx-auto text-white bg-gray-600"
          >
            View
            <i className="fa-solid fa-eye ml-1"></i>
          </button>
        );
      },
    },
  ];
  return (
    <div className="mt-5">
      {" "}
      <TableComponent columns={columns} data={data} />{" "}
      {showDetails && (
        <DetailsModal
          onClose={() => setShowDetails(null)}
          contentMetaData={showDetails}
        />
      )}
    </div>
  );
};

export default DashboardScreen;
