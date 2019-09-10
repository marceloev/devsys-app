export default {

    install(Vue, options) {

        Vue.prototype.$isEmpty = (arg) => {
            return isEmpty(arg);
        };

        function isEmpty(arg) {
            if (arg instanceof String) {
                return (arg === undefined || arg.length === 0);
            } else {
                return (arg === undefined);
            }
        }

        Vue.prototype.$isZero = (arg) => {
            if (arg === undefined) return true;
            return (arg instanceof Number && arg !== 0);
        };

        Vue.prototype.$valueOrDefault = (value, defaultValue) => {
            return (isEmpty(value) ? defaultValue : value);
        };

        Vue.prototype.$booleanToString = (arg) => {
            return (booleanToString(arg));
        };

        function booleanToString(arg) {
            if (arg instanceof String) {
                var value = arg.toString().toUpperCase();
                return (value === 'S' || value === 'SIM');
            } else if (arg instanceof Boolean) {
                return arg;
            } else {
                return false;
            }
        }
    }
}