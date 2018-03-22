import './bootstrap';
import shoppingCart from './components/ShoppingCart.vue';
import cartStatus from './components/CartStatus.vue';
import flashMessage from './components/FlashMessage.vue';
import productDetail from './components/ProductDetail.vue';
import Translation from './classes/Translation.js';
import intUpDown from './components/intUpDown.vue';


window.EventBus = new Vue();
window.flash = message =>  EventBus.$emit('flash', message);
window.__ = translateKey => Translation.getTranslate(translateKey);

//global components
Vue.component('int-up-down', intUpDown);

let app = new Vue({
    el: '#root',
    components: {    
        shoppingCart,
        cartStatus,
        flashMessage,
        productDetail
    },
    created() {
        EventBus.$on('show-page-cover', () => {
            document.getElementById('page-grid').classList.add('page-cover');
        });

        EventBus.$on('hide-page-cover', () => {
            document.getElementById('page-grid').classList.remove('page-cover');
        });
    }    
}); 


// work arounds
let products = document.getElementsByClassName('quick-shop');

for (let product of products) {
    product.addEventListener('click', function (e) {
        e.preventDefault();
        EventBus.$emit('load-product-detail', { "id": product.dataset.productId });
    });
}
