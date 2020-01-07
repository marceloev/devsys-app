export default {

    install(Vue, options) {

        Vue.prototype.$runLater = (delay, todo, ...arg) => runLater(delay, todo, ...arg);
        Vue.prototype.$getUser = (prop) => getUser(prop);
        Vue.prototype.$getUserFotoURL = (username, withDefault) => getUserFotoURL(username, withDefault);

        function runLater(delay, todo, ...arg) {
            console.log(arg);
            setTimeout(function() {
                todo(arg);
            }, delay)
        }

        function getUser(prop) {
            const user = JSON.parse(localStorage.getItem("user"));
            return (prop ? user[prop] : user);
        }

        function getUserFotoURL(username, withDefault) {
            var url = "https://serienatico.herokuapp.com/users/foto/";
            url += (username || getUser("login"));
            url += (withDefault ? "?withDefault=true" : "");
            return url;
        }
    }
}