import vueRouter from  'vue-router';
import Index from '../components/index/index.vue'
import Nav from '../components/nav/nav.vue';
import Vue from 'vue';

Vue.use(vueRouter)

export default new vueRouter({
    routes: [
        {
            path: '/index',
            name: 'index',
            components: Index
        },
        {
            path: '/nav',
            components: Nav
        }
    ]
})