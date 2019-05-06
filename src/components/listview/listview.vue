<template>
    <scroll class="listview" 
            ref="listview"
            :data="data" 
            :listenScroll="listenScroll" 
            :probeType="probeType"
            @scroll="scroll">
        <ul>
            <li v-for="(group , key) in data" :key="key" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li @click="toSingerDetail(item)" :data-id="item.id" v-for="(item , index) in group.items" :key="index" class="list-group-item">
                        <img class="avatar" :src="item.avatar" />
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="shortcut">
            <ul>
                <li class="item" @touchstart="shortCutTouchStart" @touchmove="shortCutTouchMove" :class="{'current': currentIndex === key}" v-for="(item , key) in shortcutList" :key="key" :data-key="key">{{item}}</li>
            </ul>
        </div>
        <div class="fix-list" ref="fixlist" v-show="fixTitle">
            <div class="fix-title">{{fixTitle}}</div>
        </div>
        <loading class="loading-container" v-show="!data.length"></loading>
    </scroll>
</template>
<script>
    import Scroll from '../scroll/scroll.vue';
    import Loading from '../loading/loading.vue'
    import {getData} from '../../assets/js/dom';
    const ANCHOR_HEIGHT = 18;
    const TITLE_HEIGHT = 30;
    export default {
        data(){
            return {
                scrollY: -1,
                currentIndex: 0,
                diff: 0
            }
        },
        props: {
            data: {
                type: Array,
                default: []
            },
            probeType: {
                type: Number,
                default: 3
            }
        },
        created() {
            this.listHeight = [];
            this.touchRecord = {};
            this.listenScroll = true;
        },
        methods: {
            toSingerDetail(item){
                this.$emit('jump' , item)
            },
            shortCutTouchStart(e){
                const anchorIndex = parseInt(getData(e.target , 'key'));
                let firstTouches = e.touches[0];
                this.touchRecord.y1 = firstTouches.pageY
                this.touchRecord.anchorIndex = anchorIndex;


                this._scrollTo(anchorIndex)
            },
            shortCutTouchMove(e) {
                let firstTouches = e.touches[0]
                this.touchRecord.y2 = firstTouches.pageY;
                
                let moveIndex = (this.touchRecord.y2 - this.touchRecord.y1) / ANCHOR_HEIGHT | 0;
                let anchorIndex = this.touchRecord.anchorIndex + moveIndex;

                this._scrollTo(anchorIndex);
                
            },
            refresh(){
                this.$refs.listview.refresh();
            },
            scroll(pos) {
                this.scrollY = pos.y;
            },
            _calculateHeight() {
                this.listHeight = [];
                const list = this.$refs.listGroup;
                let height = 0;
                this.listHeight.push(height)
                for(let i = 0; i < list.length; i++) {
                    height += list[i].clientHeight;
                    this.listHeight.push(height);
                }
            },
            _scrollTo(index) {
                if(!index && index !== 0) return;

                if(index < 0) {
                    index = 0;
                }else if(index > this.listHeight.length - 2) {
                    index = this.listHeight.length - 2;
                }

                this.currentIndex = index;
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index] , 0)
            }
        },
        computed: {
            shortcutList() {
                return this.data.map((group) => {
                    return group.title.substr(0 , 1);
                })
            },
            fixTitle() {
                if(this.scrollY >=0 ) return '';
                return  this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this._calculateHeight();
                },20)
            },
            scrollY(newValue){
                const listHeight = this.listHeight;

                if(newValue > 0) {
                    this.currentIndex =0;
                    return ;
                }
                for(let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i];
                    let height2 = listHeight[i + 1];
                    if(-newValue >= height1 && -newValue < height2) {
                        this.currentIndex = i;
                        this.diff = height2 + newValue;
                        return;
                    }
                }
            },
            diff(newValue) {
                const moveDistance = (newValue > 0 && newValue <= TITLE_HEIGHT) ? newValue-TITLE_HEIGHT : 0;
                if(this.fixedTop === moveDistance) return;

                this.$refs.fixlist.style.transform=`translate3d(0px , ${moveDistance}px , 0px)`;
                this.fixedTop = moveDistance;
            }
        },
        components: {
            scroll: Scroll,
            loading: Loading
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/css/theme.scss';
    .listview {
        height: 100%;
        overflow: hidden;
        .list-group {
            padding-bottom: 30px;
            .list-group-title {
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                color: $color-text-l;
                font-size: $font-size-small;
                background: $color-highlight-background;
            }
             .list-group-item {
                display: flex;
                align-items: center;
                padding: 20px 0 0 30px;
                .avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
                .name {
                    margin-left: 20px;
                    color: $color-text-l;
                    font-size: $font-size-medium;
                }
            }
        }
        .shortcut {
            position: absolute;
            top: 50%;
            right: 0px;
            z-index: 99;
            transform: translateY(-50%);
            width: 20px;
            padding: 20px 0;
            border-radius: 10px;
            text-align: center;
            background: $color-background-d;
            font-family: Helvetica;
            .item {
                padding: 3px;
                line-height: 1;
                color: $color-text-l;
                font-size: $font-size-small;
                &.current {
                    color: $color-theme;
                }
            }
        }
        .fix-list {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            .fix-title {
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                color: $color-text-l;
                font-size: $font-size-small;
                background: $color-highlight-background;
            }
        }
        .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>



