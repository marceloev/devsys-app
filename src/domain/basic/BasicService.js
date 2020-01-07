export default class BasicService {

    constructor(axios, service) {
        this.axios = axios;
        this.url = '/api';
        //this.url = 'http://serienatico.herokuapp.com';
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

    findRelationalEntityByQuery(entity, alias, criterio, search, max) {
        let finalURL = this.url + this.service + '/findByQuery';
        const queryParams = {
            entidade: entity,
            alias: alias,
            criterio: criterio,
            stringQuery: search,
            max: max
        };

        return this.axios.get(finalURL, { params: queryParams });
    }

    retrieveMetadata(nomeInstancia) {
        var finalURL = this.url + "/metadata/campos/" + nomeInstancia;
        return this.axios.get(finalURL);
    };
}