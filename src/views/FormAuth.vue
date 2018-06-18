<template>
    <form :action="url" method="POST" name="bla">
        <input name="comeuserid" v-model="comeuserid" type="hidden">
        <input name="whoiam" v-model="whoiam" type="hidden">
    </form>
</template>


<script>
import HTTP from '../http-config/';

export default {
    mounted() {
        document.bla.submit();
    },
    data() {
        return {
            comeuserid: this.$route.query.id,
            whoiam: 'teacher',
            url: HTTP.baseURL,
        }
    }
}
</script>


<style scoped>

</style>
