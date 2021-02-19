_navToggle = document.getElementById("navToggle")
_navBurger = document.getElementById("navBurger")
_navBar = document.getElementById("navBar")

_menuTitle = _navToggle.querySelector(".menu__title")

_navToggle.addEventListener("click", () => {
    // _navToggle.classList.toggle("burger--close")
    _navBurger.classList.toggle("burger-active")
    _navBar.classList.toggle("nav--show")
    _menuTitle.classList.toggle("menu__title--show")
})