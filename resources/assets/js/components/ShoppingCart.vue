<template>
    <div id="cart">
        <ul>
            <li v-for="product in products" v-text="product.name" :key="product.id"></li>
        </ul>
        <div class="sum" v-text="normalizedSize"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [
                {id: 1, name: "jedna", cena: 2500},
                {id: 2, name: "dva", cena: 5700}
            ]
        };
    },
    computed: {
        normalizedSize: function () {
            return 10;
        }
    },        
    mounted() {  
        console.log('Component mounted.')
    },
    methods: {
        addProds(prod) {
            this.products.push(prod);
        }
    }
}
</script>