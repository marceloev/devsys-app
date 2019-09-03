export default class ParceiroService {

    constructor(axios) {
        this.axios = axios;
        this.url = 'http://127.0.0.1:8180';
        this.service = '/parceiros';
    }

    buscarPorId(id) {
        var finalURL = this.url + this.service + '/' + id;
        return this.axios.get(finalURL);
    }

    buscarTodos() {
        let finalURL = this.url + this.service;
        return this.axios.get(finalURL);
    }

    buscarComFiltro(pagina, quantidade, campo, valor) {
        return this._http.get('parceiros?pagina=' + (pagina - 1) + '&qtd=' + quantidade + '&' + campo + '=' + valor).then(res => res.body);
    }

    salvar(parceiro) {
        let finalURL = this.url + this.service;
        return this.axios.post(finalURL, parceiro);
    }

    excluir(id) {
        var finalURL = this.url + this.service + '/' + id;
        return this.axios.delete(finalURL);
    }
}