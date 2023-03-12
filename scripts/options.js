function save_options() {
    let hours = [...Array(24).keys()].filter(k => document.getElementById(`h${k}`).checked);
    let days = [...Array(7).keys()].filter(k => document.getElementById(`d${k}`).checked);

    chrome.storage.sync.set({ hours, days }, () => {
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        hours: [0, 1, 2, 3, 4, 5, 19, 20, 21, 22, 23],
        days: [0, 6]
    }, (items) => {
        [...Array(24).keys()].forEach((k) => {
            document.getElementById(`h${k}`).checked = items.hours.includes(k);
        });
        [...Array(7).keys()].forEach((k) => {
            document.getElementById(`d${k}`).checked = items.days.includes(k);
        });
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);