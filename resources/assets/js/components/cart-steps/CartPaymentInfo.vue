<template>
    <div id="cart-delivery-info">
			<div v-for="payment in paymentsList" :key="payment.id" class="delivery-item">
				<label>
					<input type="radio" name="payment" :value="payment.id" v-model="selectedPayment">
                    <span class="thumbnail">
                        <img :src="payment.image" :alt="payment.label">
                    </span>
                    <span class="name">{{ payment.label }}</span>
                    <span class="desc">{{ payment.description }}</span>
					<span class="price">{{ payment.price }}</span>
				</label>
			</div>
	</div>
</template>

<script>
export default {
name: 'cart-payment-info',	
	data() {
		return {
			paymentsList: [],
			selectedPayment: '',
			reload: false
		}
	},
	created() {
		EventBus.$on('nextStep', name => {
            if(this.$options.name == name)
                this.submitForm(); 
		});

		this.init();		
	},
	activated() {
		if(this.reload) {
			this.init();
			this.reload = false;
			this.selectedPayment = '';
		}
	},
	methods: {
		init() {
			fetch('/data/payment.json', {
				method: 'GET'
			})
			.then(response  => {
				if(response.ok) {
					return response.json();
				} else {
					alert("Something went wrong bro :(");
				}
			})
			.then((paymentsFetched) => {
				this.paymentsList = paymentsFetched;
			});
		},
		submitForm() {
			EventBus.$emit('cart-next-step');
		}
	}
}
</script>

