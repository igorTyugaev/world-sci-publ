function initPopUp(input) {

    input.addEventListener('change', () => {
        console.log("Файл был загружен!");
        input.parentNode.classList.add("p-uploader--active");
    })
}

const inputs = document.querySelectorAll('input[type="file"]');

inputs.forEach((input) => {
    initPopUp(input);
});
