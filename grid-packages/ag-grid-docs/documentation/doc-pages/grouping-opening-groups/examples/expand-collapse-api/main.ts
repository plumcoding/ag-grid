import { GridApi, createGrid, GridOptions } from '@ag-grid-community/core';
import { getData } from "./data";

let gridApi: GridApi;

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    resizable: true,
  },
  rowData: getData(),
}

function expandAll() {
  gridApi!.expandAll()
}

function collapseAll() {
  gridApi!.collapseAll()
}

function expandCountries() {
  gridApi!.forEachNode(node => {
    if (node.level === 0) {
      gridApi!.setRowNodeExpanded(node, true);
    }
  });
}

function expandAustralia2000() {
  gridApi!.forEachNode(node => {
    if (node.key === '2000' && node.parent && node.parent.key === 'Australia') {
      gridApi!.setRowNodeExpanded(node, true, true);
    }
  });
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);
})
