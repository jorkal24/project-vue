<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    const Person = class {
        constructor(name ,age) {
            this.name = name;
            this.age = age;
        }
        say() {
            return this
        }
    }
    export default {
        props: {
            probeType:{
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            },
            listenScroll: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            // 浏览器刷新页面频率为17ms
            setTimeout(()=>{
                this._initScroll();
            },20)
        },
        methods: {
            _initScroll() {
                if(!this.$refs.wrapper) return;
                this.scroll = new BScroll(this.$refs.wrapper , {
                    probeType: this.probeType,
                    click: this.click
                });

                if(this.listenScroll) {
                    let that = this;
                    this.scroll.on('scroll' , (pos) => {
                        that.$emit('scroll' , pos);
                    })
                }
            
            },
            enabel() {
                this.scroll && this.scroll.enabel()
            },
            disabel() {
                this.scroll && this.scroll.disabel();
            },
            refresh() {
                this.scroll && this.scroll.refresh();
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll , arguments);
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll , arguments);
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.scroll && this.scroll.refresh();
                },20)
            }
        }
    }
</script>

