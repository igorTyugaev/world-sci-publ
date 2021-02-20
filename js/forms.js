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