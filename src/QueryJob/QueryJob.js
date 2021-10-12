import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import BtnCellRenderer  from "./BtnCellRenderer.jsx";

class QueryJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
       
        {
          field: "jobName",
          maxWidth: 90
        },
        {
          field: "Part",
          minWidth: 150
        }, {
          field: "Log",
          cellRenderer: "btnCellRenderer",
          cellRendererParams: {
            clicked: function(field) {
              alert(`${field} was clicked`);
            }
          },
          minWidth: 150
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100
      },
      frameworkComponents: {
        btnCellRenderer: BtnCellRenderer
      },
      rowData: []
    };
  }
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  onQuery = event => {

  }
  render() {
    const rowData = [
      { jobName: "Toyota", part: "Celica", price: 35000 },
      { jobName: "Ford", part: "Mondeo", price: 32000 },
      { jobName: "Porsche", part: "Boxter", price: 72000 }
    ];
    return (
      <div><TextField name="part6" id="recipe-name-input" label="Part 6" variant="standard" />
        <Button variant="contained" onClick={this.onQuery}>Query</Button>
        <div
          id="myGrid"
          style={{
            height: "100vh",
            width: "95vw"
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            frameworkComponents={this.state.frameworkComponents}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}
export default QueryJob;
