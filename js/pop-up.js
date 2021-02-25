const duration = 0.5;
let currentShowPopUp = 0;

function initPopUp(button) {
    const numberPopUp = button.dataset.showPopup;
    const idPopUp = 'popup-' + numberPopUp;

    const _popUp = document.getElementById(idPopUp);
    const _closeButton = _popUp.querySelector('.pop-up__close');

    const _closeBtn = _popUp.querySelector('.pop-up__button--close');

    if (_closeBtn) {
        _closeBtn.addEventListener('click', () => {
            closePopUp(_popUp, duration);
        });
    }

    function showPopUpLogic() {
        if (currentShowPopUp == 0) {
            openPopUp(_popUp, duration);
            currentShowPopUp = idPopUp;
        } else {
            console.log("currentShowPopUp: " + currentShowPopUp);
            closePopUpById(currentShowPopUp, false);
            openPopUp(_popUp, false);
            currentShowPopUp = idPopUp;
        }
    }

    if (button.getAttribute("type") !== "submit") {
        button.addEventListener('click', (e) => {
            showPopUpLogic();
        });
    }

    _closeButton.addEventListener('click', () => {
        closePopUp(_popUp, duration);
    });

    return showPopUpLogic;
}

function initPopUpById(id) {
    const idPopUp = 'popup-' + id;

    const _popUp = document.getElementById(idPopUp);
    const _closeButton = _popUp.querySelector('.pop-up__close');

    const _closeBtn = _popUp.querySelector('.pop-up__button--close');

    if (_closeBtn) {
        _closeBtn.addEventListener('click', () => {
            closePopUp(_popUp, duration);
        });
    }

    openPopUp(_popUp, duration);
    currentShowPopUp = idPopUp;

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

function sendForm(sendData) {
    axios.post('/', sendData)
        .then((response) => {
            console.debug(response);
        }, (error) => {
            console.debug(error);
        });
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
let popups = new Map([]);

buttons.forEach((button) => {
    const idShowPopUp = button.dataset.showPopup;
    if (idShowPopUp == 0)
        popups.set(idShowPopUp, null);
    else
        popups.set(idShowPopUp, initPopUp(button));
});