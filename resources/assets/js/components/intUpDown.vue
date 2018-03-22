<template>
	<div class="qty inc-dec-comp">
		<div class="decrease" @click="amount--">-</div>
		<input type="text" v-model="amount">
		<div class="increase" @click="amount++">+</div>
	</div>
</template>

<script>
export default {

	props: ['value'],
	data() {
		return {
			amount: this.value
		}
	},
	watch: {
		amount(newValue,oldValue) {
			let final;

			if (/^[1-9][0-9]*$/.test(newValue)) {
				final= newValue;
			} else {
                if(newValue == '' || newValue == 0) final = 1;
                else final = oldValue;
			}

			this.amount = final;
			this.$emit('input', parseInt(final));
		}
	}
  
}
</script>



