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


const scrollItems = document.querySelectorAll('[data-scroll]');
scrollItems.forEach((item) => {
    item.addEventListener("click", () => {
        toggleMenu();
        const anchor = item.getAttribute("data-scroll")
        const anchorElement = document.querySelector(anchor);
        anchorElement.scrollIntoView();
    });
});