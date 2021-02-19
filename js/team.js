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