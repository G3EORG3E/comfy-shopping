<template>
    <div id="shopping-cart">
        <div class="cart-holder">
            <ul>
                <transition-group name="list" tag="p">
                    <li v-for="product in products" :key="product.id" @click="removeProd(product)">{{ product.name + ' ' + (product.price * product.count) }}</li>
                </transition-group>
            </ul>
            <div class="sum" v-text="sumVAT"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [
                {id: 1, name: "jedna", price: 2500, count: 1, currency: 'Kč'},
                {id: 2, name: "dva", price: 5700, count: 1, currency: 'Kč'}
            ],
            currency: 'Kč'
        };
    },
    computed: {
        sumVAT() {
            let sum = 0;
            this.products.forEach(product => sum+= product.price * product.count);
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