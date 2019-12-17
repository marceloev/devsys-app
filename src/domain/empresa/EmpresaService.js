import BasicService from "../basic/BasicService.js";

export default class EmpresaService extends BasicService {

    constructor(axios, service) {
        super(axios, service);
        this.service = service;
    }
}