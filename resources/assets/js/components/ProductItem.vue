

<script>
export default {
    props: ['attributes'],
    data() {
        return {
            product: {
                name: this.attributes.name,
                price: this.attributes.price
            }
        };
    },   
    mounted() {  
        console.log('Component mounted.')
    },
    methods: {
        addToCart() {
            this.$emit('add', this.product);
        }
    }
}
</script>