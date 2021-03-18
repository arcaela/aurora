import { get, set, merge } from 'lodash'

window.$aurora = window.$aurora || {};

window.$aurora.$store = {
    values:{},
    get(...props){ return get(this.values, ...props) },
    set(...props){ return set(this.values, ...props) },
    merge(...props){ return merge(this.values, ...props) },
};


const $store = window.$aurora.$store;
export default $store;