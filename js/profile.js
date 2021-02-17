let accordion = document.getElementsByClassName("accordion__item");
let i;

// for (i = 0; i < accordion.length; i++) {
//     accordion[i].addEventListener("click", function () {
//         // this.classList.toggle("accordion__item--active");
//         let panel = this.nextElementSibling;
//         if (panel.style.maxHeight) {
//             panel.style.maxHeight = null;
//         } else {
//             panel.style.maxHeight = panel.scrollHeight + "px";
//         }
//     });
// }

_btnMyArticles = document.getElementById("btnMyArticles");
_btnLoyalty = document.getElementById("btnLoyalty");
_btnProfile = document.getElementById("btnProfile");

_imgMyArticles = document.getElementById("imgMyArticles");
_imgLoyalty = document.getElementById("imgLoyalty");
_imgProfile = document.getElementById("imgProfile");


_btnMyArticles.classList.toggle("accordion__item--active");
_imgMyArticles.classList.add("p-slider__img--show")

let panel = _btnMyArticles.nextElementSibling;
if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
} else {
    panel.style.maxHeight = panel.scrollHeight + "px";
}


_btnMyArticles.addEventListener("click", () => {
    _imgMyArticles.classList.add("p-slider__img--show");

    _imgLoyalty.classList.remove("p-slider__img--show");
    _imgProfile.classList.remove("p-slider__img--show");

    _btnLoyalty.classList.remove("accordion__item--active");
    _btnProfile.classList.remove("accordion__item--active");

    _btnLoyalty.nextElementSibling.style.maxHeight = null;
    _btnProfile.nextElementSibling.style.maxHeight = null;

    _btnMyArticles.classList.add("accordion__item--active");

    let panel = _btnMyArticles.nextElementSibling;
    panel.style.maxHeight = panel.scrollHeight + "px";

})

_btnLoyalty.addEventListener("click", () => {
    _imgLoyalty.classList.add("p-slider__img--show")

    _imgMyArticles.classList.remove("p-slider__img--show")
    _imgProfile.classList.remove("p-slider__img--show")

    _btnMyArticles.classList.remove("accordion__item--active")
    _btnProfile.classList.remove("accordion__item--active")

    _btnMyArticles.nextElementSibling.style.maxHeight = null;
    _btnProfile.nextElementSibling.style.maxHeight = null;

    _btnLoyalty.classList.add("accordion__item--active");

    let panel = _btnLoyalty.nextElementSibling;
    panel.style.maxHeight = panel.scrollHeight + "px";
})


_btnProfile.addEventListener("click", () => {
    _imgProfile.classList.add("p-slider__img--show")

    _imgMyArticles.classList.remove("p-slider__img--show")
    _imgLoyalty.classList.remove("p-slider__img--show")

    _btnMyArticles.classList.remove("accordion__item--active")
    _btnLoyalty.classList.remove("accordion__item--active")

    _btnMyArticles.nextElementSibling.style.maxHeight = null;
    _btnLoyalty.nextElementSibling.style.maxHeight = null;

    _btnProfile.classList.add("accordion__item--active");

    let panel = _btnProfile.nextElementSibling;
    panel.style.maxHeight = panel.scrollHeight + "px";
})

