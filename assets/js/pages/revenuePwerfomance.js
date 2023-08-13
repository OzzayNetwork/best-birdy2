// Your chart generation code will go here
document.addEventListener('DOMContentLoaded', function () {
    // Abbreviate months to three letters
    function abbreviateMonth(month) {
        return month.substring(0, 3);
    }
    
    // Prepare the data
    const data = [
        ['Jul 2023', 50000, 60000, 55000], // [Month, Last Year, Target, Actual]
        ['Aug 2023', 55000, 62000, 58000],
        ['Sep 2023', 52000, 61000, 56000],
        ['Oct 2023', 53000, 63000, 57000],
        ['Nov 2023', 54000, 59000, 56000],
        ['Dec 2023', 60000, 65000, 62000],
        ['Jan 2024', 58000, 67000, 59000],
        ['Feb 2024', 59000, 68000, 60000],
        ['Mar 2024', 61000, 70000, 62000],
        ['Apr 2024', 60000, 69000, 61000],
        ['May 2024', 62000, 72000, 63000],
        ['Jun 2024', 63000, 71000, 64000]
    ];

    // Set the font family to Montserrat
    Highcharts.setOptions({
        chart: {
            style: {
                fontFamily: 'Montserrat, sans-serif'
            }
        }
    });

    // Create the bar chart
    Highcharts.chart('revenuePerfomance', {
        chart: {
            type: 'column'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: data.map(item => abbreviateMonth(item[0]))
        },
        yAxis: {
            title: {
                text: 'Revenue (KES)'
            }
        },
        legend: {
            enabled: true
        },
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>KES {point.y}</b><br/>'
        },
        plotOptions: {
            bar: {
                pointWidth: 20, // Adjust the width of each column
                stacking: 'normal', // Prevent stacking
                borderWidth: 0
            }
        },
        series: [{
            name: 'Last Year',
            data: data.map(item => item[1])
        }, {
            name: 'Target',
            data: data.map(item => item[2])
        }, {
            name: 'This Year',
            data: data.map(item => item[3])
        }]
    });
});
