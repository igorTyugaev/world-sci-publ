_navToggle = document.getElementById("navToggle");
_navBurger = document.getElementById("navBurger");
_navBar = document.getElementById("navBar");
// _navCoverBackground = document.getElementById("header-call-btn");
_header = document.getElementById("header");
_callBtn = document.getElementById("header-call-btn");


_menuTitle = _navToggle.querySelector(".menu__title");

_navToggle.addEventListener("click", () => {
    toggleMenu();
});

_callBtn.addEventListener('click', () => {
    /* этот код создает цель в метрике */
    console.log("Сработала метрика: call_1");
    if (localStorage.getItem('call_1') === null) {
        localStorage.setItem('call_1', "call_1");

        if (typeof yaCounter50181778 !== 'undefined') {
            yaCounter50181778.reachGoal("call_1");
            console.log("reachGoal: call_1");
        }
    }
});

_navBar.addEventListener('click', (e) => {
    const currentElement = e.target;
    const isOverlay = currentElement.getAttribute('class') === 'header__nav nav nav--show';
    isOverlay && toggleMenu();
});

function toggleScroll(flag) {
    if (flag)
        document.body.style = 'overflow:hidden';
    else
        document.body.removeAttribute('style');
}

function toggleMenu() {
    _navBurger.classList.toggle("burger-active");
    _navBar.classList.toggle("nav--show");
    _menuTitle.classList.toggle("menu__title--show");
    toggleScroll(_navBar.classList.contains("nav--show"));
}

function hideMenu() {
    _navBurger.classList.remove("burger-active");
    _navBar.classList.remove("nav--show");
    _menuTitle.classList.remove("menu__title--show");
    toggleScroll(_navBar.classList.contains("nav--show"));
}


const scrollItems = document.querySelectorAll('[data-scroll]');
scrollItems.forEach((item) => {
    item.addEventListener("click", () => {
        hideMenu();
        const anchor = item.getAttribute("data-scroll")
        const anchorElement = document.querySelector(anchor);
        let yOffset = 0.99;
        if (anchor === "#cost" || anchor === "#quiz-0" || anchor === "#promo")
            yOffset = 0.96;
        const y = (anchorElement.getBoundingClientRect().top + window.pageYOffset) * yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
    });
});
