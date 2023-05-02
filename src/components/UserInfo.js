import { api } from './Api';

export default class UserInfo {
    constructor({ nameSelector, descriptionSelector, imageSelector }) {
        this._nameSelector = nameSelector;
        this._descriptionSelector = descriptionSelector;
        this._imageSelector = imageSelector;
        this._userId = '';
    }

    _putInDom(name, about, image) {
        document.querySelector(this._nameSelector).textContent = name;
        document.querySelector(this._descriptionSelector).textContent = about;
        document.querySelector(this._imageSelector).src = image;
    }

    getUserInfo() {
        return api.getUserInfo()
            .then((responceUserInfo) => {
                this._putInDom(responceUserInfo.name, responceUserInfo.about, responceUserInfo.avatar)
                this._userId = responceUserInfo._id;
                return responceUserInfo;
            })
    }

    getUserId() {
        return this._userId
    }

    setUserInfo(name, job) {
        return api.editUserInfo(name, job)
            .then((userInfo) => {
                this._putInDom(userInfo.name, userInfo.about, userInfo.avatar);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    setUserPicture(url) {
        return api.changeAvatar(url)
            .then((userInfo) => {
                this._putInDom(userInfo.name, userInfo.about, userInfo.avatar)
            })
            .catch((err) => {
                console.log(err);
            })
    }

}