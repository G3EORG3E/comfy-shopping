<template>
    <div class="alert warning" v-if="isVisible">
        {{body}}
    </div>
</template>

<script>
export default {
    props: ['message'],
    data() {
        return {
            body: '',
            isVisible: false
        };
    },
    created() {
        if (this.message) {
            this.flash(this.message);        
        }

        EventBus.$on('flash', message => this.flash(message));
    },
    methods: {
        hide() {
            setTimeout(() => {
                this.isVisible = false;
            }, 2000);
        },
        flash(message) {
            this.body = message;
            this.isVisible = true;

            this.hide();
        }
    }
}
</script>

