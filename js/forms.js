function initForm(_form) {
    _form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isUploadDone = true;
        let hasFileInput = false;
        let hasLatterInput = false;
        const { currentTarget } = e;
        const idPopup = currentTarget.hasAttribute('data-popup')
            ? currentTarget.getAttribute('data-popup')
            : null;
        const _button = currentTarget.querySelector('[data-show-popup]');
        const idShowPopUp = _button.dataset.showPopup;
        let showPopUpLogic = popups.get(idShowPopUp);

        const step = _button.getAttribute('data-step');
        const formSender = _button.getAttribute('data-formsended');
        const formName = formSender + step;

        const data = scrabbleInputs(currentTarget);
        if (data) {
            console.log('Отправка формы...');
            sendForm(data, currentTarget);
            if (isUploadDone) {
                triggerGoal(formName);
                if (idShowPopUp != 0) {
                    if (data.has('email'))
                        localStorage.setItem('email', data.get('email'))
                    if (idShowPopUp === 'file_upload' || idShowPopUp === 'file_upload-2' || idShowPopUp === 'finished') {
                        checkEmail();
                    } else {
                        showPopUpLogic();
                    }
                }
                currentTarget.reset();
                if (_form.id === 'dran-n-drop') {
                    const fileDrag = document.getElementById('file-drag');
                    fileDrag.classList.remove('uploader__inner--drag');
                    fileDrag.className = 'uploader__inner';

                    const _fileUploadBtn = document.getElementById('file-upload-btn');
                    const _uploaderArrowImg = _form.querySelector('.uploader__arrow');
                    const _uploaderDoneImg = _form.querySelector('.uploader__done');

                    const _status = document.getElementById('status');
                    _status.innerHTML = '';

                    const _messages = document.getElementById('messages');
                    _messages.innerHTML = 'Загрузите научную работу';

                    _fileUploadBtn.style.display = 'block';
                    _uploaderArrowImg.style.display = 'block';
                    _uploaderDoneImg.style.display = 'none';

                }
            }
        }

        function triggerGoal(currentGoal) {
            /* этот код создает цель в метрике */
            console.log("Сработала метрика: " + currentGoal);

            if (localStorage.getItem(currentGoal) === null) {
                localStorage.setItem(currentGoal, currentGoal);

                if (typeof yaCounter50181778 !== 'undefined') {
                    yaCounter50181778.reachGoal(currentGoal);
                    console.log("reachGoal: " + currentGoal)
                }
            }
            if (currentGoal != "question_1") {
                if (localStorage.getItem('form') === null) {
                    localStorage.setItem('form', 'form');
                    if (typeof yaCounter50181778 !== 'undefined') {
                        yaCounter50181778.reachGoal('form');
                        console.log("reachGoal: form")
                    }
                }
            }
        }

        function inputIsValidation(input) {
            let hint = input.parentNode.querySelector(
                '.input-wrapper__error'
            );

            if (!hint) {
                hint = input.parentNode.parentNode.querySelector(
                    '.input-wrapper__error'
                );
            }

            switch (input.getAttribute('name')) {
                case 'phone':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(
                            input,
                            hint,
                            'Недопустимый номер телефона!'
                        );
                        return false;
                    }
                    break;
                case 'email':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, 'Недопустимый email!');
                        return false;
                    }
                    break;
                case 'name':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, 'Как к Вам обращаться?');
                        return false;
                    }
                    break;
                case 'firstname':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, 'Как к Вам обращаться?');
                        return false;
                    }
                    break;
                case 'lastname':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, 'Как к Вам обращаться?');
                        return false;
                    }
                    break;
                case 'coupon':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        isUploadDone = false;
                        return true;
                    } else {
                        setErrorInput(input, hint, 'Введите купон!');
                        return false;
                    }
                    break;
                case 'file':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        hasFileInput = true;
                        return true;
                    } else {
                        setErrorInput(input, hint, 'Загрузите файл!');
                        return false;
                    }
                    break;
                case 'fileUpload':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        hasFileInput = true;
                        return true;
                    } else {
                        setErrorInput(input, hint, 'Загрузите файл!');
                        return false;
                    }
                    break;
                case 'text':
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        hasLatterInput = true;
                        return true;
                    } else {
                        setErrorInput(input, hint, 'Заполните поле!');
                        return false;
                    }
                    break;

                default:
                    return true;
                    break;
            }
        }

        function setErrorInput(input, hint, textError) {
            input.style.borderColor = 'red';
            hint.classList.add('input-wrapper__error--show');
            hint.innerHTML = '- ' + textError;
        }

        function removeErrorInput(input, hint) {
            if (input.hasAttribute('style')) input.removeAttribute('style');
            hint.classList.remove('input-wrapper__error--show');
            hint.innerHTML = '';
        }

        function scrabbleInputs(currentForm) {
            let fo = new FormData();
            const inputs = currentForm.querySelectorAll('input, textarea');
            let isValidity = true;

            inputs.forEach((input, index) => {
                const _isValidity = inputIsValidation(input);

                if (_isValidity) {
                    if (input.getAttribute('type') === 'file') {
                        fo.append('file', input.files[0]);
                    } else if (input.getAttribute('type') === 'radio') {
                        if (input.checked) {
                            fo.append(input.name, input.value);
                            console.log("input.name: " + input.name);
                            console.log("input.value: " + input.value);
                        }
                    } else {
                        fo.append(input.name, input.value);
                    }

                    if (input.getAttribute('type') === 'email') {
                        _button.setAttribute("data-email", input.value);
                    }
                }
                isValidity &= _isValidity;
            });

            if (!isValidity) return null;

            if (idPopup == 7) {
                fo.append('res', JSON.stringify(answersQuizlet));
                answersQuizlet = null;
            }

            fo.append('csrfToken', csrfToken);
            fo.append('formsended', formName);

            return fo;
        }

        function sendForm(sendData, currentForm) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                /* <CORS> */
                // 'Access-Control-Allow-Origin': "http://localhost:8848",
                // 'Access-Control-Allow-Credentials': true,
                // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,' + ' Accept'
                /* </CORS> */
            };

            // /main-test - все формы
            // /main-test/is-exists - проверка зареган ли емаил
            // /main-test/add-file - загрузка файла
            // /main-test/letter -

            /* Для отладки испольховать: */
            // const base_url = 'https://worldscipubl.com/main-test/';

            const base_url = '/main/';
            const file_ep = 'add-file/';
            const letter_ep = 'letter/';
            const is_exists = 'is-exists/';
            let url = base_url;

            if (hasFileInput) {
                url += file_ep;
                hasFileInput = false;
            } else if (hasLatterInput) {
                url += letter_ep;
                hasLatterInput = false;
            }

            console.log(url);

            axios
                .post(
                    url,
                    sendData,
                    { withCredentials: true },
                    { headers: headers }
                )
                .then(
                    (response) => {
                        const inputs = currentForm.querySelectorAll('input');
                        const input = inputs[inputs.length - 1];
                        const hint = input.parentNode.querySelector(
                            '.input-wrapper__error'
                        );
                        const resData = response.data;

                        if (resData['warning']) {
                            const resDataWarning = resData['warning'];

                            if (resDataWarning['coupon'])
                                setErrorInput(
                                    input,
                                    hint,
                                    resDataWarning['coupon']
                                );
                            else if (resDataWarning['time'])
                                setErrorInput(
                                    input,
                                    hint,
                                    resDataWarning['time']
                                );

                            isUploadDone = false;
                        } else {
                            if (!isUploadDone) {
                                console.log('Промокод успешно активирован!');
                                isUploadDone = true;
                                showPopUpLogic();
                                currentForm.reset();
                                removeErrorInput(input, hint);
                            }
                        }
                        console.log(response);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }

        function checkEmail() {

            const headers = {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                // 'Access-Control-Allow-Origin': "http://localhost:8848",
                // 'Access-Control-Allow-Credentials': true,
                // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,' + ' Accept'
            };

            // const base_url = 'https://worldscipubl.com/main-test/';
            const base_url = '/main/';
            const is_exists = 'is-exists/';
            const url = base_url + is_exists;
            const fo = new FormData();
            const email = localStorage.getItem('email');


            if (email != null) {
                fo.append('email', email);
                fo.append('csrfToken', csrfToken);
                fo.append('formsended', formName);

                axios
                    .post(
                        url,
                        fo,
                        { withCredentials: true },
                        { headers: headers }
                    )
                    .then(
                        (response) => {
                            console.log(response);
                            const resData = response.data;
                            if (resData === true) {
                                console.log(resData);
                                showPopUpLogic = popups.get("finished-2");
                                showPopUpLogic();
                            } else {
                                showPopUpLogic();
                            }
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            }
        };
    });
}

const forms = document.querySelectorAll('form');
forms.forEach((_form) => {
    initForm(_form);
});
