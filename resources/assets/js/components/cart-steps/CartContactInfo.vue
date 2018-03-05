<template>
	<div id="cart-contact-info">	
		<form @submit.prevent="submitForm" @keyup="form.validate($event.target.name)">
			<div class="form-row">
				<div class="form-col col-1" :class="{ hasError: !form.email.isValid }">
					<label>E-mail</label>
					<input type="text" name="email" v-model="form.email.value">
					<div class="form-error">{{form.email.errorMessage}}</div>
				</div>
			</div>
			<div class="form-row">
				<div class="form-col col-2">
					<input type="radio" id="one" value="private" v-model="form.choosenEntity.value">
					<label for="one">Koncový zákazník</label>
				</div>
				<div class="form-col col-2">
					<input type="radio" id="two" value="legal" v-model="form.choosenEntity.value">
					<label for="two">Firma</label>
				</div>
			</div>
			<div class="form-row" v-if="form.choosenEntity.value == 'private'">
				<div class="form-col col-2" :class="{ hasError: !form.firstName.isValid }">
					<label>Jméno</label>
					<input type="text" name="firstName" v-model="form.firstName.value">
					<div class="form-error">{{form.firstName.errorMessage}}</div>
				</div>
				<div class="form-col col-2" :class="{ hasError: !form.surName.isValid }">
					<label>Příjmení</label>
					<input type="text" name="surName" v-model="form.surName.value">
					<div class="form-error">{{form.surName.errorMessage}}</div>
				</div>
			</div>
			<div class="form-row" v-if="form.choosenEntity.value == 'legal'">
				<div class="form-col col-1" :class="{ hasError: !form.company.isValid }">
					<label>Firma</label>
					<input type="text" name="company" v-model="form.company.value">
					<div class="form-error">{{form.company.errorMessage}}</div>
				</div>
			</div>
			<div class="form-row" v-if="form.choosenEntity.value == 'legal'">
				<div class="form-col col-2" :class="{ hasError: !form.companyId.isValid }">
					<label>IČ</label>
					<input type="text" name="companyId" v-model="form.companyId.value">
					<div class="form-error">{{form.companyId.errorMessage}}</div>
				</div>
				<div class="form-col col-2" :class="{ hasError: !form.vatId.isValid }">
					<label>DIČ</label>
					<input type="text" name="vatId" v-model="form.vatId.value">
					<div class="form-error">{{form.vatId.errorMessage}}</div>
				</div>
			</div>
			<div class="form-row">
				<div class="form-col col-2" :class="{ hasError: !form.address.isValid }">
					<label>Adresa</label>
					<input type="text" name="address" v-model="form.address.value">
					<div class="form-error">{{form.address.errorMessage}}</div>
				</div>
				<div class="form-col col-2" :class="{ hasError: !form.houseCode.isValid }">
					<label>č.p.</label>
					<input type="text" name="houseCode" v-model="form.houseCode.value">
					<div class="form-error">{{form.houseCode.errorMessage}}</div>
				</div>
			</div>	
			<div class="form-row">
				<div class="form-col col-1" :class="{ hasError: !form.city.isValid }">
					<label>Město</label>
					<input type="text" name="city" v-model="form.city.value">
					<div class="form-error">{{form.city.errorMessage}}</div>
				</div>
			</div>
			<div class="form-row">
				<div class="form-col col-2" :class="{ hasError: !form.country.isValid }">
					<label>Stát</label>
					<select v-model="form.country.value">
						<option v-for="country in countries" :key="country" v-text="country"></option>
					</select>
				</div>
				<div class="form-col col-2" :class="{ hasError: !form.zipCode.isValid }">
					<label>PSČ</label>
					<input type="text" name="zipCode" v-model="form.zipCode.value">
					<div class="form-error">{{form.zipCode.errorMessage}}</div>
				</div>
			</div>
			<div class="form-row">
				<div class="form-col col-1" :class="{ hasError: !form.phone.isValid }">
					<label>Telefon:</label>
					<input type="text" name="phone" v-model="form.phone.value">
					<div class="form-error">{{form.phone.errorMessage}}</div>
				</div>
			</div>
			<div class="form-row">
				<div class="form-col col-1">
					<input type="checkbox" name="createAccount" id="createAcountCheck" v-model="form.createAccount.value">
					<label for="createAcountCheck">Vytvořit účet pro pozdější použití</label>
				</div>
			</div>	
			<div class="form-row" v-if="form.createAccount.value">
				<div class="form-col col-2" :class="{ hasError: !form.password.isValid }">
					<label>Heslo</label>
					<input type="password" name="password" v-model="form.password.value">
					<div class="form-error">{{form.password.errorMessage}}</div>
				</div>
				<div class="form-col col-2" :class="{ hasError: !form.rePassword.isValid }">
					<label>Heslo znovu</label>
					<input type="password" name="rePassword" v-model="form.rePassword.value">
					<div class="form-error">{{form.rePassword.errorMessage}}</div>
				</div>
			</div>
			<div class="form-row">
				<div class="form-col col-1">
					<input type="checkbox" name="sendElseWhere" id="sendElseWhereCheck" v-model="form.sendElseWhere.value">
					<label for="sendElseWhereCheck">Doručit na jinou adresu</label>
				</div>
			</div>
			<div v-if="form.sendElseWhere.value">
				<div class="form-row">
					<div class="form-col col-2" :class="{ hasError: !form.deliveryFirstName.isValid }">
						<label>Jméno</label>
						<input type="text" name="deliveryFirstName" v-model="form.deliveryFirstName.value">
						<div class="form-error">{{form.deliveryFirstName.errorMessage}}</div>
					</div>
					<div class="form-col col-2" :class="{ hasError: !form.deliverySurName.isValid }">
						<label>Příjmení</label>
						<input type="text" name="deliverySurName" v-model="form.deliverySurName.value">
						<div class="form-error">{{form.deliverySurName.errorMessage}}</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col col-1" :class="{ hasError: !form.deliveryCompany.isValid }">
						<label>Firma</label>
						<input type="text" name="deliveryCompany" v-model="form.deliveryCompany.value">
						<div class="form-error">{{form.deliveryCompany.errorMessage}}</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col col-2" :class="{ hasError: !form.deliveryAddress.isValid }">
						<label>Adresa</label>
						<input type="text" name="deliveryAddress" v-model="form.deliveryAddress.value">
						<div class="form-error">{{form.deliveryAddress.errorMessage}}</div>
					</div>
					<div class="form-col col-2" :class="{ hasError: !form.deliveryHouseCode.isValid }">
						<label>č.p.</label>
						<input type="text" name="deliveryHouseCode" v-model="form.deliveryHouseCode.value">
						<div class="form-error">{{form.deliveryHouseCode.errorMessage}}</div>
					</div>
				</div>	
				<div class="form-row">
					<div class="form-col col-1" :class="{ hasError: !form.deliveryCity.isValid }">
						<label>Město</label>
						<input type="text" name="deliveryCity" v-model="form.deliveryCity.value">
						<div class="form-error">{{form.deliveryCity.errorMessage}}</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col col-2" :class="{ hasError: !form.deliveryCountry.isValid }">
						<label>Stát</label>
						<select v-model="form.deliveryCountry.value">
							<option v-for="country in countries" :key="country" v-text="country"></option>
						</select>
					</div>
					<div class="form-col col-2" :class="{ hasError: !form.deliveryZipCode.isValid }">
						<label>PSČ</label>
						<input type="text" name="deliveryZipCode" v-model="form.deliveryZipCode.value">
						<div class="form-error">{{form.deliveryZipCode.errorMessage}}</div>
					</div>
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

	static email(value) {
		let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		return pattern.test(value);
	}

	static min(value,min) {
		return (value.length >= min);
	}

	static max(value,min) {
		return (value.length <= min);
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
			countries: ['Česká Republika', 'Slovenská Republka'],
			form: new Form({
				email: {
					rules: ['email','required'],
					errorMessage: "Zadejte realný email"
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
				companyId: {},
				vatId: {},
				address: {},
				houseCode: {},
				city: {},
				country: {
					rules: ['required']
				},
				zipCode: {},
				phone: {},
				createAccount: {},
				password: {},
				rePassword: {
					rules: ['match:password']
				},
				sendElseWhere: {},
				deliveryFirstName: {
					rules: ['if:sendElseWhere@true','required']
				},
				deliverySurName: {},
				deliveryCompany: {},
				deliveryAddress: {},
				deliveryHouseCode: {},
				deliveryCity: {},
				deliveryCountry: {},
				deliveryZipCode: {},
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

