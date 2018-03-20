import Validation from "./Validation.js";

export default class Form {
    // data expect this object: {filedName:{value:"",rules:[],errorMsg: ""},...}
    constructor(data) {
        this.fieldAttrs = [];
        this.invalidFields = new Set();

        for (let field in data) {
            this[field] = {};
            this[field].value = (data[field].hasOwnProperty('value') ? data[field].value : '');
            this[field].rules = (data[field].hasOwnProperty('rules') ? data[field].rules : []);
            this[field].errorMessage = (data[field].hasOwnProperty('errorMessage') ? data[field].errorMessage : __('default-error'));
            this[field].isValid = true;

            this.fieldAttrs.push(field);

            this.serverErrors = [];
        }
    }

    data() {
        let data = {};

        for (let property of this.fieldAttrs) {
            data[property] = this[property].value;
        }

        return data;
    }

    getErrors() {
        let data = {};

        for (let property of this.invalidFields) {
            data[property] = this[property].errorMessage;
        }

        return data;
    }

    validate(property) {

        let valid = true;
        let propertyValue = this[property].value.toString();

        for (let rule of this[property].rules) {
            let ruleParts = rule.split(':');
            let ruleMethod = ruleParts[0];
            let ruleArg = ruleParts[1];

            if (ruleMethod == 'if') {
                let ifArgs = ruleArg.split('@');

                if ((this[ifArgs[0]].value.toString() === ifArgs[1])) continue;
                else valid = true; break;
            }

            if (Validation.hasOwnProperty(ruleParts[0])) {
                let validStep = (ruleParts.length == 1 ? Validation[ruleMethod](propertyValue) : Validation[ruleMethod](propertyValue, ruleArg));
                valid = valid && validStep;
                if (valid == false) break;
            }
        }

        if (!valid) {
            this[property].isValid = false;
            this.invalidFields.add(property);
        } else {
            this[property].isValid = true;
            this.invalidFields.delete(property);
        }
    }

    validateAll() {
        for (let property of this.fieldAttrs) {
            this.validate(property);
        }
    }

    isValid() {
        this.validateAll();

        if (this.invalidFields.size > 0) return false;

        return true;
    }

    proccesServerErrors(invalidFields) {

        let fieldsArr = [];

        for (let error in invalidFields) {
            console.log(error);
            //data[property] = this[property].errorMessage;            
        }

    }

    submit(method, url) {
        return new Promise((resolve, reject) => {

            if (this.isValid()) {
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(this.data()),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                    .then(response => {
                        if (response.ok) {
                            response.json().then(data => {
                                resolve(data);
                            });
                        } else {
                            response.json().then(errs => {
                                this.proccesServerErrors(errs);
                                reject(errs);
                            });
                        }
                    });
            } else {
                reject(this.getErrors());
            }
        });
    }

    post(url) {
        return this.submit('POST', url);
    }
}