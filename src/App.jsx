import "./App.scss";
import GdlTableCheckbox from "./GdlTableCheckbox";

import { useCallback, useMemo, useRef, useState } from "react";

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
    reference:
      "Folder : TRDFX Broker: BLMG Purpose: TRD Folder : TRDFX Broker: BLMG Purpose: TRD Folder : TRDFX Broker: BLMG Purpose: TRD Folder : TRDFX Broker: BLMG Purpose: TRD",
    status: "Warning Lorem ipsum Warning Lorem ipsum Warning Lorem ipsum",
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
    },
    {
      accessor: "status",
      header: "Status",
    },
  ]);

  return (
    <div
      style={{
        width: "60%",
        padding: "50px",
      }}
    >
      <GdlTableCheckbox
        data={data}
        columns={columns}
        setSelectedRows={setSelectedRows}
        checkboxed={false}
        selectedNode={
          <>
            <span className="mr">{selectedRows.length} rows selected</span>
            <button className="mr">send</button>
            <button className="mr">ignore</button>
            <button>edit</button>
          </>
        }
      />
      {/* <div className="test-box">test</div>
      <div className="test-box">test</div>
      <div className="test-box">test</div> */}
    </div>
  );
}

export default App;
