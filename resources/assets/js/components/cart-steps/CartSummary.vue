<template>
<div id="cart-summary-step">
		<div class="customerInfo">
			<div class="pane billing">
				<h2>Fakturační Adresa</h2>
				<ul>
					<li v-for="item in customerInfo.billingInfo" :key="item" v-text="item"></li>
				</ul>
			</div>
			<div class="pane shiping">
				<h2>Dodací adresa</h2>
				<ul>
					<li v-for="item in customerInfo.shippingInfo" :key="item" v-text="item"></li>
				</ul>
			</div>
		</div>
		<div class="recap"> 
			<div class="item" v-for="product in cart.products" :key="product.productId">
				<div class="thumbnail">
					<img :src="product.image" alt="">
				</div>
				<div class="label">
					{{ product.productName }}
                    <div class="variant">{{ product.variantName }}</div>
				</div>
				<div class="price-holder">
					{{ product.priceVAT }}
				</div>
			</div>
			<div class="item">				
				<div class="thumbnail">
					<img :src="carrier.image" alt="">
				</div>
				<div class="label">
					{{carrier.label}}
				</div>
				<div class="price-holder">
					{{carrier.price}}
				</div>
			</div>
			<div class="item">
				<div class="thumbnail">
					<img :src="payment.image" alt="">
				</div>
				<div class="label">
					{{ payment.label }}
				</div>
				<div class="price-holder">
					{{ payment.price }}
				</div>
			</div>
		</div>
		<div class="cart-items-summary">
			<div class="price">Cena bez DPH: <strong>{{ cart.summary.price }} </strong></div>
			<div class="price-vat">Cena s DPH: <strong>{{  cart.summary.priceVAT }}</strong></div>
		</div>
		
		<div class="accept-terms">
			<label>
				<input type="checkbox" v-model="acceptTerms"> Shouhlasím s <a href="/test" target="_blank">obchodmína podmínkama</a>
			</label>
		</div>
</div>
</template>

<script>
export default {
	name: 'cart-summary',
	data() {
		return {
			JSON: window.JSON,
			acceptTerms: false,      
			cart: {},
			carrier: {},
			payment: {},
			customerInfo: {}
		}
	},
	created() {
		EventBus.$on('nextStep', name => {
			if(this.$options.name == name)
					this.acceptOrder(); 
		});

		EventBus.$emit('init-loading');
			fetch('http://cartapi.nettrender.com/api/cart/summary/get', {
				method: 'GET'
			})
			.then(response  => {
				EventBus.$emit('destroy-loading');
				if(response.ok) {
					return response.json();
				} else {
					alert("Something went wrong bro :(");
				}
			})
			.then(({cart,carrier,payment,customerInfo}) => {
				this.cart = cart;
				this.carrier = carrier;
				this.payment = payment;
				this.customerInfo = customerInfo;
			});
	},
	methods: {
		acceptOrder() {
			fetch('http://cartapi.nettrender.com/api/cart/terms/check', {
				method: 'POST',
				body: JSON.stringify({ 
					acceptTerms: this.acceptTerms,
				}),
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
			.then(response  => {
				EventBus.$emit('destroy-loading');
				if(response.ok) {
					response.json().then(thanksLink => {
						window.location = thanksLink.link;
					});
				} else {
					response.json().then(error => {
						flash(error.error);
					});
				}
			})
		}
	}
}
</script>

