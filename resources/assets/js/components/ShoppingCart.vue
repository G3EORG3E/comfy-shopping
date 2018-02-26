<template>
    <div id="shopping-cart" :class="{ active: isVisible }" @click="hideCart">
        <div class="cart-holder" @click.stop>
            <transition name="component-fade" mode="out-in">
                <keep-alive>
                    <component :is="currentView"></component>
                </keep-alive>
            </transition>
            <div class="next-step" @click="currentView='cart-contact-info'">kontakt</div>
        </div>
    </div>
</template>

<script>
import cartProductList from './CartProductList.vue';
import cartContactInfo from './CartContactInfo.vue';
import cartDeliveryInfo from './CartDeliveryInfo.vue';
import cartPaymentInfo from './CartContactInfo.vue';

export default {
    data() {
        return {
            isVisible: false,
            currentView: 'cart-product-list',
            componentsArr: ['cart-product-list', 'cart-contact-info', 'cart-delivery-info', 'cart-payment-info']
        };
    },
    created() {
        EventBus.$on('show-cart', this.showCart);
    },
    components: {
        'cart-product-list': cartProductList,
        'cart-contact-info': cartContactInfo,
        'cart-delivery-info': cartDeliveryInfo,
        'cart-payment-info': cartPaymentInfo
    },
    methods: {
        showCart() { 
            this.isVisible = true;
            document.getElementById('page-grid').classList.add('active-cart');
        },
        hideCart() { 
            this.isVisible = false;
            document.getElementById('page-grid').classList.remove('active-cart');
        }
    }
}
</script>