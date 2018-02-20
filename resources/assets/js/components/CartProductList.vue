<template>
    <div id="cart-product-list">
        <ul>
            <transition-group name="list" tag="p">
                <li v-for="product in products" :key="product.id" @click="removeProd(product)">{{ product.name + ' ' + (product.price * product.count) }}</li>
            </transition-group>
        </ul>
        <div class="cart-items-summary">
            <div class="price">Cena bez DPH: {{ price }} {{ currency }}</div>
            <div class="vat">DPH {{ vatPrecentage }}% {{ vatAmount }} {{ currency }}</div>
            <div class="price-vat">{{ priceVat }} {{ currency }}</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
        return {
            products: [
                {id: 1, name: "jedddna", price: 2500, count: 1, currency: 'Kč'},
                {id: 2, name: "dva", price: 5700, count: 1, currency: 'Kč'}
            ],
            currency: 'Kč',
            price: 500,
            vatPrecentage: 15,
            vatAmount: 5452,
            priceVat: 484354
        };
    },       
    created() {
        EventBus.$on('add-to-cart',  (product) => {
            fetch('/data/added-product.json', {
                method: 'POST', 
                body: product
            })
            .then(response  => {
                if(response.ok) {
                    return response.json();
                } else {
                    alert("Something went wrong bro :(");
                }
            })
            .then(({product, sumPrice}) => {
                this.addProd(product);
            });
        });
    },    
    methods: {
        addProd(prod) {
            if(this.products.indexOf(prod) === -1) {
                prod.count = 1;
                this.products.push(prod);
            }
            else {
                let index = this.products.indexOf(prod);
                this.products[index].count++;                
                Vue.set(this.products, index, this.products[index])
            }
        },
        removeProd(prod) {
            let index = this.products.indexOf(prod);
            this.products.splice(index, 1);
        }
    }
}
</script>



