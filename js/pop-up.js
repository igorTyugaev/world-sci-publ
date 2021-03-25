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

    function showPopUpLogic(email) {
        const _fileInput = _popUp.querySelector('.p-uploader--active');
        if (_fileInput) {
            _fileInput.classList.remove('p-uploader--active');
            const _label = _fileInput.querySelector('.p-uploader__text');
            const _img = _fileInput.querySelector('.p-uploader__img');

            _label.removeAttribute('style');
            _img.src = "./media/folder/folder.svg";
            _label.innerHTML = "Загрузить статью (.pdf .doc .docx)";
        }

        const _selector = _popUp.querySelector('.selector');
        if (_selector) {
            const _selectorTitle = _selector.querySelector('.selector__title');
            _selector.setAttribute('data-state', 'Option 0');
            _selector.removeAttribute('style');

            const _radio = _selector.querySelector('input[type=radio]:checked')
            if (_radio) _radio.checked = false;

            _selectorTitle.classList.remove("selector__title--show");
            _selectorTitle.textContent = "Выберите базу (Scopus/WoS)";
        }

        const _email = _popUp.querySelector('.parea__email');
        if (_email) {
            const email = localStorage.getItem('email');
            if (email != null) {
                _email.innerHTML = email;
                localStorage.removeItem('email');
            }
        }

        if (currentShowPopUp == 0) {
            openPopUp(_popUp, duration);
            currentShowPopUp = idPopUp;
        } else {
            console.log('currentShowPopUp: ' + currentShowPopUp);
            closePopUpById(currentShowPopUp, false);
            openPopUp(_popUp, false);
            currentShowPopUp = idPopUp;
        }
    }

    button.addEventListener('click', (e) => {
        const _currentBtn = e.target;
        let goal = null;

        if (_currentBtn.hasAttribute('data-formsended')) {
            /* Считываем название цели */
            const formSender = _currentBtn.getAttribute('data-formsended');

            if (_currentBtn.hasAttribute('data-show-popup')) {
                /* Получаем доступ к открываемому popup-у */
                const id = 'popup-' + e.target.getAttribute('data-show-popup');
                const popUp = document.getElementById(id);

                /* Меняем значение formsended для кнопки открытия след. попапа */
                const _btn = popUp.querySelector('[data-show-popup]');
                if (_btn) _btn.setAttribute('data-formsended', formSender);

                if (_currentBtn.hasAttribute('data-step')) {
                    const step = _currentBtn.getAttribute('data-step');
                    goal = formSender + step;
                    /* Меняем значение formsended у формы */
                    const _form = popUp.querySelector('form');
                    if (_form) _form.setAttribute('name', formSender);
                }
            }
        }

        // Отправка цели для случаев где нет формы
        if (button.getAttribute('type') !== 'submit') {
            showPopUpLogic();

            if (goal) {
                triggerGoal(goal)
            }
        }
    });

    _closeButton.addEventListener('click', () => {
        closePopUp(_popUp, duration);
    });

    return showPopUpLogic;
}

function triggerGoal(formName) {
    /* этот код создает цель в метрике */
    console.log("Сработала метрика: " + formName);
    if (localStorage.getItem(formName) === null) {
        localStorage.setItem(formName, formName);

        if (typeof yaCounter50181778 !== 'undefined') {
            yaCounter50181778.reachGoal(formName);
            console.log("reachGoal: " + formName)
        }
    }
}

function initPopUpById(id, scriptForm = null) {
    const idPopUp = 'popup-' + id;

    const _popUp = document.getElementById(idPopUp);
    const _closeButton = _popUp.querySelector('.pop-up__close');

    if (scriptForm) {
        /* Меняем значение formsended для кнопки открытия след. попапа */
        const _btn = _popUp.querySelector('[data-show-popup]');
        if (_btn) _btn.setAttribute('data-formsended', scriptForm);
    }

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
    if (idShowPopUp == 0) popups.set(idShowPopUp, null);
    else {
        if (idShowPopUp === 'finished') {
            popups.set(idShowPopUp, initPopUp(button));
            const button_copy = button.cloneNode(true);
            button_copy.setAttribute('data-show-popup', 'finished-2');
            popups.set('finished-2', initPopUp(button_copy));

        }
        else
            popups.set(idShowPopUp, initPopUp(button));
    }
});
