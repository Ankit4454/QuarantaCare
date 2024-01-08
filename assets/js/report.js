function filterReports() {
    let status = "";
    let reportsListDiv = $('#reportsListDiv');
    if (document.getElementById('filter1-0').checked) {
        status = "";
    }
    else if (document.getElementById('filter1-1').checked) {
        status = "Negative";
    }
    else if (document.getElementById('filter1-2').checked) {
        status = "Travelled-Quarantine";
    }
    else if (document.getElementById('filter1-3').checked) {
        status = "Symptoms-Quarantine";
    }
    else if (document.getElementById('filter1-4').checked) {
        status = "Positive-Admit";
    }

    $.ajax({
        type: 'GET',
        url: `/reports/${status}`,
        success: function (data) {
            let reports = data.data.reports;
            reportsListDiv.empty();
            reports.map((report) => { reportsListDiv.append(reportDom(report)) });
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

let reportDom = function (report) {
    return `<li class="flex justify-between gap-x-6 py-5">
    <div class="flex min-w-0 gap-x-4">
        <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">
                ${report.patient.userName}
            </p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                ${report.status}
            </p>
        </div>
    </div>
    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p class="text-sm font-semibold leading-6 text-gray-900">by ${report.doctor.userName}
        </p>
        <p class="text-sm leading-6 text-gray-900">
            ${new Date(report.date).toLocaleDateString('en-GB')}
        </p>
        <div class="flex items-center justify-center">
            <a href="/reports/view/${report._id}" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="#2563EB" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
            </a>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            <a href="/reports/delete/${report._id}"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff0000"
                    class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg></a>
        </div>
    </div>
</li>`;
}