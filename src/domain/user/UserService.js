import BasicService from "../basic/BasicService.js";

export default class UserService extends BasicService {

    constructor(axios, service) {
        super(axios, service);
        this.service = service;
    }

    findByLogin(username, password) {
        var finalURL = this.url + '/' + this.service + '/username';
        
        const queryParams = {
            username: username,
            password: password
        };

        return this.axios.get(finalURL, { params: queryParams });
    }
}