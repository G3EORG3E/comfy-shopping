<template>
    <div id="cart-contact-info">
        <div class="form-item">
            <div class="input-holder">
                <label>E-mail</label>
                <input type="text" v-model="form.email.value" @keyup="form.validate('email')">
            </div>
            <div v-if="form.hasError('email')" class="error">Msg</div>
        </div>
    </div>
</template>

<script>

class Errors {
    constructor () {
        this.errors = {};
    }

    isValid() {

    }
} 

class Form {
    constructor(data) {
        this.initialData = data;

        for (let field in data) {
            this[field] = data[field].value;
        }

        this.errors = new Errors();
    }

    data() {
        let data = {};

        for (let property in this.initialData) {
            data[property] = this[property];
        }

        return data;
    }

    hasError() {
        return false;
    }

    validate(property) {

        let validObj = {
            reuired(value) { return !!value.length },
            fiveplus(value) { return (value.length >= 5) }
        }

        let valid = true;

        for (let rule of this.initialData[property][rules]) {
            if(validObj.hasOwnProperty(rule)) {
                valid = valid && validObj[rule](this[property]);
                if(valid == false) break;
            }
        }

        //console.log(valid);
    }
}

export default {
    data() {
        return {            
            form: new Form({
                email: {
                    value: 'asd',
                    rules: ['required','fiveplus']
                },
                firstName: {
                    value: '',
                    rules: ['required','fiveplus']
                },
                surName: {
                    value: '',
                    rules: ['required','fiveplus']
                },
                company: {
                    value: '',
                    rules: ['required','fiveplus']
                },
                id: {
                    value: '',
                    rules: ['required','fiveplus']
                },
                vatId: {
                    value: '',
                    rules: ['required','fiveplus']
                },
                address: {
                    value: '',
                    rules: ['required','fiveplus']
                },
                houseCode: {
                    value: '',
                    rules: ['required','fiveplus']
                },
                city: {
                    value: '',
                    rules: ['required','fiveplus']
                },
                zipCode: {
                    value: '',
                    rules: ['required','fiveplus']
                },
                phone: {
                    value: '',
                    rules: ['required','fiveplus']
                }
            })
        };
    }
}
</script>

