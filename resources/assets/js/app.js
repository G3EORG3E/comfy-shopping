import './bootstrap';
import shoppingCart from './components/ShoppingCart.vue';
import productItem from './components/ProductItem.vue';

//Vue.component('shopping-cart', shoppingCart);

new Vue({
    el: '#app',
    components: {      
        productItem,
        shoppingCart
    },
    data: {
        message: 'hey'
    },
    methods: {
        sayHi(product) {
            alert(prouct.name);
        }
    }
}); 
  