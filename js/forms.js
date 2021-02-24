function initForm(_form) {

    _form.addEventListener('submit', (e) => {
        e.preventDefault();
        let codeStatus = true;
        let hasFileInput = false;
        const {currentTarget} = e;
        const idPopup = currentTarget.hasAttribute("data-popup")
            ? currentTarget.getAttribute("data-popup")
            : null;
        const data = scrabbleInputs(currentTarget);
        const button = currentTarget.querySelector('[data-show-popup]');
        const showPopUpLogic = popups.get(button.dataset.showPopup);

        if (data) {
            console.log("Отправка формы...")
            sendForm(data, currentTarget);
            if (codeStatus) {
                showPopUpLogic();
                currentTarget.reset();
            }
        }

        function inputIsValidation(input) {
            const hint = input.parentNode.querySelector(".input-wrapper__error");
            switch (input.getAttribute("name")) {
                case "phone":
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, "Недопустимый номер телефона!");
                        return false;
                    }
                    break;
                case "email":
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, "Недопустимый email!");
                        return false;
                    }
                    break;
                case "name":
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, "Как к Вам обращаться?");
                        return false;
                    }
                    break;
                case "coupon":
                    codeStatus = false;
                    return true
                    break;
                case "file":
                    hasFileInput = true;
                    return true;
                    break;
                default:
                    return true;
                    break;
            }
        }

        function setErrorInput(input, hint, textError) {
            input.style.borderColor = "red";
            hint.classList.add("input-wrapper__error--show");
            hint.innerHTML = "- " + textError;
        }

        function removeErrorInput(input, hint) {
            if (input.hasAttribute("style"))
                input.removeAttribute("style");
            hint.classList.remove("input-wrapper__error--show");
            hint.innerHTML = "";
        }

        function scrabbleInputs(currentForm) {
            const entries = new Map([]);
            let fo = new FormData();
            const inputs = currentForm.querySelectorAll('input');
            let isValidity = true;

            inputs.forEach((input, index) => {
                const _isValidity = inputIsValidation(input);

                if (_isValidity) {
                    entries.set(input.name, input.value);
                    if (input.getAttribute("type") === "file") {
                        fo.append("file", input.files[0]);
                        fo.append("db", 1);
                    } else {
                        fo.append(input.name, input.value);
                    }
                }
                isValidity &= _isValidity;
            });

            if (!isValidity) return null;

            if (idPopup == 7 && answersQuizlet) {
                entries.set("res", answersQuizlet);
                answersQuizlet = null;
            }

            // entries.set("csrfToken", csrfToken);
            // entries.set("formsended", currentForm.getAttribute("name"));

            fo.append("csrfToken", csrfToken);
            fo.append("formsended", currentForm.getAttribute("name"));

            // const data = Object.fromEntries(entries);
            // return data;
            return fo;
        }

        function sendForm(sendData, currentForm) {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }

            // const data = JSON.stringify(sendData);
            // let fo = new FormData();
            // fo.append("csrfToken", csrfToken);
            // fo.append("formsended", currentForm.getAttribute("name"));
            // // fo.append("data", data);

            // /main-test - все формы
            // /main-test/is-exists - проверка зареган ли емаил
            // /main-test/add-file - загрузка файла

            // axios.post('https://worldscipubl.com/main-test/', sendData)
            const base_url = 'https://worldscipubl.com/main-test/';
            const file_ep = 'add-file/';
            let url = base_url;
            if (hasFileInput) {
                url += file_ep;
                hasFileInput = false;
            }

            axios.post(url, sendData, {withCredentials: true}, {headers: headers})
                .then((response) => {
                    const inputs = currentForm.querySelectorAll('input');
                    const input = inputs[inputs.length - 1];
                    const hint = input.parentNode.querySelector(".input-wrapper__error");
                    const resData = response.data;

                    if (resData['warning']) {
                        const resDataWarning = resData['warning'];

                        if (resDataWarning['coupon'])
                            setErrorInput(input, hint, resDataWarning['coupon']);
                        else if (resDataWarning['time'])
                            setErrorInput(input, hint, resDataWarning['time']);

                        codeStatus = false;
                    } else if (resData['coupon']) {
                        console.log("Промокод успешно активирован!");
                        codeStatus = true;
                        showPopUpLogic();
                        currentForm.reset();
                        removeErrorInput(input, hint);
                    }
                    console.log(response);
                }, (error) => {
                    console.log(error);
                });
        }
    });
}

const forms = document.querySelectorAll('form');
forms.forEach((_form) => {
    initForm(_form);
});