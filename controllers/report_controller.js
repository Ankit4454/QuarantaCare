const Report = require('../models/report');
const puppeteer = require('puppeteer');

module.exports.reportStatus = function (req, res) {

}

module.exports.viewReport = function (req, res) {
    Report.findById(req.params.id).populate('doctor patient').then(async function(data){
        try {
            const browser = await puppeteer.launch({
                headless: 'new',
            });
            const page = await browser.newPage();
            const html = reportHTML(data);
            await page.setContent(html, { waitUntil: 'domcontentloaded' });
    
            await page.emulateMediaType('screen');
    
            const pdf = await page.pdf({
                printBackground: true,
                format: 'A4',
            });
    
            await browser.close();
    
            res.contentType('application/pdf');
            res.send(pdf);
        } catch (err) {
            req.flash('error', err);
            console.log(`Error while generating a report ${err}`);
        }
    }).catch(function(err){
        req.flash('error', err);
        console.log(`Error while fetching a report ${err}`);
    });
}

module.exports.delete = function (req, res) {
    Report.findByIdAndDelete(req.params.id).then(function (data) {
        return res.redirect('back');
    }).catch(function (err) {
        req.flash('error', err);
        console.log(`Error while deleting a report ${err}`);
    });
}

function reportHTML(data) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>QuarantaCare Report</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #fff;
                color: #333;
            }
    
            .container {
                max-width: 800px;
                margin: auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
            }
    
            h1 {
                color: #3498db;
            }
    
            h2 {
                color: #333;
                border-bottom: 2px solid #3498db;
                padding-bottom: 5px;
                margin-bottom: 20px;
            }
    
            .patient-info {
                margin-top: 20px;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
    
            th, td {
                border: 1px solid #ddd;
                padding: 10px;
                text-align: left;
            }
    
            th {
                background-color: #3498db;
                color: #fff;
            }
    
            .status {
                font-weight: bold;
                margin-top: 20px;
            }
    
            .Negative {
                color: #27ae60;
            }
    
            .Travelled-Quarantine {
                color: #f39c12;
            }
    
            .Symptoms-Quarantine {
                color: #e74c3c;
            }
    
            .Positive-Admit {
                color: #c0392b;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h1>QuarantaCare Report</h1>
            <h2>Doctor Information</h2>
            <p>Doctor Name: ${data.doctor.userName}</p>
    
            <h2>Date</h2>
            <p>Date: ${data.date.toLocaleDateString('en-GB')}</p>
    
            <div class="patient-info">
                <h2>Patient Information</h2>
                <table>
                    <tr>
                        <th>Name</th>
                        <td>${data.patient.userName}</td>
                    </tr>
                    <tr>
                        <th>Number</th>
                        <td>${data.patient.phoneNumber}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>${data.patient.email}</td>
                    </tr>
                </table>
            </div>
    
            <div class="status">
                <h2>Status</h2>
                <p class="${data.status}">${data.status}</p>
            </div>
        </div>
    </body>
    
    </html>
    `;
} 