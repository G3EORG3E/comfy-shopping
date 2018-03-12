<template>
	<div id="cart-delivery-info">
		<ul>
            <li v-for="payment in paymentsList" :key="payment.paymentId">{{ payment.name }}</li>
        </ul>
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
			fetch('/data/payments.json', {
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

