<template>
  <div id="cart-status" @click="openCart">
        <div class="ico">
            <i class="fas fa-shopping-cart"></i>
            <div class="items-count">{{itemCount}}</div>
        </div>
        <div class="price">{{price}} <div class="currency">{{currency}}</div></div>
    </div>
</template>

<script>
export default {
  data() {
      return {
          itemCount: 0,
          price: 0,
          currency: ''
      };
  },
  created() {
      EventBus.$on('refresh-status', (summary,count) => {
          this.currency = summary.currency;
          this.price = summary.priceVat;
          this.itemCount = count;
      });
  },
  methods: {
      openCart() {
        EventBus.$emit('show-cart');
      }
  }
}
</script>

