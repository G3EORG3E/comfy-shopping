<template>
    <div id="cart">
        <ul>
            <li v-for="product in products" :key="product.id" @click="removeProd(product)">{{ product.name + ' ' + (product.price * product.count) }}</li>
        </ul>
        <div class="sum" v-text="sumVAT"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [
                {id: 1, name: "jedna", price: 2500, count: 1},
                {id: 2, name: "dva", price: 5700, count: 1}
            ],
            currency: 'Kč'
        };
    },
    computed: {
        sumVAT: function () {
            let sum = 0;
            this.products.forEach(function (product) {
                sum+= product.price;
            });
            return sum;
        } 
    },        
    created() {
        EventBus.$on('add-to-cart',  (product) => this.addProd(product));
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
                this.$forceUpdate();
            }
        },
        removeProd(prod) {
            let index = this.products.indexOf(prod);
            this.products.splice(index, 1);
        }

    }
}
</script>