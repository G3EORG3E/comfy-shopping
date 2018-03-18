export default class Translation {

    static getTranslate(key) {

        if (window.i18n && window.i18n[key]) {
            return window.i18n[key];
        }
        
        return key;
    }
}