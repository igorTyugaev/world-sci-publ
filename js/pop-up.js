const duration = 0.5;

function initPopUp(button) {
    const id = 'pop-up-' + button.dataset.popUp;

    const _popUp = document.getElementById(id);
    const _closeButton = _popUp.querySelector('.pop-up__close');

    button.addEventListener('click', () => {
        openPopUp(_popUp, duration);
        scrollRemove();
    });
    _closeButton.addEventListener('click', () => {
        closePopUp(_popUp, duration);
        scrollAdd();
    });
}
function openPopUp(popUp, duration = false) {
    duration && addAnimation(popUp, duration);
    popUp.classList.add('pop-up_active');
}
function closePopUp(popUp, duration = false) {
    duration && addAnimation(popUp, duration);
    popUp.classList.remove('pop-up_active');
}

function addAnimation(item, duration) {
    console.log('ffff');
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
const buttons = document.querySelectorAll('[data-pop-up]');

buttons.forEach((button) => {
    initPopUp(button);
});
