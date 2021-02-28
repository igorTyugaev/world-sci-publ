let scrollObject = {};
window.onscroll = getScrollPosition;
const section_1 = document.getElementById("cost");
const section_2 = document.getElementById("quiz-0");
const section_3 = document.getElementById("promo");
const section_4 = document.getElementById("component");
const section_5 = document.getElementById("team-section");
const section_6 = document.getElementById("geography");
const section_7 = document.getElementById("faq-section");
const section_8 = document.getElementById("footer-section");

const _floatNavBar = document.getElementById("float_navbar");

const item_1 = _floatNavBar.querySelector('[data-scroll="#cost"]').querySelector('.float-item__circle');
const item_2 = _floatNavBar.querySelector('[data-scroll="#quiz-0"]').querySelector('.float-item__circle');
const item_3 = _floatNavBar.querySelector('[data-scroll="#promo"]').querySelector('.float-item__circle');
const item_4 = _floatNavBar.querySelector('[data-scroll="#component"]').querySelector('.float-item__circle');
const item_5 = _floatNavBar.querySelector('[data-scroll="#team-section"]').querySelector('.float-item__circle');
const item_6 = _floatNavBar.querySelector('[data-scroll="#geography"]').querySelector('.float-item__circle');
const item_7 = _floatNavBar.querySelector('[data-scroll="#faq-section"]').querySelector('.float-item__circle');
const item_8 = _floatNavBar.querySelector('[data-scroll="#footer-section"]').querySelector('.float-item__circle');

const active_class = "float-item__circle--active";
let currentItem = null;

function getScrollPosition() {
    scrollObject = {
        x: window.pageXOffset,
        y: window.pageYOffset
    }

    if (scrollObject.y > 180) {
        _header.classList.add("header--show")
        _floatNavBar.classList.add("float-navbar--show");
    } else {
        _header.classList.remove("header--show")
        _floatNavBar.classList.remove("float-navbar--show");
    }

    const shrink = 0.5;

    if (Math.abs(scrollObject.y - section_1.offsetTop) < section_1.scrollHeight * shrink) {

        if (currentItem)
            currentItem.classList.remove(active_class);

        currentItem = item_1;
        currentItem.classList.add(active_class);
    }

    if (Math.abs(scrollObject.y - section_2.offsetTop) < section_2.scrollHeight * shrink) {

        if (currentItem)
            currentItem.classList.remove(active_class);

        currentItem = item_2;
        currentItem.classList.add(active_class);
    }

    if (Math.abs(scrollObject.y - section_3.offsetTop) < section_3.scrollHeight * shrink) {

        if (currentItem)
            currentItem.classList.remove(active_class);

        currentItem = item_3;
        currentItem.classList.add(active_class);
    }

    if (Math.abs(scrollObject.y - section_4.offsetTop) < section_4.scrollHeight * shrink) {

        if (currentItem)
            currentItem.classList.remove(active_class);

        currentItem = item_4;
        currentItem.classList.add(active_class);
    }

    if (Math.abs(scrollObject.y - section_5.offsetTop) < section_5.scrollHeight * shrink) {

        if (currentItem)
            currentItem.classList.remove(active_class);

        currentItem = item_5;
        currentItem.classList.add(active_class);
    }

    if (Math.abs(scrollObject.y - section_6.offsetTop) < section_6.scrollHeight * shrink) {

        if (currentItem)
            currentItem.classList.remove(active_class);

        currentItem = item_6;
        currentItem.classList.add(active_class);
    }

    if (Math.abs(scrollObject.y - section_7.offsetTop) < section_7.scrollHeight * shrink) {

        if (currentItem)
            currentItem.classList.remove(active_class);

        currentItem = item_7;
        currentItem.classList.add(active_class);
    }

    if (Math.abs(scrollObject.y - section_8.offsetTop) < section_8.scrollHeight * 5) {

        if (currentItem)
            currentItem.classList.remove(active_class);

        currentItem = item_8;
        currentItem.classList.add(active_class);
    }
}
