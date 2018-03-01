<template>
    <div id="cart-contact-info">
        <div class="form-item">
            <div class="input-holder">
                <label>E-mail</label>
                <input type="text" v-model="form.email" v-on:keyup="form.validate('email',['reuired','email','fiveplus'])">
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
            this[field] = data[field];
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

    validate(property, rulesArr) {

        let validObj = {
            reuired: function(value) { return !!value.length },
            fiveplus: function(value) { return (value.length >= 5) }
        }

        let valid = true;

        for (let rule of rulesArr) {
            if(validObj.hasOwnProperty(rule)) {
                valid = valid && validObj[rule](this[property]);
                if(valid == false) break;
            }
        }

        console.log(valid);
    }
}

export default {
  data() {
        return {            
            form: new Form({
                email: '',
                firstName: '',
                surName: '',
                company: '',
                id: '',
                vatId: '',
                address: '' ,
                houseCode: '',
                city: '',
                zipCode: '',
                phone: ''
            })
        };
  }
}
</script>

