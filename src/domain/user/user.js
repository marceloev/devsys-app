export default class User {

    constructor(codigo, login, nome) {
        this.codigo = codigo;
        this.login = login;
        this.nome = nome;
    }

    logar(user) {
        if (!user || !user.codigo || !user.login || !user.nome) {
            throw new UserException("Dados do usuário inválido");
        } else {
            console.log("foi")
        }
    }

    
}