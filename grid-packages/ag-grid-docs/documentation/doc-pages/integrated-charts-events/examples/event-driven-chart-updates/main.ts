import {
  ChartCreated, ChartRangeSelectionChanged,
  ColDef, createGrid, CreateRangeChartParams, FirstDataRenderedEvent, GridApi, GridOptions
} from '@ag-grid-community/core';

const columnDefs: ColDef[] = [
  { field: 'Month', width: 150, chartDataType: 'category' },
  { field: 'Sunshine (hours)', chartDataType: 'series' },
  { field: 'Rainfall (mm)', chartDataType: 'series' },
]

let gridApi: GridApi;

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  popupParent: document.body,
  columnDefs: columnDefs,
  enableRangeSelection: true,
  enableCharts: true,
  chartThemeOverrides: {
    common: {
      title: { enabled: true, text: 'Monthly Weather' },
      subtitle: { enabled: true },
      legend: { enabled: true }
    },
  },
  onFirstDataRendered: onFirstDataRendered,
  onChartCreated: onChartCreated,
  onChartRangeSelectionChanged: onChartRangeSelectionChanged,
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  const createRangeChartParams: CreateRangeChartParams = {
    cellRange: {
      rowStartIndex: 0,
      rowEndIndex: 5,
      columns: ['Month', 'Sunshine (hours)'],
    },
    chartType: 'stackedColumn',
    chartContainer: document.querySelector('#myChart') as any,
  }

  params.api.createRangeChart(createRangeChartParams);
}

function onChartCreated(event: ChartCreated) {
  console.log('Created chart with ID ' + event.chartId);
  updateTitle(gridApi!, event.chartId);
}

function onChartRangeSelectionChanged(event: ChartRangeSelectionChanged) {
  console.log('Changed range selection of chart with ID ' + event.chartId);
  updateTitle(gridApi!, event.chartId);
}

function updateTitle(api: GridApi, chartId: string) {
  const cellRange = api.getCellRanges()![1];
  if (!cellRange) return;
  const columnCount = cellRange.columns.length;
  const rowCount = cellRange.endRow!.rowIndex - cellRange.startRow!.rowIndex + 1;
  const subtitle = `Using series data from ${columnCount} column(s) and ${rowCount} row(s)`;

  api!.updateChart({
    type: 'rangeChartUpdate',
    chartId: chartId,
    chartThemeOverrides: {
      common: {
        subtitle: { text: subtitle },
      },
    },
  });
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/weather-se-england.json')
    .then(response => response.json())
    .then(function (data) {
      gridApi!.setRowData(data)
    })
})
