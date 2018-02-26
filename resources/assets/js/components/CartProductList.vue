<template>
	<div id="cart-product-list">
		<ul>
			<transition-group name="list" tag="p">
				<li v-for="product in products" :key="product.id">
					<div>
						{{ product.name + ' ' + (product.price * product.count) }}
						<a href="#" @click.prevent="removeProd(product)">xxx</a>
					</div>
					<input type="number" v-model="product.count" min="1" @blur="(product.count < 1 ? product.count=1 : product.count= Math.floor(product.count))">
					<a href="#" @click.prevent="product.count++">++</a>
					<a href="#" @click.prevent="(product.count > 1 ? product.count-- : product.count)">--</a>
				</li>
			</transition-group>
		</ul>
		<p v-if="products.length == 0">Košík je prázdný</p>
		<div class="cart-items-summary">
			<div class="price">Cena bez DPH: {{ summary.price }} {{ summary.currency }}</div>
			<div class="vat">DPH {{ summary.vatPrecentage }}% {{ summary.vatAmount }} {{ summary.currency }}</div>
			<div class="price-vat">{{ summary.priceVat }} {{ summary.currency }}</div>
		</div>
		<div>
			<input type="text" placeholder="Voucher Code" v-model="voucherCode">
			<button @click="voucherValidate">Submit</button>
		</div>
	</div>
</template>

<script>
import findIndex from 'lodash.findindex'; 

export default {
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
			fetch('/data/voucher-response.json', {
				method: 'POST'
			})
			.then(response  => {
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
					alert("Something went wrong bro :(");
				}
			})
			.then(({product, summary}) => {
				this.addProd(product);
				this.summary = summary;

				EventBus.$emit('show-cart');
			});
		}
	}
}
</script>



