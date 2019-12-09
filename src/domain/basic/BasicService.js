export default class BasicService {

    constructor(axios, service) {
        this.axios = axios;
        this.url = 'http://127.0.0.1:8180';
        this.service = service;
    }

    buscarPorId(id) {
        var finalURL = this.url + this.service + '/' + id;
        return this.axios.get(finalURL);
    }

    buscarTodos() {
        let finalURL = this.url + this.service;
        return this.axios.get(finalURL);
    }

    salvar(row) {
        let finalURL = this.url + this.service;
        return this.axios.post(finalURL, row);
    }

    excluir(id) {
        var finalURL = this.url + this.service + '/' + id;
        return this.axios.delete(finalURL);
    }

    retrieveMetadata(nomeInstancia) {
        var finalURL = this.url + "/metadata/campos/" + nomeInstancia;
        return this.axios.get(finalURL);
    };
}