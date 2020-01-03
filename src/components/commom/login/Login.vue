<template>
    <form>
    <div class="text-center">
        <div class="modal-dialog">
            <div class="col-lg-8 col-sm-8 col-12 main-section">
                <div class="modal-content">
                    <div class="col-lg-12 col-sm-12 col-12 user-img">
                        <img style="border-radius: 50px;">
                    </div>
                    <div class="col-lg-12 col-sm-12 col-12 user-name">
                        <h2><u>Acessar TecLibrary</u></h2>
                    </div>
                    <div class="alert alert-danger" th:if="${error}">
                        <font size="4" th:text="${error}"></font>
                    </div>
                    <div class="alert alert-info" th:if="${msg}">
                        <font size="4">
                            <span th:text="${msg}">.</span>
                        </font>
                    </div>
                    <div class="col-lg-12 col-sm-12 col-12 form-input">
                        <div class="form-group">
                            <label class="float-left" for="username">Login:</label>
                            <input type="text" class="form-control text-uppercase" id="username" name="username"
                                   autofocus required>
                        </div>
                        <div class="form-group">
                            <label class="float-left" for="password">Senha:</label>
                            <input type="password" class="form-control" id="password" name="password"
                                   required>
                        </div>
                        <button type="submit" class="btn btn-success">Acessar o Sistema</button>
                    </div>
                    <div class="col-lg-12 col-sm-12 col-12 link-part">
                        <a>Esqueceu sua senha?</a>
                        <br/>
                        <a>Deseja fazer um novo cadastro?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
</template>

<script>
export default {
    mounted() {
        console.log("oi");
    }
}
</script>

<style scoped>

</style>