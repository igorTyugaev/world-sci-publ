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