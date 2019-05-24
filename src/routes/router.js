import Router from  'vue-router';
import Index from '../components/index/index.vue'
import Nav from '../components/nav/nav.vue';
import Vue from 'vue';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'index',
            component: Index
        },
        {
            path: '/nav',
            component: Nav
        }
    ]
})