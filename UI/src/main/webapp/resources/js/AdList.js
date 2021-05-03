class AdList {
    _adList = [];

    constructor(adList = []) {
        this.addAll(adList);
    }

    getPage(skip = 0, top = 10, filterConfig = null) {
        if (typeof skip !== "number" || typeof top !== "number"
            || (filterConfig !== null && !(filterConfig instanceof FilterConfig))) {
            return err;
        }
        let result = [];
        if (!filterConfig) {
            result = this._adList.slice(skip, skip + top);
        } else {
            for (let i = 0; i < this._adList.length; i++) {
                if ((filterConfig.fromDate === undefined || this._adList[i].createdAt >= filterConfig.fromDate)
                    && (filterConfig.toDate === undefined || this._adList[i].createdAt <= filterConfig.toDate)
                    && (filterConfig.vendor === undefined || this._adList[i].vendor === filterConfig.vendor)) {

                    if (filterConfig.tags.every(tagNeed =>
                        this._adList[i].hashTags.find(tag => tag === tagNeed) !== undefined)) {
                        result.push(this._adList[i]);
                    }
                }

            }
            result = result.slice(skip, skip + top);
        }
        return result;
    }

    get(idFind) {
        if (typeof idFind !== "string") {
            return err;
        }
        return this._adList.find(item => item.id === idFind);
    }

    add(adItem) {
        if (typeof adItem !== "object") {
            return err;
        }
        if (AdList._validateAd(adItem) &&
            this._adList.find(item => item.id === adItem.id && item !== adItem) === undefined) {
            this._adList.push(adItem);
            this._save();
            return true;
        } else {
            return false;
        }
    }

    addAll(adList) {
        if (!(Array.isArray(adList))) {
            return err;
        }
        let incorrectItem = [];
        if (adList.length) {
            adList.forEach(value => this.add(value) ? true : incorrectItem.push(value));
            this._save();
        }
        return incorrectItem;
    }

    edit(id, adItem) {
        if (typeof id !== "string" || typeof adItem !== "object") {
            return err;
        }
        if (adItem.id !== undefined) {
            return false;
        }
        let editableItem = this.get(id);
        const resultItem = Object.assign(editableItem, adItem);
        if (AdList._validateAd(resultItem)) {
            editableItem = resultItem;
            this._save();
            return true;
        } else {
            return false;
        }
    }

    remove(id) {
        if (typeof id !== "string") {
            return err;
        }
        const index = this._adList.findIndex(value => value.id === id);
        if (index !== -1) {
            this._adList.splice(index, 1);
            this._save();
            return true;
        } else {
            return false;
        }
    }

    clear() {
        this._adList.splice(0, this._adList.length);
        this._save();
    }

    restore() {
        this._adList = JSON.parse(localStorage.getItem("AdList"));
        for (const ad of this._adList) {
            ad.createdAt = new Date(ad.createdAt);
            ad.validUntil = new Date(ad.validUntil);
        }
    }

    _save() {
        localStorage.setItem("AdList", JSON.stringify(this._adList));
    }

    static _validateAd(adItem) {
        if (typeof adItem !== "object") {
            return err;
        }
        if (adItem.id !== undefined && typeof adItem.id == "string"
            && adItem.description !== undefined && typeof adItem.description == "string"
            && adItem.description.length < 200
            && adItem.createdAt !== undefined && adItem.createdAt instanceof Date
            && adItem.link !== undefined && typeof adItem.link == "string"
            && adItem.vendor !== undefined && typeof adItem.vendor == "string"
            && adItem.vendor.trim() !== ""
            && adItem.hashTags !== undefined && Array.isArray(adItem.hashTags)
            && adItem.discount !== undefined && typeof adItem.discount == "string"
            && adItem.validUntil !== undefined && adItem.createdAt instanceof Date) {
            return true;
        } else {
            return false;
        }
    }

}