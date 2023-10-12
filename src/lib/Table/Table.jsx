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

        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <p>Microsoft Surface Pro</p>
          </Table.Cell>
          <Table.Cell>White</Table.Cell>
          <Table.Cell>Laptop PC</Table.Cell>
          <Table.Cell>$1999</Table.Cell>
          <Table.Cell>
            <a
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              href="/tables"
            >
              <p>Edit</p>
            </a>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default TableComponent;
