import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';

export default {
    install(Vue, options) {

        var defaultProps = {
            title: 'Título ainda não programado',
            message: 'Mensagem ainda não programada!',
            type: 'info',
            showClose: true,
            duration: 3000,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar',
            closeOnPressEscape: true
        };

        function getProps(props) {
            var temp = (props === undefined ? defaultProps : props);
            return Object.assign({}, temp);
        };

        Vue.prototype.$mensagem = (type, msg, props) => {
            props = getProps(props);
            props['type'] = type;
            props['message'] = msg;
            Message(props);
        };

        Vue.prototype.$showConfirm = (type, msg, title, props) => {
            props = getProps(props);
            props['type'] = type;
            props['title'] = (title === undefined ? 'Atenção' : title);
            props['message'] = msg;
            return MessageBox.confirm(props['message'], props['title'], props);
        };

        Vue.prototype.$showError = (msg, title, props) => {
            props = getProps(props);
            props['type'] = 'error';
            props['message'] = msg;
            props['title'] = (title === undefined ? 'Erro' : title);
            MessageBox.alert(props['message'], props['title'], props);
        };
    }
}