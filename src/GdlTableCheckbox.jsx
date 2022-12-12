import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import React, { useEffect } from "react";

import { Checkbox } from "antd";

const columnHelper = createColumnHelper();

const checkboxes = [
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
  selectedNode,
  rowHoverStyle,
}) => {
  const $columns = columns.map((column) => {
    const obj = {};
    obj.id = column.accessor;
    obj.header = column.header;
    if (column.cell) {
      obj.cell = column.cell;
    }
    return columnHelper.accessor(column.accessor, obj);
  });

  const $columnsCheckbox = [...checkboxes, ...columns].map((column) => {
    const obj = {};
    obj.id = column.accessor;
    obj.header = column.header;
    if (column.cell) {
      obj.cell = column.cell;
    }
    return columnHelper.accessor(column.accessor, obj);
  });

  const table = useReactTable({
    data,
    columns: checkboxed ? $columnsCheckbox : $columns,
    getCoreRowModel: getCoreRowModel(),
    // getCoreRowModel: getCoreRowModel({
    //   selectedRows,
    //   setSelectedRows: (rows) => {
    //     console.log(rows);
    //   },
    // }),
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

  console.log(getSelectedRowModel());

  const rowHoverClassNames = `${
    !rowHoverStyle.background ? "no-hover-bg" : ""
  } ${!rowHoverStyle.border ? "no-hover-border" : ""}`;

  return (
    <>
      {isAnyRowSelected && (
        <div className="action-bar">
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          ></Checkbox>
          {selectedNode}
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
                    className={`${index === 0 ? "left-corner" : ""}  ${
                      index === headerGroup.headers.length - 1
                        ? "right-corner"
                        : ""
                    }`}
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
            <tr key={row.id} className={rowHoverClassNames}>
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id}
                  className={`${index === 0 ? "left-corner" : ""}  ${
                    index === row.getVisibleCells().length - 1
                      ? "right-corner"
                      : ""
                  }`}
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
