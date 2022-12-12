import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import React, { useEffect } from "react";

import { Checkbox } from "antd";

import classNames from "classnames";

const columnHelper = createColumnHelper();

const checkboxObj = [
  {
    accessor: "checkbox",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      ></Checkbox>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      ></Checkbox>
    ),
  },
];

const GdlTableCheckbox = ({
  data,
  columns,
  checkboxed,
  setSelectedRows,
  checkedActionsBar,
  onRowClick = () => {},
  rowHoverStyle,
}) => {
  const $columns = checkboxed ? [...checkboxObj, ...columns] : columns;

  const table = useReactTable({
    data,
    columns: $columns.map((column) =>
      columnHelper.accessor(column.accessor, Object.assign({}, column))
    ),
    getCoreRowModel: getCoreRowModel(),
  });

  const { getHeaderGroups, getRowModel, getSelectedRowModel } = table;

  const checkedRows = JSON.stringify(
    getSelectedRowModel().rows.map((item) => item.original)
  );

  useEffect(() => {
    const $checkedRows = JSON.parse(checkedRows);
    setSelectedRows($checkedRows);
  }, [checkedRows]);

  const isAnyRowSelected = getSelectedRowModel().rows.length > 0;

  return (
    <>
      {isAnyRowSelected && (
        <div className="action-bar">
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          ></Checkbox>
          {checkedActionsBar}
        </div>
      )}
      <table>
        {!isAnyRowSelected && (
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={classNames({
                      "left-corner": index === 0,
                      "right-corner": index === headerGroup.headers.length - 1,
                      [header.column.columnDef.className]:
                        header.column.columnDef.className !== undefined,
                    })}
                    style={header.column.columnDef.style}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={classNames({
                "no-hover-bg": !rowHoverStyle.background,
                "no-hover-border": !rowHoverStyle.border,
              })}
              onClick={() => onRowClick(row)}
            >
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id}
                  className={classNames({
                    "left-corner": index === 0,
                    "right-corner": index === row.getVisibleCells().length - 1,
                    [cell.column.columnDef.className]:
                      cell.column.columnDef.className !== undefined,
                    "show-on-hover": cell.column.columnDef.showOnRowHover,
                  })}
                  style={cell.column.columnDef.style}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default GdlTableCheckbox;
