import {
  FirstDataRenderedEvent,
  GridApi,
  createGrid,
  GridOptions,
  IFiltersToolPanel,
} from '@ag-grid-community/core';

let gridApi: GridApi;

const gridOptions: GridOptions = {
  rowData: getRowData(),
  columnDefs: [
    {
      headerName: 'Set Filter Column',
      field: 'col1',
      filter: 'agSetColumnFilter',
      flex: 1,
      editable: true,
    },
  ],
  sideBar: 'filters',
  onFirstDataRendered: onFirstDataRendered,
}

function getRowData() {
  return [
    { col1: 'A' },
    { col1: 'A' },
    { col1: 'B' },
    { col1: 'B' },
    { col1: 'C' },
    { col1: 'C' },
  ]
}

function reset() {
  gridApi!.setFilterModel(null);
  gridApi!.setRowData(getRowData());
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  params.api.getToolPanelInstance('filters')!.expandFilters();
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);
})
