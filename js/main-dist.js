/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function() {

_navToggle = document.getElementById("navToggle")
_navBurger = document.getElementById("navBurger")
_navBar = document.getElementById("navBar")
_header = document.getElementById("header")

_menuTitle = _navToggle.querySelector(".menu__title")

_navToggle.addEventListener("click", () => {
    toggleMenu();
})

function toggleMenu() {
    // _navToggle.classList.toggle("burger--close");
    _navBurger.classList.toggle("burger-active");
    _navBar.classList.toggle("nav--show");
    _menuTitle.classList.toggle("menu__title--show");
}


let scrollObject = {};
window.onscroll = getScrollPosition;

function getScrollPosition() {
    scrollObject = {
        x: window.pageXOffset,
        y: window.pageYOffset
    }

    if (scrollObject.y > 180) {
        _header.classList.add("header--show")
    } else {
        _header.classList.remove("header--show")
    }
}

const buttons = document.querySelectorAll('[data-scroll]');
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        toggleMenu();
        const anchor = button.getAttribute("data-scroll")
        const anchorElement = document.querySelector(anchor);
        anchorElement.scrollIntoView();
    });
});

/***/ }),
/* 2 */
/***/ (function() {

const duration = 0.5;
let currentShowPopUp = 0;

function initPopUp(button) {
    const numberPopUp = button.dataset.showPopup;
    const idPopUp = 'popup-' + numberPopUp;

    const _popUp = document.getElementById(idPopUp);
    const _closeButton = _popUp.querySelector('.pop-up__close');

    const _closeBtn = _popUp.querySelector('.pop-up__button--close');

    if (_closeBtn) {
        console.debug("_closeBtn");
        _closeBtn.addEventListener('click', () => {
            closePopUp(_popUp, duration);
        });
    }

    button.addEventListener('click', (e) => {
        // e.preventDefault();

        if (currentShowPopUp == 0) {
            openPopUp(_popUp, duration);
            currentShowPopUp = idPopUp;
        } else {
            console.log("currentShowPopUp: " + currentShowPopUp);
            closePopUpById(currentShowPopUp, false);
            openPopUp(_popUp, false);
            currentShowPopUp = idPopUp;
        }
    });

    _closeButton.addEventListener('click', () => {
        closePopUp(_popUp, duration);
    });
}

function initPopUpById(id) {
    const idPopUp = 'popup-' + id;

    const _popUp = document.getElementById(idPopUp);
    const _closeButton = _popUp.querySelector('.pop-up__close');

    const _closeBtn = _popUp.querySelector('.pop-up__button--close');

    if (_closeBtn) {
        _closeBtn.addEventListener('click', () => {
            closePopUp(_popUp, duration);
        });
    }

    openPopUp(_popUp, duration);
    currentShowPopUp = idPopUp;

    _closeButton.addEventListener('click', () => {
        closePopUp(_popUp, duration);
    });
}

function openPopUp(popUp, duration = false) {
    duration && addAnimation(popUp, duration);
    popUp.classList.add('pop-up_active');
    scrollRemove();
}

function closePopUpById(id, duration = false) {
    const popUpCloser = document.getElementById(id);
    duration && addAnimation(popUpCloser, duration);
    popUpCloser.classList.remove('pop-up_active');
    currentShowPopUp = 0;
    scrollAdd();
}

function closePopUp(popUp, duration = false) {
    duration && addAnimation(popUp, duration);
    popUp.classList.remove('pop-up_active');
    currentShowPopUp = 0;
    scrollAdd();
}

function addAnimation(item, duration) {
    item.style.transition = `transform ${duration}s`;

    setTimeout(() => {
        item.style.transition = ``;
    }, duration * 1000);
}

// управление скролом
function scrollAdd() {
    document.body.style = '';
}

function scrollRemove() {
    document.body.style = 'overflow:hidden';
}

//test
const buttons = document.querySelectorAll('[data-show-popup]');

buttons.forEach((button) => {
    initPopUp(button);
});

/***/ }),
/* 3 */
/***/ (function() {

function initQuiz(quiz) {
    const buttons = [
        {
            question: '1. В какие сроки Вам необходима публикация?',
            answers: [
                'До 6 месяцев',
                'От 6 до 12 месяцев',
                'Более 12 месяцев',
                'Еще не знаю',
            ],
        },
        {
            question: '2. Для каких целей Вам нужна публикация?',
            answers: [
                'Для защиты диссертации и/или получения получение учёного звания и защита учёной степени',
                'Для подачи заявки на стипендию и/или грант',
                'Для сдачи отчётности в вузе и/или продления контракта',
                'Для карьерного роста',
                'Для повышения личного рейтинга',
                'Для развития науки',
            ],
        },
        {
            question: '3. В какой области Вы специализируетесь?',
            answers: [
                'Социо-гуманитарные науки',
                'Науки о Земле',
                'Технические науки',
                'Медицина',
                'Биоинженерия',
                'Точные науки',
            ],
        },
        {
            question: '4. Готово ли Ваше научное исследование?',
            answers: ['Да', 'Нет', 'В работе', 'Другое'],
        },
        {
            question: '5. Какие показатели журнала Вам необходимы?',
            answers: [
                'Q1 / процентиль > 75 Scopus',
                'Q2 / процентиль > 50 Scopus',
                'Q3 / процентиль > 35  Scopus ',
                'Q3 / процентиль < 35 Scopus ',
                'Q4 / проценитль < 24 Scopus ',
                'WoS без импакт – фактора  / ESCI, AHCI',
                'WoS с импакт – фактором / SSCI, SCI',
            ],
        },
    ];
    const answers = [];

    let step = 0;

    const _answers = quiz.querySelector('#quizlet__answers'),
        _stepWrapper = quiz.querySelector('#steps'),
        _question = quiz.querySelector('.quizlet__question'),
        _number = quiz.querySelector('.progress-bar__title');

    quiz.querySelector('.quiz__button-next').addEventListener('click', () =>
        nextStep('Пропустить')
    );

    const insertAnswers = (activeAnswers) => {
        _answers.innerHTML = '';
        activeAnswers.forEach((element) => {
            const button = document.createElement('button');
            button.classList = 'quizlet__option button button--quiz';
            button.innerText = element;
            button.addEventListener('click', () => nextStep(element));
            _answers.append(button);
        });
    };

    const insertQuestion = (activeQuestion) => {
        _question.innerHTML = activeQuestion;
    };

    const addAnswer = (answer) => {
        answers.push(answer);
    };

    const nextStep = (answer) => {
        if (step + 1 < buttons.length) {
            addAnswer(answer);
            insertAnswers(buttons[++step].answers);
            insertQuestion(buttons[step].question);
            _stepWrapper.classList = `progress-bar_step-${step}`;
            _number.innerText = `Вопрос ${step + 1} из ${buttons.length}`;
        } else {
            endQuiz();
        }
    };

    const endQuiz = () => {
        dataQuiz = {
            "res": answers,
            "csrfToken": csrfToken
        }
        initPopUpById(7);
        // sendAnswers(dataQuiz);
    };

    const sendAnswers = (sendData) => {
        axios.post('/', sendData)
            .then((response) => {
                console.debug(response);
            }, (error) => {
                console.debug(error);
            });
    };

    insertAnswers(buttons[step].answers);
}

const _quiz1 = document.getElementById('quiz-1'),
    _quiz0 = document.getElementById('quiz-0');

initQuiz(_quiz1);
initQuiz(_quiz0);


/***/ }),
/* 4 */
/***/ (function() {

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



/***/ }),
/* 5 */
/***/ (function() {

const _slider = document.getElementById('stages-slider');
const _sliderNav = document.getElementById('stages-slider-nav');

(function initSlider(_slider, _sliderNav) {
    const _sliderInner = _slider.querySelector('.stages-slider__wrapper');
    const _sliderControls = _sliderNav.querySelector('.stage-gird__inner');
    const _leftArrow = _slider.querySelector('.stages-slider__control-left');
    const _rightArrow = _slider.querySelector('.stages-slider__control-right');
    const _sliderTitle = _slider.querySelector('.navbar-slider__title');

    const sliderNodes = _sliderInner.children;
    const countSliders = sliderNodes.length;
    const slideWidth = sliderNodes[0].clientWidth;

    let step = 0;
    const controls = [];

    const initSlider = () => {
        changeTitle(step + 1);

        for (let i = 0; i < countSliders; i++) {
            const a = document.createElement('a');

            a.className = 'stage-gird__item';
            a.innerText = i + 1;
            if (i === step) setActiveControl(a);
            a.addEventListener('click', (e) => {
                setActiveControl(e.target);
                setActiveSlide(i);
            });

            controls.push(a);
            _sliderControls.append(a);
        }
    };

    const setOffset = (index) => {
        _sliderInner.style.transform = `translateX(-${index * slideWidth}px)`;
    };

    const changeTitle = (newSliderIndex) => {
        _sliderTitle.innerText = `${newSliderIndex} этап`;
    };

    const setActiveControl = (activeControl) => {
        controls.forEach((item) => {
            item.classList.remove('stage-gird__item--active');
        });
        activeControl.classList.add('stage-gird__item--active');
    };

    const setActiveControlByIndex = (index) => {
        controls.forEach((item) => {
            item.classList.remove('stage-gird__item--active');
        });
        controls[index].classList.add('stage-gird__item--active');
    };

    const setActiveSlide = (newSlideIndex) => {
        step = newSlideIndex;
        if (newSlideIndex > countSliders - 1) step = 0;
        if (newSlideIndex < 0) step = countSliders - 1;
        changeTitle(step + 1);
        setActiveControlByIndex(step);
        setOffset(step);
    };

    _leftArrow.addEventListener('click', () => setActiveSlide(step - 1));
    _rightArrow.addEventListener('click', () => setActiveSlide(step + 1));
    initSlider(sliderNodes);
})(_slider, _sliderNav);


/***/ }),
/* 6 */
/***/ (function() {

const _tabsTeam = document.getElementById('tabs-team');

(function initTabs(_tabsBlock,) {
    const _tabsHeader = _tabsBlock.querySelector('.tabs-team__header');
    const _tabsBody = _tabsBlock.querySelector('.tabs-team__body');

    function clearBody(tabsBody, classShow) {
        for (let i = 0; i < tabsBody.children.length; i++) {
            tabsBody.children[i].classList.remove(classShow);
        }
    }

    clearBody(_tabsBody, "tabs-team__item--show");
    _tabsBody.children[1].classList.add("tabs-team__item--show");

    clearBody(_tabsHeader, "tabs-team__tab--show");
    _tabsHeader.children[1].classList.add("tabs-team__tab--show")

    for (let i = 0; i < _tabsHeader.children.length; i++) {
        _tabsHeader.children[i].addEventListener("click", (e) => {
            clearBody(_tabsBody, "tabs-team__item--show");
            _tabsBody.children[i].classList.add("tabs-team__item--show");

            clearBody(_tabsHeader, "tabs-team__tab--show");
            _tabsHeader.children[i].classList.add("tabs-team__tab--show")
        })
    }

})(_tabsTeam);

/***/ }),
/* 7 */
/***/ (function() {

const _spoilers = document.getElementById('spoilers-faq');

(function initSpoilers(_spoilers) {

    function clearBody(body, classShow) {
        for (let i = 0; i < body.children.length; i++) {
            body.children[i].classList.remove(classShow);
        }
    }

    for (let i = 0; i < _spoilers.children.length; i++) {
        _spoilers.children[i]
            .querySelector(".spoiler__header")
            .addEventListener("click", () => {

                if (_spoilers.children[i].classList.contains("spoiler--show")) {
                    _spoilers.children[i].classList.remove("spoiler--show");
                } else {
                    clearBody(_spoilers, "spoiler--show");
                    _spoilers.children[i].classList.add("spoiler--show");
                }
            })
    }

})(_spoilers);

/***/ }),
/* 8 */
/***/ (function() {

_scrollBtn = document.getElementById("scroll-btn");
let anchor = document.querySelector('#cost-section');

_scrollBtn.addEventListener("click", () => {
    anchor.scrollIntoView();
});

/***/ }),
/* 9 */
/***/ (function() {

const _tabsReview = document.getElementById('tabs-review');

(function initTabs(_tabsBlock,) {
    const _tabsHeader = _tabsBlock.querySelector('.r-cards');
    const _tabsBody = _tabsBlock.querySelector('.review-wrapper');
    const _tabsVideo = _tabsBlock.querySelector('.review-video-wrapper');

    function clearBody(tabsBody, classShow) {
        for (let i = 0; i < tabsBody.children.length; i++) {
            tabsBody.children[i].classList.remove(classShow);
        }
    }

    function clearHeader(tabsBody, classShow) {
        for (let i = 0; i < tabsBody.children.length; i++) {
            tabsBody.children[i].classList.add(classShow);
        }
    }

    clearBody(_tabsBody, "review--show");
    _tabsBody.children[0].classList.add("review--show");

    clearBody(_tabsVideo, "reviews__video--show");
    _tabsVideo.children[0].classList.add("reviews__video--show");

    clearHeader(_tabsHeader, "review-card--show");
    _tabsHeader.children[0].classList.remove("review-card--show")

    for (let i = 0; i < _tabsHeader.children.length; i++) {
        _tabsHeader.children[i]
            .querySelector(".review-card__profile-link")
            .addEventListener("click", (e) => {
                clearBody(_tabsBody, "review--show");
                _tabsBody.children[i].classList.add("review--show");

                clearBody(_tabsVideo, "reviews__video--show");
                _tabsVideo.children[i].classList.add("reviews__video--show");

                clearHeader(_tabsHeader, "review-card--show");
                _tabsHeader.children[i].classList.remove("review-card--show")

            })
    }

})(_tabsReview);

/***/ }),
/* 10 */
/***/ (function() {

function initForm(_form) {
    _form.addEventListener('submit', (e) => {
        e.preventDefault();
        const {currentTarget} = e;

        const data = scrabbleInputs(currentTarget);
        console.debug(data);
        sendForm(data);

        function scrabbleInputs(currentForm) {
            const entries = new Map([]);
            const inputs = currentForm.querySelectorAll('input');
            inputs.forEach((input) => {
                entries.set(input.name, input.value);
                input.value = "";
            });
            entries.set("csrfToken", csrfToken);
            entries.set("formsended", currentForm.name);
            const data = Object.fromEntries(entries);
            return data;
        }

        function sendForm(sendData) {
            axios.post('/', sendData)
                .then((response) => {
                    console.debug(response);
                }, (error) => {
                    console.debug(error);
                });
        }
    });
}

const forms = document.querySelectorAll('form');
console.log("Found forms:" + forms.length);

forms.forEach((_form, index) => {
    initForm(_form);
});

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_header_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pop_up_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _pop_up_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_pop_up_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _quiz_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _quiz_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_quiz_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _profile_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _profile_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_profile_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _stages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _stages__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_stages__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _team_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _team_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_team_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _faq_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
/* harmony import */ var _faq_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_faq_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _consultation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8);
/* harmony import */ var _consultation_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_consultation_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _reviews_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9);
/* harmony import */ var _reviews_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_reviews_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _forms_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(10);
/* harmony import */ var _forms_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_forms_js__WEBPACK_IMPORTED_MODULE_9__);











}();
/******/ })()
;