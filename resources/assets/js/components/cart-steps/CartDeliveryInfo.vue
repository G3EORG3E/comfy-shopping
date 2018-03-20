<template>
	<div id="cart-delivery-info">
			<div v-for="delivery in deliveriesList" :key="delivery.id" class="delivery-item">
				<label>
					<input type="radio" name="delivery" :value="delivery.id" v-model="selectedDelivery">
                    <span class="thumbnail">
                        <img :src="delivery.image" :alt="delivery.label">
                    </span>
                    <span class="name">{{ delivery.label }}
						<span class="desc">{{ delivery.description }}</span>
						</span>                    
					<span class="price">{{ delivery.price }}</span>
				</label>
				<transition name="accordion">  
					<div class="more-info" v-if="delivery.hasOwnProperty('aditional') && delivery.id == selectedDelivery">
						<p class="full-description">
							{{delivery.aditional.fullDescription}}
						</p>
						<select id="zasilkovna" v-if="delivery.aditional.hasOwnProperty('places')" v-model="selectedPlace">
							<option v-for="place in delivery.aditional.places" :key="place.placeId" :value="place.placeId">{{place.placeLabel}}</option>
						</select>
					</div>
				</transition>
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
			reload: true
		}
    },
    watch: {
        selectedDelivery(id) {
            if(id) this.fetchAdditional(id);
        }
    },
	created() {
		EventBus.$on('nextStep', name => {
			if(this.$options.name == name) this.submitForm(); 
		});	
	},
	activated() {
		if(this.reload) {
			this.reload = false;
			this.selectedPlace= '',
			this.init();
		}
	},
	methods: {
		init() {
			EventBus.$emit('init-loading');
			fetch('http://cartapi.nettrender.com/api/cart/carriers/get', {
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
			this.selectedPlace = '';

			if(!this.deliveriesList[index].hasOwnProperty('aditional')) {
				EventBus.$emit('init-loading');
				fetch('http://cartapi.nettrender.com/api/cart/carrier/detail/get', {
					method: 'POST',
					body: JSON.stringify({ carrierId: this.selectedDelivery }),
					headers: new Headers({
						'Content-Type': 'application/json'
					})
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

                    if(delDetail.hasOwnProperty('places') && delDetail.places.length) {
                        this.selectedPlace = delDetail.places[0].placeId;
                    }
				});
			} else {
				if(this.deliveriesList[index].aditional.hasOwnProperty('places') && this.deliveriesList[index].aditional.places.length) {
					this.selectedPlace = this.deliveriesList[index].aditional.places[0].placeId;
				}
			}
		},
		submitForm() {
			EventBus.$emit('init-loading');
				fetch('http://cartapi.nettrender.com/api/cart/carrier/set', {
					method: 'POST',
					body: JSON.stringify({ 
						carrierId: this.selectedDelivery,
						placeId: this.selectedPlace
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

