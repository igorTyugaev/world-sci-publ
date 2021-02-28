_navToggle = document.getElementById("navToggle")
_navBurger = document.getElementById("navBurger")
_navBar = document.getElementById("navBar")
_header = document.getElementById("header")

_menuTitle = _navToggle.querySelector(".menu__title")

_navToggle.addEventListener("click", () => {
    toggleMenu();
})

function toggleMenu() {
    _navBurger.classList.toggle("burger-active");
    _navBar.classList.toggle("nav--show");
    _menuTitle.classList.toggle("menu__title--show");
}

function hideMenu() {
    _navBurger.classList.remove("burger-active");
    _navBar.classList.remove("nav--show");
    _menuTitle.classList.remove("menu__title--show");
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