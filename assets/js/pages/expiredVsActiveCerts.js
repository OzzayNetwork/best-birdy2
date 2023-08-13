
        Highcharts.setOptions({
            chart: {
                style: {
                    fontFamily: 'Montserrat, sans-serif'
                }
            },
            labels: {
                style: {
                    fontSize: '14px' // Adjust label font size
                }
            }
        });
        // Your chart generation code will go here
        document.addEventListener('DOMContentLoaded', function () {
            // Create the pie chart
            var pieColors = ['#FF0000', '#00FF00']; // Red for expired, Green for active

            Highcharts.chart('certificateStatus', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: null
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    name: 'All SBP Certificates',
                    colorByPoint: true,
                    colors: pieColors,
                    data: [{
                        name: 'Expired',
                        y: 30,
                        drilldown: 'expired'
                    }, {
                        name: 'Active',
                        y: 70,
                        drilldown: 'active'
                    }]
                }],
                drilldown: {
                    series: [{
                        name: 'Expired Certificates',
                        id: 'expired',
                        data: [
                            ['Homabay Town', 10],
                            ['Rachuonyo North', 5],
                            ['Suba North', 3],
                            ['Rachuonyo South', 4],
                            ['Rachuonyo East', 8],
                            ['Ndhiwa', 6],
                            ['Suba South', 2],
                            ['Rangwe', 7],
                            ['Homa Bay Hq', 5]
                        ]
                    }, {
                        name: 'Active Certificates',
                        id: 'active',
                        data: [
                            ['Homabay Town', 50],
                            ['Rachuonyo North', 40],
                            ['Suba North', 30],
                            ['Rachuonyo South', 45],
                            ['Rachuonyo East', 35],
                            ['Ndhiwa', 25],
                            ['Suba South', 20],
                            ['Rangwe', 30],
                            ['Homa Bay Hq', 60]
                        ]
                    }]
                }
            });
        });
