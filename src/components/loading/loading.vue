<template>
    <div class="loading">
        <img width="24" height="24" src="./loading.gif" alt="">
        <p class="desc">{{descText}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            descText: {
                type: String,
                default: '正在加载...'
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/css/theme.scss';
    .loading {
        width: 100%;
        text-align: center;
        .desc {
            line-height: 30px;
            font-size: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
        }
    }
</style>

