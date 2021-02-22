function initForm(_form) {

    _form.addEventListener('submit', (e) => {
        e.preventDefault();
        const {currentTarget} = e;
        const idPopup = currentTarget.hasAttribute("data-popup")
            ? currentTarget.getAttribute("data-popup")
            : null;
        const data = scrabbleInputs(currentTarget);
        const couponInput = currentTarget.querySelectorAll('[name="coupon"]');

        sendForm(data);

        function scrabbleInputs(currentForm) {
            const entries = new Map([]);
            const inputs = currentForm.querySelectorAll('input');
            inputs.forEach((input) => {
                entries.set(input.name, input.value);
                input.value = "";
            });

            if (idPopup == 7 && answersQuizlet) {
                entries.set("res", answersQuizlet);
                answersQuizlet = null;
            }

            entries.set("csrfToken", csrfToken);
            entries.set("formsended", currentForm.getAttribute("name"));

            const data = Object.fromEntries(entries);
            return data;
        }

        function sendForm(sendData) {
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