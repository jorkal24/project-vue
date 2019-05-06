import 'babel-polyfill';
import Vue from 'vue';
import App from './pages/App';
import router from './routes/router';
import fastclick from 'fastclick';
import vueLazyLoad from 'vue-lazyload';
import store from './store/index';

import './assets/css/index';


fastclick.attach(document.body);
Vue.use(vueLazyLoad , {
    loading: require('./components/m-header/logo@2x.png'),
})
const vm = new Vue({
    render: createElement => createElement(App),
    router,
    store
}).$mount('#app')