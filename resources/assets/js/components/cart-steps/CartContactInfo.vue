<template>
	<div id="cart-contact-info">	
		<form @submit.prevent="submitForm" @keyup="debounce(form.validate($event.target.name),500)">
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
				<div class="form-col col-2" :class="{ hasError: !form.adressCountry.isValid }">
					<label>Stát</label>
					<select v-model="form.adressCountry.value">
						<option v-for="country in countries" :key="country.id" v-text="country.country" :value="country.id"></option>
					</select>
					<div class="form-error">{{form.adressCountry.errorMessage}}</div>
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
			<div class="form-row" v-if="!isLoged">
				<div class="form-col col-1">
					<input type="checkbox" name="createAccount" id="createAcountCheck" v-model="form.createAccount.value">
					<label for="createAcountCheck">Vytvořit účet pro pozdější použití</label>
				</div>
			</div>	
			<div class="form-row" v-if="form.createAccount.value && !isLoged">
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
							<option v-for="country in countries" :key="country.id" v-text="country.country" :value="country.id"></option>
						</select>
						<div class="form-error">{{form.deliveryCountry.errorMessage}}</div>
					</div>
					<div class="form-col col-2" :class="{ hasError: !form.deliveryZipCode.isValid }">
						<label>PSČ</label>
						<input type="text" name="deliveryZipCode" v-model="form.deliveryZipCode.value">
						<div class="form-error">{{form.deliveryZipCode.errorMessage}}</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script>

import Form from '../../classes/Form.js';

export default {
	name: 'cart-contact-info',
	data() {
		return {            
			countries: [],
			isLoged: false,
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
				surName: {
					rules: ['if:choosenEntity@private','required']
				},
				company: {
					rules: ['if:choosenEntity@legal','required']
				},
				companyId: {
					rules: ['if:choosenEntity@legal','required']
				},
				vatId: {
					rules: ['if:choosenEntity@legal','required']
				},
				address: {
					rules: ['required']
				},
				houseCode: {
					rules: ['required']
				},
				city: {
					rules: ['required']
				},
				adressCountry: {
					rules: ['required']
				},
				zipCode: {},
				phone: {},
				createAccount: {},
				password: {
					rules: ['if:createAccount@true','required']
				},
				rePassword: {
					rules: ['if:createAccount@true','required']
				},
				sendElseWhere: {},
				deliveryFirstName: {
					rules: ['if:sendElseWhere@true','required']
				},
				deliverySurName: {
					rules: ['if:sendElseWhere@true','required']
				},
				deliveryCompany: {
					rules: ['if:sendElseWhere@true','required']
				},
				deliveryAddress: {
					rules: ['if:sendElseWhere@true','required']
				},
				deliveryHouseCode: {
					rules: ['if:sendElseWhere@true','required']
				},
				deliveryCity: {
					rules: ['if:sendElseWhere@true','required']
				},
				deliveryCountry: {
					rules: ['if:sendElseWhere@true','required']
				},
				deliveryZipCode: {
					rules: ['if:sendElseWhere@true','required']
				}
			}),
            reload: true,
            tiemout: null
		};
	},
	created() {	

		EventBus.$on('nextStep', name => {
			if(this.$options.name == name) this.submitForm();
		});
	},
	activated() {
		this.init();
		if(this.reload) {
			this.reload = false;
		}
	},
	beforeDestroy() {
		EventBus.$off('nextStep');
	},
	methods: {
		init() {
			EventBus.$emit('init-loading');

			fetch('/data/loged.json', {
				method: 'GET'
			})
			.then(response => {
				EventBus.$emit('destroy-loading');
				if(response.ok) {
					response.json().then(({loged,countries, entities}) => {
						this.countries = countries;	
						this.isLoged = loged;				
						if(loged) {
							for (let entitiy in entities) {
								this.form[entitiy].value = 	entities[entitiy];			
							}
						}
					});
				} else {
					response.json().then(errs => {
					
					});
				}
			});
        },
        debounce(func, wait, immediate) {
                var context = this, args = arguments;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(function() {
                    this.timeout = null;
                    if (!immediate) func.apply(context, args);
                }, wait);
                if (immediate && !this.timeout) func.apply(context, args);
        },
		submitForm() {
			EventBus.$emit('init-loading');
			this.form.post('http://cartapi.nettrender.com/api/cart/customer/set')
			//this.form.post('/data/form-incorrect.php')
			.then((data) => {
				EventBus.$emit('destroy-loading');
				EventBus.$emit('cart-next-step');
			})
			.catch((errors) => {
				EventBus.$emit('destroy-loading');
				flash('Některé údaje jste zadali špatně');
			});			
		}
	}
}
</script>

