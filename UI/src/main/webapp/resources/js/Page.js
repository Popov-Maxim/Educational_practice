class Page {
    constructor() {
    }

    _root
    _nameUser

    set root(value) {
        this._root = value;
    }

    set nameUser(value) {
        this._nameUser = value;
    }

    showHead() {
        let oldChild = document.getElementsByTagName("header").item(0).lastElementChild;
        let newChild = new Builder(this._nameUser).createHead();
        let head = document.getElementsByTagName("header").item(0);
        console.log(oldChild);
        head.replaceChild(newChild, oldChild);

    }

    showSelectVendor(listVendor) {
        let providers = document.getElementsByClassName("select-provider").item(0);
        while (providers.firstChild) {
            providers.removeChild(providers.firstChild);
        }

        providers.appendChild(document.createElement("option")).append("выберите");
        providers.lastElementChild.value = "";
        for (const vendor of listVendor) {
            providers.appendChild(document.createElement("option")).append(vendor);
            providers.lastElementChild.value = vendor;
        }
    }

    showAds(adInPage) {
        let root = document.getElementsByClassName(this._root).item(0);
        let button = root.lastElementChild;
        for (const i in adInPage) {
            root.insertBefore(new Builder(this._nameUser, adInPage[i]).createPost(), button);
        }
    }

    clean() {
        let root = document.getElementsByClassName(this._root).item(0);
        while (root.firstElementChild.className !== "load-more") {
            root.removeChild(root.firstChild);
        }
    }

    addAd(ad) {
        document.getElementsByClassName(this._root).item(0).insertBefore(ad, document.getElementsByClassName("load-more").item(0));
    }

    deleteAd(id) {
        document.getElementById(id).remove();
    }

    editAd(id, adItem) {
        let root = document.getElementsByClassName(this._root).item(0);
        let oldChild = document.getElementById(id);
        let newChild = new Builder(this._nameUser, adItem).createPost();
        if (oldChild !== undefined) {
            root.replaceChild(newChild, oldChild);
        }
    }

    getFilterConfig() {
        let filterConfig = new FilterConfig();
        let date = document.getElementsByClassName("filter-tools__date").item(0);
        if (!isNaN(new Date(date.firstElementChild.value))) {
            filterConfig.fromDate = new Date(date.firstElementChild.value);
        }
        if (!isNaN(new Date(date.lastElementChild.value))) {
            filterConfig.toDate = new Date(date.lastElementChild.value);
        }
        let tags = document.getElementsByClassName("filter-tools__all-tag").item(0)
            .querySelectorAll("input");
        for (const tag of tags) {
            if (tag.value.trim() !== "") {
                filterConfig.tags.push(tag.value);
            }
        }
        let vendor = document.getElementsByClassName("select-provider").item(0);
        if (vendor.value !== undefined && vendor.value.trim() !== "") {
            filterConfig.vendor = vendor.value;
        }
        console.log(filterConfig);
        return filterConfig;
    }
}