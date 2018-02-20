

<script>
export default {
    props: ['attributes'],
    data() {
        return {
            product: {
                id: this.attributes.id,
                name: this.attributes.name,
                price: this.attributes.price,
                currency: this.attributes.currency
            }
        };
    },   
    mounted() {  
        console.log('Component mounted.')
    }
}
</script>