class Builder {
    _nameUser
    _ad

    constructor(nameUser, ad = null) {
        this._nameUser = nameUser;
        this._ad = ad;
    }


    createHead() {
        let userMenu = document.createElement("div");
        if (this._nameUser !== undefined && this._nameUser !== "") {
            userMenu.className = "header__user-menu";
            userMenu.appendChild(document.createElement("div")).className = "header__button-add";
            userMenu.lastElementChild.appendChild(document.createElement("button")).className = "button-add";
            userMenu.lastElementChild.lastElementChild.textContent = "Добавить";

            userMenu.appendChild(document.createElement("div")).className = "header__name";
            userMenu.lastElementChild.textContent = this._nameUser;

            userMenu.appendChild(document.createElement("button")).className = "header__button-log-out";
            userMenu.lastElementChild.textContent = "выйти";
            userMenu.lastElementChild.id = "log-out";
        } else {
            userMenu.className = "header__log-in";
            userMenu.appendChild(document.createElement("div")).className = "header__button-add";
            userMenu.lastElementChild.appendChild(document.createElement("button")).className = "button-add";
            userMenu.lastElementChild.lastElementChild.textContent = "Войти";
        }
        return userMenu;
    }

    _createStar() {
        let ratingStars = document.createElement("div");
        ratingStars.className = "post-info__rating-stars";
        for (let i = 0; i < 5; i++) {
            let input = ratingStars.appendChild(document.createElement("input"));
            input.type = "radio";
            input.id = "post-" + this._ad.id + "-star-" + (5 - i);
            input.disabled = true;
            if (this._ad.rating !== undefined && 5 - i === this._ad.rating) {
                input.checked = true;
            }
            ratingStars.appendChild(document.createElement("label")).htmlFor = input.id;
        }
        return ratingStars;
    }

    _createHead() {
        let postInfoHead = document.createElement("div");
        postInfoHead.className = "post-info__head";
        let postInfoName = document.createElement("div");
        postInfoName.className = "post-info__name";
        postInfoHead.appendChild(postInfoName);
        postInfoName.textContent = "name";
        let postInfoRatting = document.createElement("div");
        postInfoRatting.className = "post-info__rating";
        postInfoHead.appendChild(postInfoRatting);
        let ratingValue = document.createElement("div");
        ratingValue.className = "rating-value";
        ratingValue.textContent = this._ad.rating !== undefined ? (this._ad.rating).toFixed(1) : "N/A";
        postInfoRatting.appendChild(ratingValue);
        postInfoRatting.appendChild(this._createStar(this._ad));
        return postInfoHead;
    }

    _createContent() {
        let postInfoContent = document.createElement("div");
        postInfoContent.className = "post-info__content";
        let postInfoPhoto = document.createElement("div");
        postInfoPhoto.className = "post-info__photo";
        postInfoContent.appendChild(postInfoPhoto);
        let postInfoPhotoImg = document.createElement("img");
        postInfoPhotoImg.src = this._ad.photoLink;
        postInfoPhoto.appendChild(postInfoPhotoImg);
        let postInfoDescription = document.createElement("div");
        postInfoDescription.className = "post-info__description";
        postInfoContent.appendChild(postInfoDescription);
        let title = document.createElement("p");
        title.className = "title";
        title.textContent = "Краткое описание:";
        postInfoDescription.appendChild(title);
        let description = document.createElement("p");
        description.textContent = this._ad.description;
        postInfoDescription.appendChild(description);
        return postInfoContent;
    }

    _createDiscount() {
        let discount = document.createElement("div");
        discount.className = "post-info__discount";
        discount.textContent = "до " + ("0" + this._ad.validUntil.getDay()).slice(-2) + "." + ("0" + this._ad.validUntil.getMonth()).slice(-2) + "." + this._ad.validUntil.getFullYear();
        discount.append(document.createElement("br"));
        discount.append("Скидка:" + this._ad.discount);
        return discount;
    }

    _createTagsNChange() {
        let postInfoTagsNChange = document.createElement("div");
        postInfoTagsNChange.className = "post-info__tags-n-change";

        let postInfoTags = document.createElement("div");
        postInfoTags.className = "post-info__tags";
        postInfoTagsNChange.appendChild(postInfoTags);
        postInfoTags.append(document.createElement("p"));
        postInfoTags.firstChild.textContent = "Теги:"
        this._ad.hashTags.forEach(tag => {
            postInfoTags.appendChild(document.createElement("button")).className = "button-tag";
            postInfoTags.lastChild.textContent = tag;
        });
        if (this._nameUser === this._ad.vendor) {
            let change = document.createElement("div");
            change.className = "change";
            postInfoTagsNChange.appendChild(change);
            change.appendChild(document.createElement("a")).text = "Редактировать";
            change.lastChild.href = "";
            change.append(" ");
            change.appendChild(document.createElement("a")).text = "Удалить";
            change.lastChild.href = "";
        }
        return postInfoTagsNChange;
    }

    _createAuthor() {
        let postInfoAuthor = document.createElement("div");
        postInfoAuthor.className = "post-info__author";
        let link = postInfoAuthor.appendChild(document.createElement("u"))
            .appendChild(document.createElement("p"));
        link.append("ссылка на полное описание: ");
        link.appendChild(document.createElement("a")).href = this._ad.link;
        link.lastChild.textContent = this._ad.link;
        link.lastChild.target = "_blank";
        postInfoAuthor.appendChild(document.createElement("p")).textContent = "Вендор:";
        postInfoAuthor.lastChild.appendChild(document.createElement("br"));
        postInfoAuthor.lastElementChild.append(this._ad.vendor);
        return postInfoAuthor;
    }

    _createComment() {
        let commentArea = document.createElement("div");
        commentArea.className = "comments-area";
        for (let i = 0; i < this._ad.reviews?.length; i++) {
            let userComment = commentArea.appendChild(document.createElement("div"));
            userComment.className = "user-comment";
            let name = userComment.appendChild(document.createElement("div"));
            name.className = "user-comment__author-n-rating";
            name.appendChild(document.createElement("div")).textContent = "Имя Фамилия";
            name.lastElementChild.className = "user-comment__author";
            userComment.appendChild(document.createElement("div")).className = "user-comment__text";
            userComment.lastElementChild.textContent = this._ad.reviews[i];
        }
        return commentArea;
    }

    createPost() {
        let post = document.createElement("div");
        post.className = "post";
        post.id = this._ad.id;
        let postInfo = document.createElement("div");
        postInfo.className = "post-info";
        post.appendChild(postInfo);
        postInfo.appendChild(this._createHead());
        postInfo.appendChild(this._createContent());
        postInfo.appendChild(this._createDiscount());
        postInfo.appendChild(this._createTagsNChange());
        postInfo.appendChild(this._createAuthor());

        let comment = post.appendChild(document.createElement("div"));
        comment.className = "comment";
        if (this._ad.reviews === undefined) {
            comment.appendChild(document.createElement("p")).className = "no-comment";
            comment.lastChild.textContent = "НЕТ ОТЗЫВОВ";
        } else {
            comment.appendChild(this._createComment());
        }
        comment.appendChild(document.createElement("a")).className = "add-comment";
        comment.lastElementChild.textContent = "добавить отзыв";
        comment.lastElementChild.href = "";
        return post;

        // let post = document.getElementsByClassName("post").item(0).cloneNode(true);
        // post.getElementsByClassName("post-info__name").item(0).textContent = "name";
        // post.getElementsByClassName("rating-value").item(0).textContent
        //     = this._ad.rating!==undefined ? this._ad.rating : "N/A";
        // post.getElementsByClassName("post-info__photo").item(0)
        //     .getElementsByTagName("img").item(0).src = this._ad.photoLink;
        // post.getElementsByClassName("post-info__description").item(0)
        //     .getElementsByTagName("p").item(1).textContent = this._ad.description;
        // post.getElementsByClassName("post-info__discount").item(0).textContent
        //     = "до " + this._ad.validUntil.getDay() + "-" + this._ad.validUntil.getMonth() + "-" + this._ad.validUntil.getFullYear();
        // post.getElementsByClassName("post-info__discount").item(0)
        //     .append(document.createElement("br"));
        // post.getElementsByClassName("post-info__discount").item(0)
        //     .append("Скидка:" + this._ad.discount);
        //
        // let i;
        // for (i = 0; i < 3; i++) {
        //     post.getElementsByClassName("button-tag").item(i).textContent = this._ad.hashTags[i];
        // }
        // post.getElementsByClassName("button-tag").item(i).textContent = "...";
        // for(i++ ; i < post.getElementsByClassName("button-tag").length; i++){
        //     post.getElementsByClassName("button-tag").item(i).remove();
        // }
        // if(this._nameUser === this._ad.vendor){
        //
        // }
        // post.getElementsByClassName("post-info__author").item(0)
        //     .getElementsByTagName("a").item(0).href = this._ad.link;
        //
        // post.getElementsByClassName("post-info__author").item(0)
        //     .getElementsByTagName("a").item(0).text = this._ad.link;
        // post.getElementsByClassName("post-info__author").item(0)
        //     .getElementsByTagName("p").item(1).childNodes[2].textContent = this._ad.vendor;
        // let comment = post.getElementsByClassName("comment").item(0);
        // if(ad.reviews != null){
        //     comment.getElementsByClassName("no-comment").item(0).remove();
        // }
        // return post;

    }
}