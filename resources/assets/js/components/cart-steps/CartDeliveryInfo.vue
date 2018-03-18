<template>
	<div id="cart-delivery-info">
			<div v-for="delivery in deliveriesList" :key="delivery.id" class="delivery-item">
				<label>
					<input type="radio" name="delivery" :value="delivery.id" v-model="selectedDelivery">
                    <span class="thumbnail">
                        <img :src="delivery.image" :alt="delivery.label">
                    </span>
                    <span class="name">{{ delivery.label }}</span>
                    <span class="desc">{{ delivery.description }}</span>
					<span class="price">{{ delivery.price }}</span>
				</label>
				<div class="more-info" v-if="delivery.hasOwnProperty('aditional') && delivery.id == selectedDelivery">
                    <p class="full-description">
                        {{delivery.aditional.fullDescription}}
                    </p>
					<select id="zasilkovna" v-if="delivery.hasOwnProperty('aditional')" v-model="selectedPlace">
						<option v-for="place in delivery.aditional.places" :key="place.placeId" :value="place.placeId">{{place.placeLabel}}</option>
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
			selectedPlace: '',
			reload: false
		}
    },
    watch: {
        selectedDelivery(id) {
            this.fetchAdditional(id);
        }
    },
	created() {
		EventBus.$on('nextStep', name => {
			if(this.$options.name == name) this.submitForm(); 
		});

		this.init();		
	},
	activated() {
		if(this.reload) {
			this.init();
			this.reload = false;
			this.selectedDelivery = '';
			this.selectedPlace = '';
		}
	},
	methods: {
		init() {
			EventBus.$emit('init-loading');
			fetch('/data/delivery.json', {
				method: 'GET'
			})
			.then(response  => {
				EventBus.$emit('destroy-loading');
				if(response.ok) {
					return response.json();
				} else {
					flash("Nastale neočekavaná chyba, zkuste to později.");
				}
			})
			.then((deliveriesArr) => {
                this.deliveriesList = deliveriesArr;
                if(this.deliveriesList.length) {
                    this.selectedDelivery = this.deliveriesList[0].id;
                }                
            });
		}, 
		fetchAdditional(deliveryId) {
			let index = findIndex(this.deliveriesList, o => { return o.id === deliveryId });
			if(!this.deliveriesList[index].hasOwnProperty('aditional')) {
				EventBus.$emit('init-loading');
				fetch('/data/delivery-detail.json', {
					method: 'POST',
					body: {id: deliveryId}
				})
				.then(response  => {
					EventBus.$emit('destroy-loading');
					if(response.ok) {
						return response.json();
					} else {
						flash("Nastale neočekavaná chyba, zkuste to později.");
					}
				})
				.then((delDetail) => {
					let forUpdate = this.deliveriesList[index];
					forUpdate.aditional = delDetail;
                    Vue.set(this.deliveriesList, index, forUpdate);

                    console.log(delDetail);

                    if(delDetail.places.length) {
                        this.selectedPlace = delDetail.places[0].placeId;
                    }
				});
			}
		},
		submitForm() {
			EventBus.$emit('cart-next-step');
		}
	}
}
</script>

