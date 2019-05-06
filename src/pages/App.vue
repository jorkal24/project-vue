<template>
    <div>
        <Mheader />
        <Tab />
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <Player></Player>
    </div>
</template>

<script>
    import Mheader from '../components/m-header/m-header'
    import Tab from '../components/tab/tab'
    import Player from '../components/player/player'

    export default {
        components: {
            Mheader,
            Tab,
            Player
        }
    }
</script>

<style lang="scss">
   
</style>


