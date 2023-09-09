Highcharts.chart('collected-rev', {
    chart: {
        type: 'column'
    },
    title: {
        text: null
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
            text: 'Amount (KES)'
        }
    },
    legend: {
        enabled: true
    },
    tooltip: {
        shared: true, // Enable shared tooltip
        headerFormat: '<span class="fw-semibold text-uppercase pb-3" style="font-size: 12px">{point.key}</span><br/>',
        pointFormat: '{series.name}: <b>KES {point.y:,.2f}</b> <br/>'
    },
    series: [
        {
            name: 'Collected Revenue',
            data: [
                {
                    name: 'Trade, Industry, Tourism, Co-operative Development And Marketing',
                    y: 3733,
                    drilldown: 'trade'
                },
                {
                    name: 'Housing And Urban Development',
                    y: 3118,
                    drilldown: 'housing'
                },
                {
                    name: 'Lands And Physical Planning',
                    y: 2779,
                    drilldown: 'lands'
                },
                {
                    name: 'Agriculture And Livestock',
                    y: 2223,
                    drilldown: 'agriculture'
                },
                {
                    name: 'Roads, Public Works, Transport And Infrastructure',
                    y: 2191,
                    drilldown: 'roads'
                },
                {
                    name: 'Blue Economy, Fisheries, Mining And Digital Economy',
                    y: 2174,
                    drilldown: 'blue-economy'
                },
                {
                    name: 'Water, Irrigation, Sanitation, Environment, Energy, Forestry And Climate Change',
                    y: 2132,
                    drilldown: 'water'
                },
                {
                    name: 'Governance And Administration',
                    y: 2089,
                    drilldown: 'governance'
                },
                {
                    name: 'Finance And Economic Planning',
                    y: 2067,
                    drilldown: 'finance'
                },
                {
                    name: 'Youth, Sports, Talent Development And Social Services',
                    y: 1911,
                    drilldown: 'youth'
                },
                {
                    name: 'Education, Human Capital Development And Vocational Training',
                    y: 1645,
                    drilldown: 'education'
                },
                {
                    name: 'Health And Medical Services',
                    y: 1638,
                    drilldown: 'health'
                },
                // Add more data points with drilldowns as needed
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
        },
        {
            name: 'Revenue Target',
            type: 'column',
            data: [
                ['Trade, Industry, Tourism, Co-operative Development And Marketing', 4000],
                ['Housing And Urban Development', 3500],
                ['Lands And Physical Planning', 3000],
                ['Agriculture And Livestock', 2500],
                ['Roads, Public Works, Transport And Infrastructure', 2400],
                ['Blue Economy, Fisheries, Mining And Digital Economy', 2300],
                ['Water, Irrigation, Sanitation, Environment, Energy, Forestry And Climate Change', 2200],
                ['Governance And Administration', 2100],
                ['Finance And Economic Planning', 2000],
                ['Youth, Sports, Talent Development And Social Services', 1900],
                ['Education, Human Capital Development And Vocational Training', 1800],
                ['Health And Medical Services', 1700],
                // Add more target data as needed
            ],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                align: 'center',
                format: 'KES {point.y:,.2f}',
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }
    ],
    drilldown: {
        series: [
            {
                id: 'trade',
                name: 'Trade, Industry, Tourism, Co-operative Development And Marketing',
                data: [
                    {
                        name: 'Stream 1',
                        y: 1000,
                    },
                    {
                        name: 'Stream 2',
                        y: 1500,
                    },
                    // Add more revenue stream data as needed
                ]
            },
            {
                id: 'housing',
                name: 'Housing And Urban Development',
                data: [
                    {
                        name: 'Stream 1',
                        y: 800,
                    },
                    {
                        name: 'Stream 2',
                        y: 1500,
                    },
                    // Add more revenue stream data as needed
                ]
            },
            {
                id: 'lands',
                name: 'Lands And Physical Planning',
                data: [
                    {
                        name: 'Stream 1',
                        y: 1200,
                    },
                    {
                        name: 'Stream 2',
                        y: 900,
                    },
                    // Add more revenue stream data as needed
                ]
            },
            {
                id: 'agriculture',
                name: 'Agriculture And Livestock',
                data: [
                    {
                        name: 'Stream 1',
                        y: 1100,
                    },
                    {
                        name: 'Stream 2',
                        y: 1300,
                    },
                    // Add more revenue stream data as needed
                ]
            },
            {
                id: 'roads',
                name: 'Roads, Public Works, Transport And Infrastructure',
                data: [
                    {
                        name: 'Daily Parking',
                        y: 900,
                    },
                    {
                        name: 'Weely Parking',
                        y: 1200,
                    },
                    {
                        name: 'Bus Park',
                        y: 1200,
                    },
                    {
                        name: 'Monthly Parking',
                        y: 1200,
                    },
                    // Add more revenue stream data as needed
                ]
            },
            {
                id: 'blue-economy',
                name: 'Blue Economy, Fisheries, Mining And Digital Economy',
                data: [
                    {
                        name: 'Stream 1',
                        y: 800,
                    },
                    {
                        name: 'Stream 2',
                        y: 1100,
                    },
                    // Add more revenue stream data as needed
                ]
            },
            {
                id: 'water',
                name: 'Water, Irrigation, Sanitation, Environment, Energy, Forestry And Climate Change',
                data: [
                    {
                        name: 'Stream 1',
                        y: 750,
                    },
                    {
                        name: 'Stream 2',
                        y: 1350,
                    },
                    // Add more revenue stream data as needed
                ]
            },
            {
                id: 'governance',
                name: 'Governance And Administration',
                data: [
                    {
                        name: 'Stream 1',
                        y: 950,
                    },
                    {
                        name: 'Stream 2',
                        y: 1150,
                    },
                    // Add more revenue stream data as needed
                ]
            },
            {
                id: 'finance',
                name: 'Finance And Economic Planning',
                data: [
                    {
                        name: 'Stream 1',
                        y: 1050,
                    },
                    {
                        name: 'Stream 2',
                        y: 1250,
                    },
                    // Add more revenue stream data as needed
                ]
            },
            {
                id: 'youth',
                name: 'Youth, Sports, Talent Development And Social Services',
                data: [
                    {
                        name: 'Stream 1',
                        y: 900,
                    },
                    {
                        name: 'Stream 2',
                        y: 1400,
                    },
                    // Add more revenue stream data as needed
                ]
            },
            {
                id: 'education',
                name: 'Education, Human Capital Development And Vocational Training',
                data: [
                    {
                        name: 'Stream 1',
                        y: 950,
                    },
                    {
                        name: 'Stream 2',
                        y: 1100,
                    },
                    // Add more revenue stream data as needed
                ]
            },
            {
                id: 'health',
                name: 'Health And Medical Services',
                data: [
                    {
                        name: 'Stream 1',
                        y: 1000,
                    },
                    {
                        name: 'Stream 2',
                        y: 1300,
                    },
                    // Add more revenue stream data as needed
                ]
            },
            // Add more drilldown series as needed for other departments
        ]
    }
});
