import vuex from 'vuex';
import Vue from 'vue';

import states from './states';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';
const debug = process.env.NODE_ENV !== 'production';

Vue.use(vuex)


export default new vuex.Store({
    states,
    mutations,
    actions,
    mutations,
    getters,
    debug: debug,
    plugins: debug ? [createLogger()] : []
})