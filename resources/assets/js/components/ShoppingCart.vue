<template>
    <div id="shopping-cart" :class="{ active: isVisible }" @click="hideCart">
        <div class="cart-holder" @click.stop>
            <div class="inner-holder">  
                <!-- <h2 class="cart-main-tittle"><span>{{stepsArr.indexOf(currentStep)+1}}/{{stepsArr.length}}</span> {{ currentStep.label }}</h2>-->
                <ul class="cart-setps" :data-active="currentStep.label">
                    <li v-for="step in stepsArr" 
                        :key="step.component" 
                        @click="processStep(step)" 
                        :class="{ active: currentStep.component == step.component, clickable: step.accessible }
                        ">{{step.label}}</li>
                </ul>
                <transition name="component-fade" mode="out-in">
                    <keep-alive>
                        <component :is="currentStep.component"></component>
                    </keep-alive>
                </transition>
                <div class="bottom-controls" :class="{ only: stepsArr.indexOf(currentStep) == 0 }">
                    <a href="#" v-if="stepsArr.indexOf(currentStep) != 0" class="next-step cart-button ghost" @click.prevent="prevStep">Zpět</a>
                    <a href="#" class="next-step cart-button" @click.prevent="EventBus.$emit('nextStep', currentStep.component)">{{currentStep.nextBtn}}</a>
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
import cartSummary from './cart-steps/CartSummary.vue';
import findIndex from 'lodash.findindex'; 

export default {
    data() {
        return {
            isVisible: false,
            EventBus: EventBus,
            currentStep: {},
            stepsArr: [
                {component:'cart-product-list', label: 'Košík', nextBtn: 'Osobní údaje', accessible: false},
                {component:'cart-contact-info', label: 'Osboní údaje', nextBtn: 'Vybrat dopravu', accessible: false},
                {component:'cart-delivery-info', label: 'Doprava', nextBtn: 'Vybrat platbu', accessible: false},
                {component:'cart-payment-info', label: 'Platba', nextBtn: 'Dokončit objednávku', accessible: false},
                {component:'cart-summary', label: 'Shrnutí', nextBtn: 'Potvrdit', accessible: false}
            ]
        }; 
    },
    created() {
        this.currentStep = this.stepsArr[0];
        EventBus.$on('show-cart', this.showCart);
        EventBus.$on('cart-next-step', this.nextStep);
    },
    components: {
        'cart-product-list': cartProductList,
        'cart-contact-info': cartContactInfo,
        'cart-delivery-info': cartDeliveryInfo,
        'cart-payment-info': cartPaymentInfo,
        'cart-summary': cartSummary
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
            let index = findIndex(this.stepsArr, o => { return o.component === step.component });
            let activeIntex = findIndex(this.stepsArr, o => { return o.component === this.currentStep.component });

            if(step.accessible) {
                this.currentStep = step;
                for (let i = index; i < activeIntex; i++) {
                    this.stepsArr[i].accessible = false;  
                    this.$children[i].$data.reload = true;   
                }
            } 
        },
        nextStep() {
            let indexCurrent = findIndex(this.stepsArr, o => { return o.component === this.currentStep.component });
            this.stepsArr[indexCurrent].accessible = true;
            this.currentStep = this.stepsArr[indexCurrent+1];            
        },
        prevStep() {
            let indexCurrent = findIndex(this.stepsArr, o => { return o.component === this.currentStep.component });
            this.$children[indexCurrent].$data.reload = true;   
            this.stepsArr[indexCurrent].accessible = false;
            this.currentStep = this.stepsArr[indexCurrent-1];     
        }
    }
}
</script>