import './bootstrap';
import shoppingCart from './components/ShoppingCart.vue';
import productItem from './components/ProductItem.vue';

window.EventBus = new Vue();

new Vue({
    el: '#root',
    components: {      
        productItem,
        shoppingCart
    },
    methods: {
        addToCart() {
            $.ajax({
                type: "post",
                url: "/data/added-product.json",
                data: { "first": "Manu", "Last": "Sharma" },
                dataType: "json",
                success: function ({ product, sumPrice }) {
                    EventBus.$emit('add-to-cart', product);
                },
                error: function (xhr) {
                    //Do Something to handle error
                }
            });
        }
    }
}); 

let products = document.getElementsByClassName('add-product-to-cart');

for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.addEventListener('click', function (e) {
        e.preventDefault();
        //console.log(product.dataset);
        EventBus.$emit('add-to-cart', { "id": 6, "name": "šest", "price": 782500, "currency": "Kč" });
    });
}


