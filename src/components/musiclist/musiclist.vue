<template>
    <div class="music-list">
        <div class="back" @click="goBack">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="player-wrapper">
                <div class="play" ref="play">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-wrapper" ref="bgWrapper"></div>
        <scroll @scroll="_scroll" :probeType="probeType" :listenScroll="listenScroll" :data="songs" class="list" ref="list">
           <div class="song-list-wrapper">
                <songslist @select="selectItem" :songs="songs"></songslist>
           </div>
            <div class="loading-container" v-show="!this.songs.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from '../scroll/scroll.vue';
    import SongsList from '../songslist/songslist.vue';
    import Loading from '../loading/loading.vue';
    import {prefixStyle} from '../../assets/js/dom.js';
    import {mapActions} from 'vuex';

    const titleHeight = 40;
    const transform = prefixStyle('transform');
    const backdrop = prefixStyle('backdrop-filter');

    export default {
        props: {
            bgImage: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            songs: {
                type: Array,
                default: []
            }
        },
        computed: {
            bgStyle (){
                return `background-image: url(${this.bgImage})`
            }
        },
        data() {
            return {
                scrollY: 0
            }
        },
        created() {
            this.probeType = 3;
            this.listenScroll = true;
        },
        mounted() {
            this.imgHeight = this.$refs.bgImage.clientHeight;
            this.minTranslateY = -this.imgHeight + titleHeight;
            this.$refs.list.$el.style.top = `${this.imgHeight}px`;
        },
        methods: {
            _scroll(pos) {
                this.scrollY = pos.y;
            },
            goBack() {
                this.$router.back();
            },
            selectItem(item, index) {
                this.selectPlay({
                    list: this.songs,
                    index: index
                });
            },
            ...mapActions([
                'selectPlay'
            ])
        },
        watch: {
            scrollY (newY){
                let translateY = Math.max(this.minTranslateY, newY);
                let zIndex = 0;
                let scale = 1;
                let _bgWrapper = this.$refs.bgWrapper;
                let _bgImage = this.$refs.bgImage;
                let blur = 0;
                _bgWrapper.style[transform] = `translate3d(0 ,${translateY}px ,0)`;
                const percent = Math.abs(newY / this.imgHeight);

                if(newY > 0) {
                    zIndex = 10;
                    scale = percent + 1;
                }else {
                    blur = Math.min(20 * percent , 20);
                }
                this.$refs.filter.style[backdrop] = `blur(${blur}px)`

                if(this.minTranslateY > newY) {
                    zIndex = 10;
                    _bgImage.style.paddingTop = 0;
                    _bgImage.style.height = titleHeight+'px';
                    this.$refs.play.style.display = 'none';
                    
                }else {
                    _bgImage.style.paddingTop = '70%';
                    _bgImage.style.height = 0;
                    this.$refs.play.style.display = '';
                }
                _bgImage.style.zIndex = zIndex;
                _bgImage.style[transform] = `scale(${scale})`
            }
        },
        components: {
            scroll: Scroll,
            songslist: SongsList,
            loading: Loading
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/theme.scss";
    @import "../../assets/css/mixin.scss";

    .music-list {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: $color-background;
        .back {
            position: absolute;
            top: 0px;
            left: 6px;
            z-index: 50;
            .icon-back {
                display: block;
                padding: 10px;
                font-size: $font-size-large-x;
                color: $color-theme;
            }
        }
        .title {
            position: absolute;
            top: 0px;
            left: 10%;
            z-index: 40;
            width: 80%;
            @include no-wrap;
            text-align: center;
            line-height: 40px;
            font-size: $font-size-large;
            color: $color-text;
        }
        .bg-image {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 70%;
            transform-origin: top;
            background-size: cover;
            .filter {
                position: absolute;
                top: 0px;
                bottom: 0px;
                width: 100%;
            }
            .player-wrapper {
                position: absolute;
                bottom: 20px;
                z-index: 50;
                width: 100%;
                .play {
                    box-sizing: border-box;
                    width: 135px;
                    padding: 7px 0;
                    margin: 0 auto;
                    text-align: center;
                    border: 1px solid $color-theme;
                    color: $color-theme;
                    border-radius: 100px;
                    font-size: 0px;
                    .icon-play {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 6px;
                        font-size: $font-size-medium-x;
                    }
                    .text {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: $font-size-small;
                    }
                }
            }
        }
        .bg-wrapper {
            position: relative;
            height: 100%;
            width: 100%;
            background: $color-background;
            z-index: 8;
        }
        .list {
            position: fixed;
            top: 0px;
            bottom: 0px;
            width: 100%;
            background: $color-background;
            z-index: 9;
            .song-list-wrapper {
                padding: 20px 30px;
            }
            .loading-container {
                position: absolute;
                width: 100%;
                top: 50%;
                left: 0px;  
                transform: translateY(-50%);
            }
        }
    }

</style>


