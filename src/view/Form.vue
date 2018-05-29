<template>
    <div class="nav-container">
        hello form from effor
        {{this.$route.query.id}}
    </div>
</template>


<script>
import {router} from '../main.js';

export default {
    beforeMount() {
        console.log(document.referrer);
    },
    methods: {
    }
}
</script>

<style scoped>


</style>