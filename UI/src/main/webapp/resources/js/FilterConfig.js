class FilterConfig {
    _fromDate;
    _toDate;
    _vendor;
    _tags = [];

    get fromDate() {
        return this._fromDate;
    }

    set fromDate(value) {
        if (!(value instanceof Date)) {
            return err;
        }
        this._fromDate = value;
    }

    get toDate() {
        return this._toDate;
    }

    set toDate(value) {
        if (!(value instanceof Date)) {
            return err;
        }
        this._toDate = value;
    }

    get vendor() {
        return this._vendor;
    }

    set vendor(value) {
        if (typeof value !== "string") {
            return err;
        }
        this._vendor = value;
    }

    get tags() {
        return this._tags;
    }

    set tags(value) {
        if (!Array.isArray(value)) {
            return err;
        }
        this._tags = value;
    }
}