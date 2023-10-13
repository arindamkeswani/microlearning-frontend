import React from "react";
import { Table } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import NoDataFound from "../noDataFound/NoDataFound";
import Loader from "../Loader/Loader";

const TableComponent = ({ columns, data, isLoading = false }) => {
  return (
    <>
      <Table hoverable>
        <Table.Head>
          {columns.map((obj, i) => (
            <Table.HeadCell className={twMerge(obj.cellStyle)}>
              {obj.headRender ? obj.headRender() : obj.title}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y relative">
          {(data || []).length > 0 &&
            (data || [])?.map((rowData, rowIndex) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                {columns.map((obj, columnIndex) => (
                  <Table.Cell className={twMerge(obj.cellStyle)}>
                    {obj.cellRender
                      ? obj.cellRender(rowData[obj?.key], rowData, rowIndex)
                      : rowData[obj.key]}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      {(data || []).length === 0 && (
        <table className="table-fixed w-full h-full">
          <tbody>
            {data.length === 0 && (
              <tr className="flex justify-center items-center h-full">
                <td colSpan={columns?.length}>
                  {isLoading ? <Loader /> : <NoDataFound />}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TableComponent;
