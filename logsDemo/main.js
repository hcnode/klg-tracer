var columnDefs = [
    // group cell renderer needed for expand / collapse icons
    {field: 'name', cellRenderer: 'agGroupCellRenderer'},
    {field: 'status'},
    {field: 'duration'},
    {field: 'time', valueFormatter: "new Date(x)"}
];

var gridOptions = {
    columnDefs: columnDefs,
    masterDetail: true,
    detailCellRendererParams: {
        detailGridOptions: {
            columnDefs: [
                {field: 'name'},
                {field: 'time', valueFormatter: "new Date(x)"},
                {field: 'duration'},
                {field: 'tags'}
            ],
            onFirstDataRendered(params) {
                params.api.sizeColumnsToFit();
            }
        },
        getDetailRowData: function (params) {
            params.successCallback(params.data.spans);
        }
    },
    onGridReady: function (params) {
        // arbitrarily expand a row for presentational purposes
        // setTimeout(function () {
        //     var rowCount = 0;
        //     params.api.forEachNode(function (node) {
        //         node.setExpanded(rowCount++ === 1);
        //     });
        // }, 500);
    },
    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    agGrid.simpleHttpRequest({url: 'http://localhost:3001/data'}).then(function (data) {
        gridOptions.api.setRowData(data);
    });
});