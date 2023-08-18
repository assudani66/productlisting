import { useState, useEffect, useRef, useCallback } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { useAuth } from "../../store/authContext";
import {
  deleteProduct,
  getProductInfo,
  updateInfoService,
} from "../../services/product.services";
import BtnCellRenderer from "../../libs/BtnCellRenderer";
import ProductForm from "./AddItemComponent";
import { Container } from "@mui/material";

const MyGridComponent = () => {
  const { token } = useAuth();
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();

  const getProductInfoFromServer = async () => {
    const data = await getProductInfo();
    setRowData(data.data);
  };

  const onBtExport = useCallback(() => {
    console.log(gridRef.current.api.exportDataAsCsv());
    gridRef.current.api.getDataAsCsv();
  }, []);

  async function updateDeleted(id) {
    const rowData = gridOptions.api.rowModel.rowsToDisplay;
    await deleteProduct(id, token);
    const updatedRowData = rowData
      .filter((row) => row.data.id !== id)
      .map((row) => row.data);
    gridOptions.api.setRowData(updatedRowData);
  }
  useEffect(() => {
    getProductInfoFromServer();
  }, []);

  const gridOptions = {
    columnDefs: [
      { headerName: "ID", field: "id", filter: "agNumberColumnFilter" },
      { headerName: "Name", field: "name", editable: true },
      {
        headerName: "Description",
        field: "description",
        editable: true,
      },
      {
        headerName: "imageURL",
        field: "image_url",
        editable: true,
      },
      {
        headerName: "Price",
        field: "price",
        editable: true,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "StockQuantity",
        field: "stock_quantity",
        editable: true,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Button Col 2",
        cellRenderer: BtnCellRenderer,
        onCellClicked: (event) => {
          updateDeleted(event.data.id);
        },
      },
    ],

    onCellValueChanged: async (event) => {
      const changedColumn = event.column.colId;
      const id = event.data.id;
      const updatedInfo = event.data[changedColumn];
      await updateInfoService(id, changedColumn, updatedInfo, token);
    },
  };

  return (
    <Container>
      <div>
        <ProductForm />
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: 1400 }}>
        <AgGridReact
          ref={gridRef}
          gridOptions={gridOptions}
          rowData={rowData}
          onCellValueChanged={gridOptions.onCellValueChanged}
        />
      </div>
      <button onClick={() => onBtExport()} style={{ color: "white" }}>
        Export .csv
      </button>
    </Container>
  );
};

export default MyGridComponent;
