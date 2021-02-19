_navToggle = document.getElementById("navToggle")
_navBurger = document.getElementById("navBurger")
_navBar = document.getElementById("navBar")
_header = document.getElementById("header")

_menuTitle = _navToggle.querySelector(".menu__title")

_navToggle.addEventListener("click", () => {
    // _navToggle.classList.toggle("burger--close")
    _navBurger.classList.toggle("burger-active")
    _navBar.classList.toggle("nav--show")
    _menuTitle.classList.toggle("menu__title--show")
})


let scrollObject = {};
window.onscroll = getScrollPosition;

function getScrollPosition(){
    scrollObject = {
        x: window.pageXOffset,
        y: window.pageYOffset
    }

    if(scrollObject.y > 180) {
        _header.classList.add("header--show")
    } else {
        _header.classList.remove("header--show")
    }
}
