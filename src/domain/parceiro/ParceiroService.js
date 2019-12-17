import BasicService from "../basic/BasicService.js";

export default class ParceiroService extends BasicService {

    constructor(axios, service) {
        super(axios, service);
        this.service = service;
    }
}