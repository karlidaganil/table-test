import "./App.scss";
import GdlTableCheckbox from "./GdlTableCheckbox";

import { useCallback, useMemo, useRef, useState } from "react";

import settingsIcon from "./assets/settings.svg";
import editIcon from "./assets/edit.svg";
import trashIcon from "./assets/trash.svg";
import arrowIcon from "./assets/arrow.svg";

const data = [
  {
    platform: "BLMG",
    type: "Spot",
    action: "New",
    deal: "Josh buys 1 000 000 022",
    tradeDate: "21/09/2022",
    reference: "Folder : TRDFX Broker: BLMG Purpose: TRD",
    status: "Warning Lorem ipsum Warning Lorem ipsum Warning Lorem ipsum",
  },
  {
    platform: "BLMG",
    type: "Spot",
    action: "New",
    deal: "Josh buys 1 000 000 022",
    tradeDate: "21/09/2022",
    reference: "X Broker: BLMG Purpose: TRD Folder",
    status:
      "Warning Lorem ipsum   Warning Lorem ipsum Warning Lorem ipsum Warning Lorem ipsum Warning Lorem ipsum Warning Lorem ipsum Warning Lorem ipsum   Warning Lorem ipsum Warning Lorem ipsum",
  },
  {
    platform: "BLMG",
    type: "Spot",
    action: "New",
    deal: "Josh buys 1 000 000 022",
    tradeDate: "21/09/2022",
    reference: "Folder : TRDFX Broker: BLMG Purpose: TRD",
    status: "Warning Lorem ipsum Warning Lorem ipsum Warning Lorem ipsum",
  },
];

function App() {
  const [selectedRows, setSelectedRows] = useState([]);

  console.log(selectedRows);

  const columns = useMemo(() => [
    // {
    //   accessor: "checkbox",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllRowsSelected()}
    //       onChange={table.getToggleAllRowsSelectedHandler()}
    //     ></Checkbox>
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onChange={row.getToggleSelectedHandler()}
    //     ></Checkbox>
    //   ),
    // },

    {
      accessor: "move",
      header: "",
      cell: () => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={arrowIcon}
            width={16}
            onClick={(e) => {
              e.stopPropagation();
              console.log("up");
            }}
          />
          <img
            src={arrowIcon}
            width={16}
            className="rotate-90"
            onClick={(e) => {
              e.stopPropagation();
              console.log("down");
            }}
          />
        </div>
      ),
      showOnRowHover: true,
    },
    {
      accessor: "platform",
      header: "Platform",
    },
    {
      accessor: "type",
      header: "Type",
    },
    {
      accessor: "action",
      header: "Action",
    },
    {
      accessor: "deal",
      header: "Deal",
    },
    {
      accessor: "tradeDate",
      header: "Trade Date",
    },
    {
      accessor: "reference",
      header: "Reference",
      // className: "reference-column",
      // style: {
      //   backgroundColor: "#EAF7EE",
      // },
    },
    {
      accessor: "status",
      header: "Status",
      // style: {
      //   backgroundColor: "#EBF4FF",
      // },
    },
    {
      header: <img src={settingsIcon} />,
      accessor: "actions",
      cell: () => (
        <div
          style={{
            display: "flex",
          }}
        >
          <img
            src={editIcon}
            width={24}
            style={{
              marginRight: "10px",
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("edit");
            }}
          />
          <img
            src={trashIcon}
            width={24}
            onClick={(e) => {
              e.stopPropagation();
              console.log("trash");
            }}
          />
        </div>
      ),
      showOnRowHover: true,
    },
  ]);

  console.log("render");

  return (
    <div
      style={{
        width: "100%",
        padding: "50px",
      }}
    >
      <GdlTableCheckbox
        data={data}
        columns={columns}
        setSelectedRows={setSelectedRows}
        checkboxed={false}
        rowHoverStyle={{
          background: false,
          border: true,
        }}
        // onRowClick={(row) => {
        //   console.log(row);
        // }}
        selectedNode={
          <>
            <span className="mr">{selectedRows.length} rows selected</span>
            <button className="mr">send</button>
            <button className="mr">ignore</button>
            <button>edit</button>
          </>
        }
      />

      <img
        src={arrowIcon}
        width={16}
        className="rotate-90"
        onClick={(e) => {
          e.stopPropagation();
          console.log("asdasd");
        }}
      />
    </div>
  );
}

export default App;
