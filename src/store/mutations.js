import * as types from './mutation-type';

export default {
    [types.CHANGE_DEMO](state, demo) {
        state.demo = demo
    }
}