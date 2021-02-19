_scrollBtn = document.getElementById("scroll-btn");
let anchor = document.querySelector('#cost-section');

_scrollBtn.addEventListener("click", () => {
    anchor.scrollIntoView();
});