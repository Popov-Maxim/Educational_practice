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
        self = this;
    }

    showPage() {
        this._page.showHead();
        this._page.showSelectVendor(this._getVendors());
        this.loadFirst();
        this.init();
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

    init() {
        document.getElementById("load-more").addEventListener("click", this.loadMore);
        if(document.getElementById("log-out")) {
            document.getElementById("log-out").addEventListener("click",
                function () {
                    self._page.nameUser = undefined;
                    self.showPage();
                });
        }
        let inputs = document.getElementsByClassName("filter-tools").item(0)
            .querySelectorAll("input");
        for (const input of inputs) {
            input.addEventListener("change", this.loadFirst);
        }
        document.getElementsByClassName("filter-tools__provider").item(0)
            .querySelector("select").addEventListener("change", this.loadFirst);
    }

    loadFirst() {
        self._skip = 0;
        self._page.clean();
        self.loadMore();
    }

    loadMore() {
        let adInPage = self._adList.getPage(self._skip, 10, self._page.getFilterConfig());
        self._skip += adInPage.length;
        self._page.showAds(adInPage);
    }
}