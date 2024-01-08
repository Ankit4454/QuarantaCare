$(document).ready(function () {
    const currentLink = window.location.href;
    const navLinks = document.querySelectorAll('.navbar-link');

    navLinks.forEach(function (link) {
        if (link.href === currentLink) {
            link.className = 'text-sm text-blue-600 font-bold navbar-link';
        }
        else {
            link.className = 'text-sm text-gray-400 hover:text-gray-500 navbar-link';
        }
    });

    const burger = document.querySelectorAll('.navbar-burger');
    const menu = document.querySelectorAll('.navbar-menu');

    if (burger.length && menu.length) {
        for (var i = 0; i < burger.length; i++) {
            burger[i].addEventListener('click', function () {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }

    const close = document.querySelectorAll('.navbar-close');
    const backdrop = document.querySelectorAll('.navbar-backdrop');

    if (close.length) {
        for (var i = 0; i < close.length; i++) {
            close[i].addEventListener('click', function () {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }

    if (backdrop.length) {
        for (var i = 0; i < backdrop.length; i++) {
            backdrop[i].addEventListener('click', function () {
                for (var j = 0; j < menu.length; j++) {
                    menu[j].classList.toggle('hidden');
                }
            });
        }
    }
});

function showTab(tabId){
    document.querySelectorAll('#dashboard-link, #patient-link, #report-link').forEach(link => {
        link.className = 'hidden lg:inline-flex items-center lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200 w-full';
    });

    document.querySelectorAll('#dashboard-tab, #patient-tab, #report-tab').forEach(tab => {
        tab.classList.add('hidden');
    });

    document.getElementById(`${tabId}-link`).className = 'hidden lg:inline-flex items-center py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200 w-full';
    document.getElementById(`${tabId}-tab`).classList.remove('hidden');
}