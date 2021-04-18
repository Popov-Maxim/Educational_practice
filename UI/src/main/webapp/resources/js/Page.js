class Page {
    constructor() {
    }

    _root
    _nameUser
    _adList

    set root(value) {
        this._root = value;
    }

    set nameUser(value) {
        this._nameUser = value;
    }

    set adList(value) {
        this._adList = value;
    }

    showHead() {
        let oldChild = document.getElementsByTagName("header").item(0).lastElementChild;
        let newChild = new Builder(this._nameUser).createHead();
        let head = document.getElementsByTagName("header").item(0);
        console.log(oldChild);
        head.replaceChild(newChild, oldChild);

    }

    showSelectVendor() {
        let providers = document.getElementsByClassName("select-provider").item(0);
        let skip = 0;
        let adList = this._adList.getPage(skip, 1);
        while (adList.length !== 0) {
            providers.appendChild(document.createElement("option")).append(adList[0].vendor);
            adList = this._adList.getPage(++skip, 1);
        }
    }

    showAds() {
        let adInPage = this._adList.getPage(0, 10);
        let root = document.getElementsByClassName(this._root).item(0);
        for (const i in adInPage) {
            root.appendChild(new Builder(this._nameUser, adInPage[i]).createPost());
        }
        root.appendChild(document.createElement("div")).className = "load-more";
        root.lastElementChild.appendChild(document.createElement("button")).textContent = "Загрузить ещё";
    }

    addAd(ad) {
        if (this._adList.add(ad)) {
            document.getElementsByClassName(this._root).item(0).insertBefore(ad, document.getElementsByClassName("load-more").item(0));
        }
    }

    deleteAd(id) {
        if (this._adList.remove(id)) {
            document.getElementById(id).remove();
            return true;
        } else {
            return false;
        }
    }

    editAd(id, adItem) {
        this._adList.edit(id, adItem);
        let root = document.getElementsByClassName(this._root).item(0);
        let oldChild = document.getElementById(id);
        let newChild = new Builder(this._nameUser, this._adList.get(id)).createPost();
        if (oldChild !== undefined) {
            root.replaceChild(newChild, oldChild);
        }
    }
}