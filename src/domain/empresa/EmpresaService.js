export default class EmpresaService {

    constructor(axios) {
        this.axios = axios;
        this.url = 'http://127.0.0.1:8180';
        this.service = '/empresas';
    }

    buscarPorId(id) {
        var finalURL = this.url + this.service + '/' + id;
        return this.axios.get(finalURL);
    }

    buscarTodos() {
        let finalURL = this.url + this.service;
        return this.axios.get(finalURL);
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