export default {

    install(Vue, options) {

        Vue.prototype.$formatCpfCnpj = (arg) => formatCpfCnpj(arg);

        function formatCpfCnpj(arg) {
            arg = arg.replace(/\D/g, ""); //Remove tudo o que não é dígito

            if (arg === undefined || arg === null || arg.length === 0) {
                /* Ignore */
            } else if (arg.length < 14) { //CPF
                arg = arg.replace(/(\d{3})(\d)/, "$1.$2");
                arg = arg.replace(/(\d{3})(\d)/, "$1.$2");
                arg = arg.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            } else { //CNPJ
                arg = arg.replace(/^(\d{2})(\d)/, "$1.$2");
                arg = arg.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
                arg = arg.replace(/\.(\d{3})(\d)/, ".$1/$2");
                arg = arg.replace(/(\d{4})(\d)/, "$1-$2");
            };

            return arg;
        };

        Vue.prototype.$formatDate = (arg, dataDefault) => formatDate(arg, dataDefault);

        function formatDate(arg, dataDefault) {
            if (arg === undefined || arg === null || arg.length === 0) {
                return (dataDefault ? dataDefault : arg);
            } else {
                try {
                    return new Date(arg.replace(new RegExp("-"), '/')).toLocaleDateString('pt-BR');
                } catch (e) {
                    return e;
                }
            }
        }

    }
}