import React, { useMemo } from "react";
import TableComponent from "../../../lib/Table/Table";
import { useGetTopicInsights } from "../../../api/hooks/useGetTopicInsights";

const TopicInsights = () => {
  const { data, isLoading } = useGetTopicInsights({ params: {} });

  const tableData = useMemo(() => {
    return Object.values(data);
  }, [data]);

  const columns = [
    {
      title: "S No.",
      cellRender: (_, __, rowIndex) => {
        return rowIndex + 1;
      },
    },
    {
      title: "Topic",
      key: "name",
    },
    {
      title: "Avg. Attention (%)",
      key: "attention",
      cellStyle: "text-center",
    },
    {
      title: "No. Of Attempts",
      key: "totalAttempted",
      cellStyle: "text-center",
    },
    {
      title: "No. Of Correct Attempts",
      cellStyle: "text-center",
      key: "correctAns",
    },
  ];

  return (
    <TableComponent columns={columns} data={tableData} isLoading={isLoading} />
  );
};

export default TopicInsights;
