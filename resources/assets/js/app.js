import './bootstrap';
import shoppingCart from './components/ShoppingCart.vue';
import productItem from './components/ProductItem.vue';

window.EventBus = new Vue();

const app = new Vue({
    el: '#root',
    components: {      
        productItem,
        shoppingCart
    }
}); 
  