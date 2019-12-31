export default {

    install(Vue, options) {

        Vue.prototype.$runLater = (delay, todo, ...arg) => runLater(delay, todo, ...arg);

        function runLater(delay, todo, ...arg) {
            console.log(arg);
            setTimeout(function() {
                todo(arg);
            }, delay)
        }
    }
}