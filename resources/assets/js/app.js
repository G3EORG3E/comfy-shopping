import './bootstrap';
import shoppingCart from './components/ShoppingCart.vue';
import productItem from './components/ProductItem.vue';
import cartStatus from './components/CartStatus.vue';
import flashMessage from './components/FlashMessage.vue'

window.EventBus = new Vue();
window.flash = message =>  EventBus.$emit('flash', message);

let app = new Vue({
    el: '#root',
    components: {      
        productItem,
        shoppingCart,
        cartStatus,
        flashMessage
    }
}); 

let products = document.getElementsByClassName('add-product-to-cart');

for (let product of products) {
    product.addEventListener('click', function (e) {
        e.preventDefault();
        //console.log(product.dataset);
        EventBus.$emit('add-to-cart', { "id": 6, "name": "šest", "price": 782500, "currency": "Kč" });
    });
}
