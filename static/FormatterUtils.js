export default {

    install(Vue, options) {

        Vue.prototype.$formatSimNao = (arg) => formatSimNao(arg);
        Vue.prototype.$formatCpfCnpj = (arg) => formatCpfCnpj(arg);
        Vue.prototype.$formatDate = (arg, dataDefault) => formatDate(arg, dataDefault);

        function formatSimNao(arg) {
            if (arg) {
                if (arg === true || arg == "S" || arg == "Sim") {
                    return "Sim";
                } else {
                    return "Não";
                }
            } else {
                return "Não"
            }
        };

        function formatCpfCnpj(arg) {
            arg = ("" + arg).replace(/\D/g, ""); //Remove tudo o que não é dígito

            if (!arg || arg.length === 0) {
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

        function formatDate(arg, dataDefault) {
            if (!arg) {
                return dataDefault;
            } else {
                try {
                    return new Date(arg).toLocaleDateString('pt-BR');
                } catch (e) {
                    return e;
                }
            }
        }

    }
}