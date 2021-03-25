function initPopUp(input) {

    input.addEventListener('change', (e) => {
        let files = e.target.files || e.dataTransfer.files;
        // Process all File objects
        for (let i = 0, f; f = files[i]; i++) {
            setNameFile(f.name);
            uploadFile(f);
        }
        input.parentNode.classList.add("p-uploader--active");
    }, false);

    function setNameFile(msg) {
        const _label = input.parentNode.querySelector('.p-uploader__text');
        const _img = input.parentNode.querySelector('.p-uploader__img');
        _label.innerHTML = msg;
        _img.src = "./media/folder/folder_white_done.svg";
        _label.style.color = "#FFFFFF";
    }

    function setStatusFile(msg) {
        const _label = input.parentNode.parentNode.querySelector('.input-wrapper__error');
        _label.style.display = "block";
        _label.innerHTML = msg;
        _label.style.color = "#000000";
    }

    function updateFileProgress(e) {
        let percent = (e.loaded / e.total) * 100;
        setStatusFile("Загружено " + Math.round(percent) + "%");
    }

    function uploadFile(file) {
        const xhr = new XMLHttpRequest(),
            fileSizeLimit = 2048; // In MB

        if (xhr.upload) {
            // Check if file is less than x MB
            if (file.size <= fileSizeLimit * 1024 * 1024) {
                xhr.upload.addEventListener('progress', updateFileProgress, false);
            }
        }
    }
}

const inputs = document.querySelectorAll('input[type="file"]');

inputs.forEach((input) => {
    if (input.id != 'file-upload')
        initPopUp(input);
});
