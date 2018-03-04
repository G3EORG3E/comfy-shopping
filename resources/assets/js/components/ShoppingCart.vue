<template>
    <div id="shopping-cart" :class="{ active: isVisible }" @click="hideCart">
        <div class="cart-holder" @click.stop>
            <div class="inner-holder">  
                <h2 class="cart-main-tittle">Košík <span>/ Obsah</span></h2>          
                <ul class="cart-setps">
                    <li v-for="step in stepsArr" :key="step.component" @click="currentStep = step.component">{{step.label}}</li>
                </ul>
                <transition name="component-fade" mode="out-in">
                    <keep-alive>
                        <component :is="currentStep"></component>
                    </keep-alive>
                </transition>
                <div class="bottom-controls">
                    <a href="#" class="next-step cart-button ghost" @click.prevent="moveNext">Zpět</a>
                    <a href="#" class="next-step cart-button" @click.prevent="moveNext">{{currentStepBtn}}</a>
                </div>
                <a href="#" class="get-back" @click.prevent="hideCart">Vrátit se k nakupování</a>
            </div>
        </div>
    </div>
</template>

<script>
import cartProductList from './cart-steps/CartProductList.vue';
import cartContactInfo from './cart-steps/CartContactInfo.vue';
import cartDeliveryInfo from './cart-steps/CartDeliveryInfo.vue';
import cartPaymentInfo from './cart-steps/CartPaymentInfo.vue';

export default {
    data() {
        return {
            isVisible: true,
            currentStep: 'cart-contact-info',
            currentStepBtn: '',
            stepsArr: [
                {component:'cart-product-list', label: 'Košík', nextBtn: 'Kontaktní údaje', isActive: true},
                {component:'cart-contact-info', label: 'Osboní údaje', nextBtn: 'Vybrat dopravu', isActive: true},
                {component:'cart-delivery-info', label: 'Doprava', nextBtn: 'Vybrat platbu', isActive: true},
                {component:'cart-payment-info', label: 'Platba', nextBtn: 'Konec', isActive: true}
            ]
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
        },
        moveNext() {
            
        }
    }
}
</script>