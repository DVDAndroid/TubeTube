const tableBody = document.getElementById('activity-table-body');
const template = document.getElementById('row-template');

function renderRow(data) {
    const row = document.importNode(template.content, true);
    const tr = row.querySelector('tr');
    tr.setAttribute('data-id', data.id);
    tr.querySelector('.id').textContent = data.id;
    tr.querySelector('.title').textContent = data.title;
    tr.querySelector('.status').textContent = data.status;
    download_button(data, tr);
    tableBody.appendChild(tr);
}

socket.on('update_download_list', (items) => {
    tableBody.innerHTML = '';
    for (const id in items) {
        renderRow(items[id]);
    }
});

function download_button(item, row) {
    if (item.progress === "Done") {
        const downloadLink = document.createElement('a');
        downloadLink.href = "/download/Temp/" + item.video_identifier + "." + (item.audio_only ? item.download_settings.audio_ext : item.download_settings.video_ext);
        downloadLink.className = "btn btn-success mt-3";
        downloadLink.innerText = "Scarica";
        row.querySelector('.download-progress').appendChild(downloadLink);
    } else {
        row.querySelector('.download-progress').textContent = item.progress;
    }
}

socket.on('update_download_item', (update) => {
    const item = update.item;
    const row = document.querySelector(`tr[data-id='${item.id}']`);
    if (row) {
        row.querySelector('.status').textContent = item.status;
        download_button(item, row);
    }
});
