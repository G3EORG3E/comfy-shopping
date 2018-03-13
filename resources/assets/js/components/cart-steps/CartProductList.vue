<template>
	<div id="cart-product-list">	
		<transition-group name="list" tag="ul" class="cart-products">
			<li class="cart-product" v-for="product in products" :key="product.id">
				<div class="thumbnail">
					<a href="#"><img src="/images/prod.png" alt="mysterybox"></a>
				</div>
				<div class="info">
					<div class="product">
						<a href="#">{{ product.name }}</a>
					</div>
					<div class="variant">XXL - Purple light</div>
				</div>
				<div class="qty">
					<div class="decrease" @click="product.count--">-</div>
					<input type="text" v-model="product.count" min="1" @blur="(product.count < 1 ? product.count=1 : product.count= Math.floor(product.count))">
					<div class="increase" @click="product.count++">+</div>
				</div>
				<div class="price">
					<div class="base">17 958 Kč bez DPH</div>
					<div class="vat">{{ product.price }}</div>
				</div>
				<div class="remove" @click.prevent="removeProd(product)"></div>
			</li>
		</transition-group>
		<p class="empty-cart" v-if="products.length == 0">Košík je prázdný</p>
		<div class="bottom-status" v-if="products.length != 0">
			<div>
				<input type="text" placeholder="Voucher Code" v-model="voucherCode">
				<button @click="voucherValidate">Submit</button>
			</div>
			<div class="cart-items-summary">
				<div class="price">Cena bez DPH: <strong>{{ summary.price }} {{ summary.currency }}</strong></div>
				<div class="price-vat">Cena s DPH: <strong>{{ summary.priceVat }} {{ summary.currency }}</strong></div>
			</div>
		</div>
	</div>
</template>

<script>
import findIndex from 'lodash.findindex'; 

export default {
	name: 'cart-product-list',
  	data() {
		return {
			products: [],
			summary: {},
			voucherCode: ''
		}; 
	},
	computed: {
		itemsCount() {
			return this.products.length;
		}
	},
	watch: {
		summary: {
			handler() {
				EventBus.$emit('refresh-status', this.summary, this.itemsCount);
			},
			deep: true
		} 
	},       
	created() {
		this.fetchInit();
		EventBus.$on('add-to-cart',  (product) => this.fetchOnAdd(product));
		EventBus.$emit('refresh-status', this.summary, this.itemsCount );
		EventBus.$on('nextStep', (name) => {
			if(this.$options.name == name) {
				if(this.products.length > 0)
					EventBus.$emit('cart-next-step');
				else 
					flash('Košík je prazdný');
			}
		});
	},
	beforeDestroy() {
		EventBus.$off('add-to-cart');
		EventBus.$off('nextStep');
	},   
	methods: {
		addProd(prod) {
			let index = findIndex(this.products, o => { return o.id === prod.id });

			if(index === -1) {
				prod.count = 1;
				this.products.push(prod);
			}
			else {
				this.products[index].count++;                
				Vue.set(this.products, index, this.products[index]);
			}
		},
		removeProd(prod) {
			fetch('/data/remove-response.json', {
				method: 'GET'
			})
			.then(response  => {
				if(response.ok) {
					return response.json();
				} else {
					alert("Something went wrong bro :(");
				}
			})
			.then((summary) => {
				let index = this.products.indexOf(prod);
				this.products.splice(index, 1);

				this.summary = summary;
			});
		},
		voucherValidate() {
            EventBus.$emit('init-loading');
			fetch('/data/voucher-response.json', {
				method: 'POST'
			})
			.then(response  => {
                EventBus.$emit('destroy-loading');
                if(response.ok) {
                    return response.json();
				} else {
                    alert("Something went wrong bro :(");
				}
			})
			.then(({isValid,summary}) => {
				if(isValid) {
					this.summary = summary;
				} else {
					alert('Nah bro wrong code :(');
				}
			});
		},
		fetchInit() {
			fetch('/data/all-cart.json', {
				method: 'GET'
			})
			.then(response  => {
				if(response.ok) {
					return response.json();
				} else {
					alert("Something went wrong bro :(");
				}
			})
			.then(({products, summary}) => {
				this.products = products;
				this.summary = summary;
			});
		},
		fetchOnAdd(product) {
			fetch('/data/added-product.json', {
				method: 'POST',  
				body: product
			})
			.then(response  => {
				if(response.ok) {
					return response.json();					

				} else {
					flash('Zboží se nepodařilo přidat do košíku');
				}
			})
			.then(({product, summary}) => {
				this.addProd(product);
				this.summary = summary;
				flash('Zboží bylo přídáno do košíku');

				EventBus.$emit('show-cart');
			});
		}
	}
}
</script>



