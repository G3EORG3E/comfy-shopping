<template>
    <li class="cart-product">
        <div class="thumbnail">
            <a href="#"><img :src="product.image" :alt="product.productName"></a>
        </div>
        <div class="info">
            <div class="product">
                <a href="#">{{ product.productName }}</a>
            </div> 
            <div class="variant">{{ product.variantName }}</div>
        </div>
        <int-up-down v-model="product.amount"></int-up-down>
        <div class="price">
            <div class="base">{{ product.price }}</div>
            <div class="vat">{{ product.priceVAT }}</div>
        </div>
        <div class="remove" @click.prevent="$emit('deleted', product);"></div>
    </li>
</template> 

<script>
export default {
    props: ['initProduct'],
	data() {
		return {
            product: this.initProduct,
            debauncer: null
		}
    },
    watch: {
        'product.amount'(val) {
            clearTimeout(this.debauncer);
            this.debauncer = setTimeout(() => {
                this.$emit('updated',this.product);                
            }, 280);
        },
        initProduct(newProd) {
            this.product = newProd;
        }
    }
}
</script>

