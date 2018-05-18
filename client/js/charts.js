(function() {
    const containerNames = [
        'per_bluecross_blueshield',
        'per_depofcorrections',
        'federal_state_local_va',
        'per_managedcare',
        'per_medicaid',
        'per_medicare',
        'per_miscpayment',
        'per_private',
        'per_selfpayment',
        'per_unknownpayment'
    ];

    // select element 9chartsFilters and adding eventListener to all the changes from the filter
    document.getElementById('9chartsFilter').addEventListener('change', e => {
        fetch('/hospitals')
            .then(res => res.json())
            .then(data => {
                console.log(data)

                // format retrieved data for google map DataTable
                const formatedValuesGroup = containerNames.map(item => {
                    return data.map(d => {
                        return [d[item], d[e.target.options[e.target.selectedIndex].value]];
                    });
                });

                // create chart for each groups
                formatedValuesGroup.forEach((variable, i) => {
                    createChart(containerNames[i] + "_chart", variable)
                });
            });
    });

    const createChart = (cls, val) => {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart.bind(null, cls, val));
    }

    function drawChart(container, value) {
        var data = new google.visualization.DataTable();
        
        data.addColumn('number', 'per_bluecross_blueshield');
        data.addColumn('number', 'Final');

        data.addRows(value)

        var options = {
            title: container.split('_').filter(w => w !== 'chart').join(' '),
            hAxis: {title: container, minValue: 0, maxValue: 100, gridlines: {color:'#A9A9A9'}, textStyle:{ fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}},
            vAxis: {title: value, minValue: 0, maxValue: 100, gridlines: {color:'#A9A9A9'}, textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}},
            legend: 'none',
            colors:['#ff4172'],
            tooltip: {
                textStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}},
            backgroundColor: {'fill':'transparent'},
            titleTextStyle: {fontName:'Raleway, sans-serif', fontSize: 12, color: '#323545'}
        };


        var chart = new google.visualization.ScatterChart(document.getElementById(container));

        chart.draw(data, options);
    }
})();
