<template>
    <div id="cart-delivery-info">
			<div v-for="payment in paymentsList" :key="payment.id" class="delivery-item">
				<label>
					<input type="radio" name="payment" :value="payment.id" v-model="selectedPayment">
                    <span class="thumbnail">
                        <img :src="payment.image" :alt="payment.label">
                    </span>
                    <span class="name">{{ payment.label }}
						<span class="desc">{{ payment.description }}</span>
						</span>                    
					<span class="price">{{ payment.price }}</span>
				</label>
                <div class="more-info" v-if="selectedPayment == payment.id">
                    <p class="full-description">{{ payment.longDescription }}</p>
                </div>
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
			EventBus.$emit('init-loading');
			fetch('http://cartapi.nettrender.com/api/cart/payments/get', {
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
			.then((paymentsFetched) => {
				this.paymentsList = paymentsFetched;

                if(this.paymentsList.length) {
                    this.selectedPayment = this.paymentsList[0].id;
                }  
			});
		},
		submitForm() {
			fetch('http://cartapi.nettrender.com/api/cart/payment/set', {
				method: 'POST',
				body: JSON.stringify({ 
					paymentId: this.selectedPayment,
				}),
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
			.then(response  => {
				EventBus.$emit('destroy-loading');
				if(response.ok) {
					EventBus.$emit('cart-next-step');
				} else {
					flash("Nastale neočekavaná chyba, zkuste to později.");
				}
			})
		}
	}
}
</script>

