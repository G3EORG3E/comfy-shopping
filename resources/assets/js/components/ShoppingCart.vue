<template>
	<div id="shopping-cart" :class="{ active: isVisible }" @click="hideCart">
		<div class="cart-holder" @click.stop :class="{ loading: isLoading }">
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
			<div class="threedotloader">
				<div class="dot"></div><div class="dot"></div><div class="dot"></div>
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
			isLoading: false,
			EventBus: EventBus,
			currentStep: {},
			loadingDely: null,
			stepsArr: [
				{component:'cart-product-list', label: __('cart'), nextBtn: __('personal-info'), accessible: false},
				{component:'cart-contact-info', label: __('personal-info'), nextBtn: __('choose-delivery'), accessible: false},
				{component:'cart-delivery-info', label: __('delivery'), nextBtn: __('choose-payment'), accessible: false},
				{component:'cart-payment-info', label: __('payment'), nextBtn: __('finish-cart'), accessible: false},
				{component:'cart-summary', label: __('summary'), nextBtn: __('confirm'), accessible: false}
			]
		}; 
	},
	created() {
		this.currentStep = this.stepsArr[0];
		EventBus.$on('show-cart', this.showCart);
		EventBus.$on('cart-next-step', this.nextStep);
		EventBus.$on('init-loading', () => {
			this.loadingDely = setTimeout(() => {
				this.isLoading = true;                
			}, 250);
		});
		EventBus.$on('destroy-loading', () => {
			clearTimeout(this.loadingDely);
			this.isLoading = false;
		});
		EventBus.$on('cart-reset', () => {
			this.cartReset();
		});
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
			EventBus.$emit('show-page-cover');
		},
		hideCart() { 
			this.isVisible = false;
			EventBus.$emit('hide-page-cover');
		},
		processStep(step) {
			let index = findIndex(this.stepsArr, o => { return o.component === step.component });

			if(step.accessible) {
				this.currentStep = step;
				for (let i = index; i < this.stepsArr.length; i++) {
					this.stepsArr[i].accessible = false;  
					if(this.$children.length > i) this.$children[i].$data.reload = true;   
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
		},
		cartReset() {
			if(this.currentStep !== this.stepsArr[0]){
				this.processStep(this.stepsArr[0]);
				this.currentStep = this.stepsArr[0];
			}
		}
	}
}
</script>