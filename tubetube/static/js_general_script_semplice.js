const socket = io();
const downloadButton = document.getElementById('download-button');
const spinnerBorder = document.getElementById('spinner-border');
const urlInput = document.getElementById('download-url');

function initiateDownload() {
    const url = urlInput;

    if (!url.value.trim()) {
        alert('Link vuoto');
        return;
    }

    const folderName = "Temp"; // dvd
    const checkedRadio = document.querySelector('input[name="mediaType"]:checked');
    const audioOnly = checkedRadio.value === 'audio';
    socket.emit('download', { url: url.value, folder_name: folderName, audio_only: audioOnly });
    url.disabled = true;
    downloadButton.disabled = true;
    spinnerBorder.style.display = 'inline-block';

    setTimeout(() => {
        spinnerBorder.style.display = 'none';
        url.value = '';
        url.disabled = false;
        downloadButton.disabled = false;
    }, 2500);
}

downloadButton.addEventListener('click', initiateDownload);

urlInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        initiateDownload();
    }
});

socket.on("toast", function (data) {
    document.getElementById('toast-title').innerText = data.title;
    document.getElementById('toast-message').innerText = data.body;
    document.getElementById('toast-time').innerText = new Date().toLocaleTimeString();

    var toastElement = document.getElementById('toast');
    var toast = new bootstrap.Toast(toastElement);
    toast.show();
});
