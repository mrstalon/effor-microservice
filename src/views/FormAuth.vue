<template>
    <form action="http://192.168.0.104:8090/changeproject" method="POST" name="bla">
        <input name="comeuserid" v-model="comeuserid" type="hidden">
        <input name="whoiam" v-model="whoiam" type="hidden">
    </form>
</template>


<script>
export default {
    mounted() {
        document.bla.submit();
    },
    data() {
        return {
            comeuserid: this.$route.query.id,
            whoiam: 'teacher',
        }
    }
}
</script>


<style scoped>

</style>
