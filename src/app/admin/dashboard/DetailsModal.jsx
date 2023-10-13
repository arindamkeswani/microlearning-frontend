import { Modal, Tooltip } from "flowbite-react";
import { useMemo } from "react";
import TableComponent from "../../../lib/Table/Table";

const DetailsModal = ({ onClose, contentMetaData, refetchContentList }) => {
  const detailsData = useMemo(() => {
    function mergeData(tag) {
      const interest = contentMetaData?.interests?.find(
        (i) => i?.tag?._id === tag?._id
      ) || { attention: null };
      const strength = contentMetaData?.strengths?.find(
        (s) => s?.tag?._id === tag?._id
      ) || { correct: null, incorrect: null };
      const weakness = contentMetaData?.weaknesses?.find(
        (w) => w?.tag?._id === tag?._id
      ) || { correct: null, incorrect: null };

      return {
        tag: tag,
        strength: strength,
        interests: interest,
        weaknesses: weakness,
      };
    }

    // Create a map of unique tags
    const tagMap = new Map();

    [
      contentMetaData.interests,
      contentMetaData.strengths,
      contentMetaData.weaknesses,
    ]
      .flat()
      .forEach((r) => {
        tagMap.set(r?.tag?._id, r?.tag);
      });

    // Create the final result array
    return Array.from(tagMap?.values()).map((tag) => mergeData(tag));
  }, [contentMetaData]);

  const filteredDetailsData = (detailsData || []).filter((data) => !!data?.tag);

  const columns = [
    {
      title: "S No.",
      cellRender: (_, __, rowIndex) => {
        return rowIndex + 1;
      },
    },
    {
      title: "Name",
      key: "tag",
      cellRender: (data, __, rowIndex) => data?.name,
    },
    {
      title: "Interest (%)",
      key: "interests",
      headRender: () => {
        return (
          <div className="flex items-center gap-2 whitespace-pre m-auto">
            Interest (%)
            <Tooltip
              content={`The average % of watch-time that \n a student has spent on \n content marked with this tag`}
              style="dark"
              placement="right"
              className=" text-xs "
            >
              <button>
                <i className="fa-solid fa-circle-info text-sm"></i>
              </button>
            </Tooltip>
          </div>
        );
      },
      cellRender: (data, __, rowIndex) => data?.attention || "-",
    },
    {
      title: "Strength (Correct / Attempted)",
      key: "strength",
      cellStyle: "text-center",
      cellRender: (data, __, rowIndex) =>
        !!data?.correct || !!data?.incorrect
          ? `${data?.correct} / ${data?.correct + data?.incorrect}`
          : "-",
    },
    {
      title: "Weaknesses (Incorrect / Attempted)",
      key: "weaknesses",
      cellStyle: "text-center",
      cellRender: (data, __, rowIndex) =>
        !!data?.correct || !!data?.incorrect
          ? `${data?.incorrect} / ${data?.incorrect + data?.incorrect}`
          : "-",
    },
  ];
  return (
    <Modal
      size="6xl"
      dismissible={"true"}
      root={document.body}
      show
      placement="center"
      onClose={onClose}
      className="orign-center transition-transform duration-200"
    >
      <Modal.Header>Add Content</Modal.Header>
      <Modal.Body className="p-4 max-h-[65vh]">
        <TableComponent columns={columns} data={filteredDetailsData} />{" "}
      </Modal.Body>
    </Modal>
  );
};

export default DetailsModal;
