Highcharts.chart('collected-rev', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Collected Revenue'
    },
    subtitle: {
        text: null
    },
    xAxis: {
        type: 'category',
        labels: {
            autoRotation: [-45, -90],
            style: {
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Collected Revenue'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Collected Revenue: <b>KES {point.y:,.2f}</b>'
    },
    series: [{
        name: 'Population',
        colors: [
            '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
            '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
            '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
            '#03c69b',  '#00f194'
        ],
        colorByPoint: true,
        groupPadding: 0,
        data: [
            ['Trade, Industry, Tourism, Co-operative Development And Markerting', 3733],
            ['Housing And Urban Development', 3118],
            ['Lands And Physical Planning', 2779],
            ['Agriculture And Livestock', 2223],
            ['Roads, Public Works, Transport And Infrastructure', 2191],
            ['Blue Economy, Fisheries, Mining And Digital Economy', 2174],
            ['Water, Irrigation, Sanitation, Environment, Energy, Forestry And Climate Change', 2132],
            ['Governance And Administration', 2089],
            ['Finance And Economic Planning', 2067],
            ['Youth, Sports, Talent Development And Social Services', 1911],
            ['Education, Human Capital Development And Vocational Training', 1645],
            ['Health And Medical Services', 1638],
           
        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:,.0f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
