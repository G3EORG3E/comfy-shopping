<template>
  <div id="quick-detail" :class="{ active: isVisible }" @click="hideDetail">
	  <div class="detail-holder" @click.stop>
		  <div class="left">
			  <div class="thumbnail">
				  <img :src="product.image" :alt="product.name">
			  </div>
		  </div>
		  <div class="right">
				<h2>{{ product.productName }}</h2>
				<p class="desc">{{ product.descriptionSummary }}</p>
				<div class="info code"><strong>Kód produktu: </strong><span>{{ product.code }}</span></div> 
				<div class="info producer"><strong>Výrobce: </strong><span>{{ product.producerName }}</span></div> 
				<div class="variant">
					<strong>Varianta:</strong>
					<select v-model="selctedVariantId">
						<option :value="variant.variantId" v-for="variant in product.variants" :key="variant.variantId" v-text="variant.variantName"></option>
					</select>
				</div>
				<div class="info stock in"><strong>Skladem: </strong><span>{{ selctedVariantObj.stockCount }}</span></div> 
				<div class="price">
					<div class="price-holder novat"><strong>Cena bez DPH:</strong><span>{{ selctedVariantObj.price }}</span></div>
					<div class="price-holder vat"><strong>Cena s DPH:</strong><span>{{ selctedVariantObj.priceVAT }}</span></div>
				</div>
				<div class="to-cart">
                     <int-up-down v-model="product.amount"></int-up-down>
					<a href="#" class="btn" @click.prevent="addToCart">Přidat do košíku</a>
				</div>
		  </div>
	  </div>
  </div>
</template>
<script>
import findIndex from 'lodash.findindex'; 

export default {
	data() {
		return {
			isVisible: false,
			product: {
				productId: 1,
				productName: '',
				image: '',
				descriptionSummary: '',
				code: '',
				producerName: '',
				variants: [
					{
						variantId: 1,
						variantName: '',
						price: '',
						priceVAT: '',
						stockCount: '',
					}
				],
				amount: 1
			},
			selctedVariantId: 0,
			selctedVariantObj: {}
		}
	},
	watch: {
		selctedVariantId(variantID) {
			let index = findIndex(this.product.variants, o => { return o.variantId === variantID });
			this.selctedVariantObj = this.product.variants[index];
		}
	},
	created() {		
		EventBus.$on('load-product-detail', (product) => {
			this.loadDetail(product.id);
		});
		
	},
	methods: {
		loadDetail(id) {		

			fetch('http://cartapi.nettrender.com/api/product/detail/get', {
				method: 'POST',
				body: JSON.stringify({productId: id}),
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			})
			.then(response  => {
				if(response.ok) {
					return response.json();
				} else {
					alert("Something went wrong bro :(");
				}
			})
			.then((getedProduct) => {
                this.product = getedProduct;                
				this.product['amount'] = 1;

				this.selctedVariantId = this.product.variants[0].variantId;
				EventBus.$emit('show-page-cover');
				this.isVisible = true;
			});
		},
		hideDetail() {
			EventBus.$emit('hide-page-cover');
			this.isVisible = false;
		},
		addToCart() {
			EventBus.$emit('add-to-cart', { "productId": this.product.productId, "variantId": this.selctedVariantObj.variantId, "amount": this.product.amount });
			this.isVisible = false;
		}
	}
}
</script>
 