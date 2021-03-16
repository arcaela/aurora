import { get, set, merge } from 'lodash'

const $store = {
    values:{},
    get(...props){ return get(this, ...props) },
    set(...props){ return set(this, ...props) },
    merge(...props){ return merge(this, ...props) },
};

export default $store;