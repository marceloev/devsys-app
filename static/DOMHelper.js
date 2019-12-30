export default {

    install(Vue, options) {

        Vue.prototype.$getElem = (dom, elemName) => getElem(dom, elemName);

        function getElem(dom, elemName) {
            console.log(dom);
            if (!!dom) {
                console.log(dom);
            }
            return "";
        };
    }
}