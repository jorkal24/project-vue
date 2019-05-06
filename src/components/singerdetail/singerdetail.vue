<template>
    <musiclist :title="title" :bgImage="bgImage" :songs="songs"></musiclist>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {getSingerDetail} from '../../assets/api/singer.js';
    import {createSong} from '../../assets/js/song.js';
    import MusicList from '../musiclist/musiclist.vue';
    export default {
        computed: {
            bgImage() {
                return this.singer.avatar
            },
            title() {
                return this.singer.name
            },
            ...mapGetters([
                'singer'
            ])
        },
        data() {
            return {
                songs: []
            }
        },
        created(){
            this._getDetail();
        },
        methods: {
            _getDetail() {
                if(!this.singer.id) this.$router.push('/singer');
                getSingerDetail(this.singer.id).then((res) => {
                   this.songs = this._formatSongs(res.data.list)
                })
            },
            _formatSongs(list) {
                let ret = [];
                list.forEach((item) => {
                    let {musicData} = item;
                    if(musicData.songid && musicData.albumid) ret.push(createSong(musicData));
                })

                return ret;
            }
        },
        components: {
            musiclist: MusicList
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/css/theme.scss';
    // .singer-detail {
    //     position: fixed;
    //     top: 0px;
    //     left: 0px;
    //     bottom: 0px;
    //     right: 0px;
    //     background: $color-background;
    //     z-index: 100;      
    // }

    .slide-enter-active , .slide-leave-active {
        transition: all .3s;
    }
    .slide-enter , .slide-leave-to {
        transform: translate3d(100% , 0 , 0);
    }
</style>


