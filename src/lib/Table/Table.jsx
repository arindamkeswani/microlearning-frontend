import React from "react";
import { Table } from "flowbite-react";
import { twMerge } from "tailwind-merge";

const TableComponent = ({ columns, data }) => {
  return (
    <Table hoverable>
      <Table.Head>
        {columns.map((obj, i) => (
          <Table.HeadCell className={twMerge(obj.cellStyle)}>
            {obj.headRender ? obj.headRender() : obj.title}
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {data?.map((rowData, i) => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            {columns.map((obj, i) => (
              <Table.Cell className={twMerge(obj.cellStyle)}>
                {obj.cellRender ? obj.cellRender() : rowData[obj.key]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableComponent;
