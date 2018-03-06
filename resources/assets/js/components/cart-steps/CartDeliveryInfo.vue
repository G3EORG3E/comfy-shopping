<template>
	<div id="cart-delivery-info">
			<div v-for="delivery in deliveriesList" :key="delivery.id">
				<label>
					{{delivery.label}}
					<input type="radio" name="delivery" :value="delivery.id" v-model="selectedDelivery">
				</label>
				<select id="zasilkovna" v-if="delivery.hasOwnProperty('places')">
					<option v-for="place in delivery.places" :key="place.placeId" :value="place.placeId">{{place.placeLabel}}</option>
				</select>
			</div>
	</div>
</template>

<script>
export default {
	name: 'cart-delivery-info',
	data() {
		return {
			deliveriesList: [],
			selectedDelivery: ''
		}
	},
	created() {
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
	}
}
</script>

