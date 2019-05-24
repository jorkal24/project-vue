<template>
    <div class="nav">
        导航<button @click="back">返回</button>
    </div>
</template>

<script>
    export default {
        methods: {
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss">
    .nav {
        color: purple;
    }
</style>


