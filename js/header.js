_navToggle = document.getElementById("navToggle")
_navBar = document.getElementById("navBar")

_navToggle.addEventListener("click", () => {
    _navToggle.classList.toggle("burger--close")
    _navBar.classList.toggle("nav--show")
})