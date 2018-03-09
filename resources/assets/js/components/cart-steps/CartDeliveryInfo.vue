<template>
	<div id="cart-delivery-info">
			<div v-for="delivery in deliveriesList" :key="delivery.id">
				<label>
					{{delivery.label}}
					<input type="radio" name="delivery" :value="delivery.id" v-model="selectedDelivery" @change="fetchAdditional(delivery.id)">
				</label>
				<div class="more-info" v-if="delivery.hasOwnProperty('new') && delivery.id == selectedDelivery">
					<select id="zasilkovna" v-if="delivery.hasOwnProperty('new')" v-model="selectedPlace">
						<option v-for="place in delivery.new.places" :key="place.placeId" :value="place.placeId">{{place.placeLabel}}</option>
					</select>
				</div>
			</div>
	</div>
</template>

<script>
import findIndex from 'lodash.findindex'; 
export default {
	name: 'cart-delivery-info',
	data() {
		return {
			deliveriesList: [],
			selectedDelivery: '',
			selectedPlace: ''
		}
	},
	created() {
		EventBus.$on('nextStep', name => {
			if(this.$options.name == name) this.submitForm(); 
		});

		fetch('/data/deliveries.json', {
				method: 'GET'
			})
			.then(response  => {
				if(response.ok) {
					return response.json();
				} else {
					alert("Something went wrong bro :(");
				}
			})
			.then((delArrr) => {
				this.deliveriesList = delArrr;
			});
	},
	methods: {
		fetchAdditional(deliveryId) {
			let index = findIndex(this.deliveriesList, o => { return o.id === deliveryId });
			if(!this.deliveriesList[index].hasOwnProperty('new')) {
				fetch('/data/delivery-detail.json', {
					method: 'POST',
					body: {id: deliveryId}
				})
				.then(response  => {
					if(response.ok) {
						return response.json();
					} else {
						alert("Something went wrong bro :(");
					}
				})
				.then((delDetail) => {
					let newe = this.deliveriesList[index]
					newe.new = delDetail;
					Vue.set(this.deliveriesList, index, newe)
				});
			}
		},
		submitForm() {
			EventBus.$emit('cart-next-step');
		}
	}
}
</script>

