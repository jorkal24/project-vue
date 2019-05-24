import * as types from './mutation-type';

export const changeDemo = function({commit, state},{demo}) {
    commit(types.CHANGE_DEMO, demo)
}
