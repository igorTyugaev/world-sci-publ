function initForm(_form) {

    _form.addEventListener('submit', (e) => {
        e.preventDefault();
        const {currentTarget} = e;
        const idPopup = currentTarget.hasAttribute("data-popup")
            ? currentTarget.getAttribute("data-popup")
            : null;
        const data = scrabbleInputs(currentTarget);
        const button = currentTarget.querySelector('[data-show-popup]');

        const showPopUpLogic = popups.get(button.dataset.showPopup);


        if (data) {
            showPopUpLogic();
            sendForm(data, currentTarget);
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
                    if (input.validity.valid) {
                        removeErrorInput(input, hint);
                        return true;
                    } else {
                        setErrorInput(input, hint, "Как к Вам обращаться?");
                        return false;
                    }
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
            input.removeAttribute("style");
            hint.classList.remove("input-wrapper__error--show");
            hint.innerHTML = "";
        }

        function scrabbleInputs(currentForm) {
            const entries = new Map([]);
            const inputs = currentForm.querySelectorAll('input');
            let isValidity = false;

            inputs.forEach((input) => {
                const _isValidity = inputIsValidation(input);
                if (isValidity) {
                    entries.set(input.name, input.value);
                    input.value = "";
                }
                isValidity *= _isValidity;
            });

            if (!isValidity) return null;

            if (idPopup == 7 && answersQuizlet) {
                entries.set("res", answersQuizlet);
                answersQuizlet = null;
            }

            entries.set("csrfToken", csrfToken);
            entries.set("formsended", currentForm.getAttribute("name"));

            const data = Object.fromEntries(entries);
            return data;
        }

        function sendForm(sendData, currentForm) {
            const couponInput = currentForm.querySelectorAll('[name="coupon"]');

            axios.post('/', sendData)
                .then((response) => {

                    if (response['warning'] === "Данного купона не существует!") {
                        couponInput.value = "Купон не существует!";
                    }

                    console.debug(response);
                }, (error) => {
                    console.debug(error);
                });
        }
    });
}

const forms = document.querySelectorAll('form');
console.log("Found forms:" + forms.length);

forms.forEach((_form) => {
    initForm(_form);
});