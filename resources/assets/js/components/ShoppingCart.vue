<template>
    <div id="shopping-cart" :class="{ active: isVisible }">
        <div class="cart-holder">
            <cart-product-list></cart-product-list>
        </div>
    </div>
</template>

<script>
import cartProductList from './CartProductList.vue';

export default {
    components: {
        cartProductList
    },
    data() {
        return {
            isVisible: false
        };
    },
    methods: {
        showCart() {
            this.isVisible = true;
        }
    },
    created() {
        EventBus.$on('show-cart', this.showCart);
    }
}
</script>