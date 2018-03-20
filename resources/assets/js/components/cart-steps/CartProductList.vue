<template>
	<div id="cart-product-list">	
		<transition-group name="list" tag="ul" class="cart-products">
			<li class="cart-product" v-for="product in products" :key="'product'+product.productId+'varaint'+product.variantId">
				<div class="thumbnail">
					<a href="#"><img :src="product.image" :alt="product.productName"></a>
				</div>
				<div class="info">
					<div class="product">
						<a href="#">{{ product.productName }}</a>
					</div>
					<div class="variant">{{ product.variantName }}</div>
				</div>
				<div class="qty inc-dec-comp">
					<div class="decrease" @click="changeProductCount(product,'dec')">-</div>
					<input type="text" v-model="product.amount" min="1" @blur="(product.amount < 1 ? product.amount=1 : product.amount= Math.floor(product.amount))">
					<div class="increase" @click="changeProductCount(product,'inc')">+</div>
				</div>
				<div class="price">
					<div class="base">{{ product.price }}</div>
					<div class="vat">{{ product.priceVAT }}</div>
				</div>
				<div class="remove" @click.prevent="removeProd(product)"></div>
			</li>
		</transition-group>
		<p class="empty-cart" v-if="products.length == 0">Košík je prázdný</p>
		<div class="bottom-status" v-if="products.length != 0">
			<div id="voucher">
				<input type="text" placeholder="Voucher Code" v-model="voucherCode">
				<button v-if="!activeVoucher" class="btn ghost" @click="voucherValidate">Odeslat</button>
				<button v-if="activeVoucher" class="btn ghost" @click.prevent="removeVoucher">Odstranit</button>
			</div>
			<div class="cart-items-summary">
				<div class="price">Cena bez DPH: <strong>{{ summary.price }} </strong></div>
				<div class="price-vat">Cena s DPH: <strong>{{ summary.priceVAT }}</strong></div>
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
			summary: {
                
            },
			voucherCode: '',
			activeVoucher: false
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
			let index = findIndex(this.products, o => { return o.productId === prod.productId && o.variantId === prod.variantId });

			if(index === -1) {
				this.products.push(prod);
			}
			else {             
				Vue.set(this.products, index, prod);
			}
		},
		changeProductCount(prod,method) {
			if (method == 'inc') {
				prod.amount++;
			} else {
				prod.amount--;
			}
			EventBus.$emit('init-loading');
			fetch('http://cartapi.nettrender.com/api/cart/change/amount', {
				method: 'POST',  
				body: JSON.stringify({productId: prod.productId,variantId: prod.variantId, amount: prod.amount}),
				headers: new Headers({
                	'Content-Type': 'application/json'
            	})
			})
			.then(response  => {
				EventBus.$emit('destroy-loading');
				if(response.ok) {
					return response.json();
				} else {
					flash("Something went wrong bro :(");
				}
			})
			.then(({summary,product}) => {
				this.addProd(product);
				this.summary = summary;
			});
		},
		removeProd(prod) {
			EventBus.$emit('init-loading');
			fetch('http://cartapi.nettrender.com/api/cart/product/remove', {
				method: 'POST',  
				body: JSON.stringify({productId: prod.productId,variantId: prod.variantId}),
				headers: new Headers({
                	'Content-Type': 'application/json'
            	})
			})
			.then(response  => {
				EventBus.$emit('destroy-loading');
				if(response.ok) {
					return response.json();
				} else {
					flash("Something went wrong bro :(");
				}
			})
			.then((summary) => {
				let index = this.products.indexOf(prod);
				this.products.splice(index, 1);

				this.summary = summary;
			});
		},
		removeVoucher() {
			EventBus.$emit('init-loading');
			fetch('http://cartapi.nettrender.com/api/cart/voucher/remove', {
				method: 'POST'
			})
			.then(response  => {
                EventBus.$emit('destroy-loading');
                if(response.ok) {
                    response.json().then(summary => {
						this.summary = summary;
						this.activeVoucher = false;
						flash("Voucher odstraněn");
					});
				} else {
                    flash("Voucher se nepodařilo odstrnait");
				}
			}); 
		},
		voucherValidate() {
            EventBus.$emit('init-loading');
			fetch('http://cartapi.nettrender.com/api/cart/voucher/apply', {
				method: 'POST',  
				body: JSON.stringify({ voucherCode: this.voucherCode }),
				headers: new Headers({
                	'Content-Type': 'application/json'
            	})
			})
			.then(response  => {
                EventBus.$emit('destroy-loading');
                if(response.ok) {
                    response.json().then(summary => {
						this.summary = summary;
						this.activeVoucher = true;
					});
				} else {
                    response.json().then(error => {
						flash(error.error);
					});
				}
			});
		},
		fetchInit() {
			EventBus.$emit('init-loading');
			fetch('http://cartapi.nettrender.com/api/cart/get', {
				method: 'POST',
				credentials: 'same-origin'
			})
			.then(response  => {
				EventBus.$emit('destroy-loading');
				if(response.ok) {
					return response.json();
				} else {
					flash("Something went wrong bro :(");
				}
			})
			.then(({products, summary, voucherCode}) => {
				this.products = products;
				this.summary = summary;
				this.voucherCode = voucherCode;
				if(voucherCode.length) {
					this.activeVoucher = true;
				}
			});
		},
		fetchOnAdd(product) {
			EventBus.$emit('init-loading');
			EventBus.$emit('show-cart');
			fetch('http://cartapi.nettrender.com/api/cart/product/add', {
				method: 'POST',  
				body: JSON.stringify(product),
				headers: new Headers({
                	'Content-Type': 'application/json'
            	})
			})
			.then(response  => {
				EventBus.$emit('destroy-loading');
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
				
			});
		}
	}
}
</script>



