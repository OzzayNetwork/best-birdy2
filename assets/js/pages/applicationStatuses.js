// JavaScript code inside the <script> tag
document.addEventListener('DOMContentLoaded', function () {
    // Generate random values for the categories
    const randomValues = {
        initiated: Math.floor(Math.random() * 100),
        pendingVerification: Math.floor(Math.random() * 100),
        pendingInspection: Math.floor(Math.random() * 100),
        pendingCertification: Math.floor(Math.random() * 100)
    };
    
    // Create the half donut chart with links and custom font
    Highcharts.chart('application-statuses', {
        chart: {
            type: 'pie',
            style: {
                fontFamily: 'Montserrat' // Set font family
            }
        },
        title: {
            text: null
        },
        plotOptions: {
            pie: {
                innerSize: '50%', // Make it a half donut
                depth: 45, // Increase the depth for a 3D effect
                dataLabels: {
                    style: {
                        fontFamily: 'Montserrat' // Set font family
                    }
                }
            }
        },
        series: [{
            name: 'Applications',
            data: [
                { name: 'Initiated', y: randomValues.initiated, link: 'https://example.com/initiated' },
                { name: 'Pending Verification', y: randomValues.pendingVerification, link: 'https://example.com/pending-verification' },
                { name: 'Pending Inspection', y: randomValues.pendingInspection, link: 'https://example.com/pending-inspection' },
                { name: 'Pending Certification', y: randomValues.pendingCertification, link: 'https://example.com/pending-certification' }
            ],
            point: {
                events: {
                    click: function () {
                        // Open the link when the slice is clicked
                        window.open(this.link, '_blank');
                    }
                }
            }
        }]
    });
});
