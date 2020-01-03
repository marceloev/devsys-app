export default {

    install(Vue, options) {

        Vue.prototype.$isInArray = (array, elem) => isInArray(array, elem);

        function isInArray(array, elem) {
            var x = "", y = 0;
            for (x of array) {
                if (x == elem) {
                    return true;
                }
                y++
            }
            return false;
        };
    }
}