const duration = 0.5;
let currentShowPopUp = 0;

function initPopUp(button) {
    const numberPopUp = button.dataset.showPopup;
    const idPopUp = 'popup-' + numberPopUp;

    const _popUp = document.getElementById(idPopUp);
    const _closeButton = _popUp.querySelector('.pop-up__close');


    button.addEventListener('click', (e) => {
        // e.preventDefault();

        if (currentShowPopUp == 0) {
            openPopUp(_popUp, duration);
            currentShowPopUp = idPopUp;
        } else {
            console.log("currentShowPopUp: " + currentShowPopUp);
            closePopUpById(currentShowPopUp, false);
            openPopUp(_popUp, false);
            currentShowPopUp = idPopUp;
        }
    });

    _closeButton.addEventListener('click', () => {
        closePopUp(_popUp, duration);
    });
}

function openPopUp(popUp, duration = false) {
    duration && addAnimation(popUp, duration);
    popUp.classList.add('pop-up_active');
    scrollRemove();
}

function closePopUpById(id, duration = false) {
    const popUpCloser = document.getElementById(id);
    duration && addAnimation(popUpCloser, duration);
    popUpCloser.classList.remove('pop-up_active');
    currentShowPopUp = 0;
    scrollAdd();
}

function closePopUp(popUp, duration = false) {
    duration && addAnimation(popUp, duration);
    popUp.classList.remove('pop-up_active');
    currentShowPopUp = 0;
    scrollAdd();
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