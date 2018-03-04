<template>
	<div id="cart-contact-info">
		<form @submit.prevent="submitForm" @keyup="form.validate($event.target.name)">
			<div class="form-item">
				<div class="input-holder">
					<label>E-mail</label>
					<input type="text" name="email" v-model="form.email.value">
					<div v-if="!form.email.isValid">{{form.email.errorMessage}}</div>
				</div>
			</div>
			<div class="form-item">
				<div class="input-holder">
					<div>
						<input type="radio" id="one" value="private" v-model="form.choosenEntity.value">
						<label for="one">Koncový zákazník</label>
					</div>
					<div>
						<input type="radio" id="two" value="legal" v-model="form.choosenEntity.value">
						<label for="two">Firma</label>						
					</div>
				</div>
			</div>
			<div class="form-item" v-if="form.choosenEntity.value == 'private'">
				<div class="input-holder">
					<label>Jméno</label>
					<input type="text" name="firstName" v-model="form.firstName.value">
					<div v-if="!form.firstName.isValid">{{form.firstName.errorMessage}}</div>
				</div>
			</div>
			<div class="form-item" v-if="form.choosenEntity.value == 'legal'">
				<div class="input-holder">
					<label>Firma</label>
					<input type="text" name="company" v-model="form.company.value">
					<div v-if="!form.company.isValid">{{form.firstName.errorMessage}}</div>
				</div>
			</div>
			<input type="submit" value="send me beeatch">
		</form>
	</div>
</template>

<script>

class Validation {
	static required(value) {
		return !!value.length;
	}

	static min(value,min) {
		return (value.length >= min);
	}
}

class Form {
	// data expect this object: {filedName:{value:"",rules:[],errorMsg: ""},...}
	constructor(data) {
		this.fieldAttrs = [];
		this.invalidFields = new Set();

		for (let field in data) {
			this[field] = {};
			this[field].value = (data[field].hasOwnProperty('value') ? data[field].value : '');
			this[field].rules = (data[field].hasOwnProperty('rules') ? data[field].rules : []);
			this[field].errorMessage = (data[field].hasOwnProperty('errorMessage') ? data[field].errorMessage : "Default Message");
			this[field].isValid = true;
			
			this.fieldAttrs.push(field);
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
		let propertyValue = this[property].value;

		for (let rule of this[property].rules) {
			let ruleParts = rule.split(':');
			let ruleMethod = ruleParts[0];
			let ruleArg = ruleParts[1]; 

			if (ruleMethod == 'if') {
				let ifArgs = ruleArg.split('@');

				if((this[ifArgs[0]].value == ifArgs[1])) continue;
				else valid = true;	break;
			}

			if(Validation.hasOwnProperty(ruleParts[0])) {
				let validStep = (ruleParts.length == 1 ? Validation[ruleMethod](propertyValue) : Validation[ruleMethod](propertyValue,ruleArg));
				valid = valid && validStep;
				if(valid == false) break;
			}
		}

		if(!valid) {
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

		if(this.invalidFields.size > 0) return false;

		return true;
	}

	proccesServerErrors(invalidFields) {

		console.log(invalidFields);

		for (let error in invalidFields) {
			console.log(error);
			//data[property] = this[property].errorMessage;            
		}

	}

	submit(method,url) {
		return new Promise((resolve,reject) => {

			if(this.isValid()) {
				fetch(url, {
					method: 'POST',  
					body: this.data()
				})
				.then(response => {
					if(response.ok) {
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
		return this.submit('POST',url);
	}
}

export default {
	data() {
		return {            
			form: new Form({
				email: {
					value: 'asd',
					rules: ['min:3','required'],
					errorMessage: "Toto pole je povinné"
				},
				choosenEntity: {
					value: 'private',
					rules: ['required']
				},
				firstName: {
					rules: ['if:choosenEntity@private','required']
				},
				surName: {},
				company: {
					rules: ['if:choosenEntity@legal','required']
				},
				id: {},
				vatId: {},
				address: {},
				houseCode: {},
				city: {},
				zipCode: {},
				phone: {}
			}),
			isCorrect: false
		};
	},
	methods: {
		submitForm() {
			//this.form.post('/data/form-correct.json')
			this.form.post('/data/form-incorrect.php')
			.then((data) => {
				this.isCorrect = true;
			})
			.catch((errors) => {
				this.isCorrect = false;
			});
			
		}
	}
}
</script>

