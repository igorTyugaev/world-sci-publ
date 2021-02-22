_scrollBtn = document.getElementById("scroll-btn");
let anchor = document.getElementById("cost");

_scrollBtn.addEventListener("click", () => {
    anchor.scrollIntoView();
});