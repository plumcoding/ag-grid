import {
    ChartCreated,
    ColDef,
    CreateRangeChartParams,
    FirstDataRenderedEvent,
    GridApi,
    createGrid,
    GridOptions,
} from '@ag-grid-community/core';
import { getData } from "./data";

const columnDefs: ColDef[] = [
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze', chartDataType: 'series' },
]

let gridApi: GridApi;

const gridOptions: GridOptions = {
    defaultColDef: {
        flex: 1,
    },
    columnDefs: columnDefs,
    rowData: getData(),
    onFirstDataRendered: onFirstDataRendered,
    popupParent: document.body,
    enableRangeSelection: true,
    enableCharts: true,
    chartToolPanelsDef: {
        defaultToolPanel: 'settings',
        settingsPanel: {
            chartGroupsDef: {
                pieGroup: [
                    'doughnut',
                    'pie',
                ],
                columnGroup: [
                    'stackedColumn',
                    'column',
                    'normalizedColumn'
                ],
                barGroup: [
                    'bar'
                ],
            }
        },
    },
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
    const createRangeChartParams: CreateRangeChartParams = {
        cellRange: {
            rowStartIndex: 0,
            rowEndIndex: 4,
            columns: ['country', 'gold', 'silver', 'bronze'],
        },
        chartType: 'groupedColumn',
    }

    params.api.createRangeChart(createRangeChartParams);
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    let gridDiv = document.querySelector<HTMLElement>('#myGrid')!
    gridApi = createGrid(gridDiv, gridOptions);
})
