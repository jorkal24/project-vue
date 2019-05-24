import 'babel-polyfill';
import Vue from 'vue';
import App from './pages/App';
import router from './routes/router';
import vueLazyLoad from 'vue-lazyload';
import store from './store/index';

import './assets/css/index';


const vm = new Vue({
    render: createElement => createElement(App),
    router,
    store
}).$mount('#app')