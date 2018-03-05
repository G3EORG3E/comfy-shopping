<template>
    <div id="shopping-cart" :class="{ active: isVisible }" @click="hideCart">
        <div class="cart-holder" @click.stop>
            <div class="inner-holder">  
                <h2 class="cart-main-tittle"><span>{{stepsArr.indexOf(currentStep)+1}}/{{stepsArr.length}}</span> {{ currentStep.label }}</h2>          
                <ul class="cart-setps">
                    <li v-for="step in stepsArr" :key="step.component" @click="processStep(step)">{{step.label}}</li>
                </ul>
                <transition name="component-fade" mode="out-in">
                    <keep-alive :include="aliveComponents">
                        <component :is="currentStep.component"></component>
                    </keep-alive>
                </transition>
                <div class="bottom-controls">
                    <a href="#" v-if="stepsArr.indexOf(currentStep) != 0" class="next-step cart-button ghost" @click.prevent="moveNext">Zpět</a>
                    <a href="#" class="next-step cart-button" @click.prevent="nextStep">{{currentStep.nextBtn}}</a>
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
            isVisible: false,
            currentStep: {},
            stepsArr: [
                {component:'cart-product-list', label: 'Košík', nextBtn: 'Osobní údaje', nextAccess: true},
                {component:'cart-contact-info', label: 'Osboní údaje', nextBtn: 'Vybrat dopravu', nextAccess: false},
                {component:'cart-delivery-info', label: 'Doprava', nextBtn: 'Vybrat platbu', nextAccess: false},
                {component:'cart-payment-info', label: 'Platba', nextBtn: 'Dokončit objednávku', nextAccess: false}
            ],
            aliveComponents: []
        };
    },
    created() {
        this.currentStep = this.stepsArr[0];
        this.aliveComponents.push(this.stepsArr[0].component);
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
        processStep(step) {
            let index = this.stepsArr.indexOf(step);
            console.log(index);
            this.currentStep = step;
        },
        nextStep() {
            let indexCurrent = this.stepsArr.indexOf(this.currentStep);

            if(this.stepsArr[indexCurrent].nextAccess) {
                this.currentStep = this.stepsArr[indexCurrent+1];
            }
        }
    }
}
</script>