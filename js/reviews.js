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