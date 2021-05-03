class Controller {
    _page;
    _adList;
    _skip;

    get page() {
        return this._page;
    }

    set page(value) {
        this._page = value;
    }

    get adList() {
        return this._adList;
    }

    set adList(value) {
        this._adList = value;
    }

    constructor() {
        this._skip = 0;
        this._adList = new AdList();
        self = this;
        this._adList.restore();
    }

    showPage() {
        this._page.showHead();
        this._page.showSelectVendor(this._getVendors());
        this._loadFirst();
        this._init();
    }

    _getVendors() {
        let skip = 0;
        let adList = this._adList.getPage(skip, 1);
        let vendors = new Set();
        while (adList.length !== 0) {
            vendors.add(adList[0].vendor);
            adList = this._adList.getPage(++skip, 1);
        }
        return vendors;
    }

    _init() {
        document.getElementById("load-more").addEventListener("click", this._loadMore);
        if (document.getElementById("log-out")) {
            document.getElementById("log-out").addEventListener("click",
                function () {
                    self._page.nameUser = undefined;
                    self.showPage();
                });
        }
        let inputs = document.getElementsByClassName("filter-tools").item(0)
            .querySelectorAll("input");
        for (const input of inputs) {
            input.addEventListener("change", this._loadFirst);
        }
        document.getElementsByClassName("filter-tools__provider").item(0)
            .querySelector("select").addEventListener("change", this._loadFirst);
    }

    _loadFirst() {
        self._skip = 0;
        self._page.clean();
        self._loadMore();
    }

    _loadMore() {
        let adInPage = self._adList.getPage(self._skip, 10, self._page.getFilterConfig());
        self._page.showAds(adInPage);
        let tagNChange = document.getElementsByClassName("post-info__tags-n-change");
        for (let i = self._skip; i < tagNChange.length; i++) {
            let del = tagNChange.item(i).getElementsByClassName("change");
            if (del.length) {
                let id = tagNChange.item(i).parentElement.parentElement.id;
                del.item(0).lastElementChild.addEventListener("click",
                    function () {
                        self._adList.remove(id);
                        self._page.deleteAd(id);
                        if (tagNChange.length <= 10) {
                            self._loadFirst();
                        }
                    });
            }
        }
        self._skip += adInPage.length;
    }
}