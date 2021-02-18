const duration = 0.5;

function initPopUp(button) {
    const id = 'popup-' + button.dataset.showPopup;

    const _popUp = document.getElementById(id);
    const _closeButton = _popUp.querySelector('.pop-up__close');


    button.addEventListener('click', (e) => {
        if (e.target.hasAttribute("data-read-popup")) {
            const currentPopUpId = e.target.getAttribute("data-read-popup");
            scrabbleInputsForm(currentPopUpId);
            closePopUpById(currentPopUpId, false);
            openPopUp(_popUp, false);
        } else {
            openPopUp(_popUp, duration);
        }
        scrollRemove();
    });

    _closeButton.addEventListener('click', () => {
        closePopUp(_popUp, duration);
        scrollAdd();
    });
}

function scrabbleInputsForm(id) {
    const idScrabble = 'popup-' + id;
    const _popUpScrabble = document.getElementById(idScrabble);
    const popUpInputs = _popUpScrabble.querySelectorAll('.pop-up__input');

    popUpInputs.forEach((inputField) => {
        console.log(inputField.value);
    });
}

function openPopUp(popUp, duration = false) {
    duration && addAnimation(popUp, duration);
    popUp.classList.add('pop-up_active');
}

function closePopUpById(id, duration = false) {
    const idCloser = 'popup-' + id;
    const popUpCloser = document.getElementById(idCloser);
    duration && addAnimation(popUpCloser, duration);
    popUpCloser.classList.remove('pop-up_active');
}

function closePopUp(popUp, duration = false) {
    duration && addAnimation(popUp, duration);
    popUp.classList.remove('pop-up_active');
}

function addAnimation(item, duration) {
    item.style.transition = `transform ${duration}s`;

    setTimeout(() => {
        item.style.transition = ``;
    }, duration * 1000);
}

// управление скролом
function scrollAdd() {
    document.body.style = '';
}

function scrollRemove() {
    document.body.style = 'overflow:hidden';
}

//test
const buttons = document.querySelectorAll('[data-show-popup]');

buttons.forEach((button) => {
    initPopUp(button);
});
