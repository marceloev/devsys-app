export default {
    install(Vue, options) {
        Vue.prototype.$isEmpty = (arg) => {
            if (arg instanceof String) {
                return (arg === undefined || arg.length === 0);
            } else {
                return (arg === undefined);
            }
        };

        Vue.prototype.$isZero = (arg) => {
            if (arg === undefined) return true;
            return (arg instanceof Number && arg !== 0);
        }
    }
}