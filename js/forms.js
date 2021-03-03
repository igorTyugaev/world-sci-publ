function initForm(_form) {
    _form.addEventListener('submit', (e) => {
        e.preventDefault();
        let codeStatus = true;
        let hasFileInput = false;
        let hasLatterInput = false;
        const {currentTarget} = e;
        const idPopup = currentTarget.hasAttribute('data-popup')
            ? currentTarget.getAttribute('data-popup')
            : null;
        const _button = currentTarget.querySelector('[data-show-popup]');
        const idShowPopUp = _button.dataset.showPopup;
        const showPopUpLogic = popups.get(idShowPopUp);

        const step = _button.getAttribute('data-step');
        const formSender = _button.getAttribute('data-formsended');
        const formName = formSender + step;

        const data = scrabbleInputs(currentTarget);
        if (data) {
            console.log('Отправка формы...');
            sendForm(data, currentTarget);
            if (codeStatus) {
                if (idShowPopUp != 0) showPopUpLogic(false);
                currentTarget.reset();
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
                        codeStatus = false;
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
            // fo.append('formsended', currentForm.getAttribute('name'));
            fo.append('formsended', formName);

            return fo;
        }

        function sendForm(sendData, currentForm) {
            triggerGoal(formName);

            const headers = {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                /* <CORS> */
                'Access-Control-Allow-Origin': "http://localhost:8848",
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type,' + ' Accept'
                /* </CORS> */
            };

            // /main-test - все формы
            // /main-test/is-exists - проверка зареган ли емаил
            // /main-test/add-file - загрузка файла
            // /main-test/letter -

            /* Для отладки испольховать: */
            const base_url = 'https://worldscipubl.com/main-test/';

            // const base_url = '/main/';
            const file_ep = 'add-file/';
            const letter_ep = 'letter/';
            let url = base_url;

            if (hasFileInput) {
                url += file_ep;
                hasFileInput = false;
            } else if (hasLatterInput) {
                url += letter_ep;
                hasLatterInput = false;
            }

            axios
                .post(
                    url,
                    sendData,
                    {withCredentials: true},
                    {headers: headers}
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

                            codeStatus = false;
                        } else {
                            if (!codeStatus) {
                                console.log('Промокод успешно активирован!');
                                codeStatus = true;
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
    });
}

const forms = document.querySelectorAll('form');
forms.forEach((_form) => {
    initForm(_form);
});
