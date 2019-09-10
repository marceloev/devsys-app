<template>
    <dvs-dynaform name="Usuários" service-name="/users" :metadata="metadata">
        <div slot="form-data-cols">
            <h1>fasdfasf</h1>
        </div>
        <div slot="table-data-cols">
            <el-table-column prop="codigo" label="#" align="center" fixed="left" width="70" sortable></el-table-column>
            <el-table-column prop="login" label="Login" align="center" sortable></el-table-column>
            <el-table-column label="Senha" align="center" sortable>
                <template slot-scope="scope">
                     <span v-text="doPasswordShow(scope.row.password)"></span>
                </template>
            </el-table-column>
            <el-table-column prop="nome" label="Nome" align="center" sortable></el-table-column>
            <el-table-column label="D/H Limite Acesso" align="center">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span v-text="$formatDate(scope.row.dhLimite, '(Não Definido)')"></span>
                </template>
            </el-table-column>
            <el-table-column prop="parceiro" type="expand" label="Parceiro" width="80">
                <template slot-scope="scope">
                    <div v-if="scope.row.parceiro === undefined || scope.row.parceiro === null">
                        <p><b><u>Não há parceiro vinculado.</u></b></p>
                    </div>
                    <div v-else>
                        <p><b><u>:: Informações detalhadas do Parceiro ::</u></b></p>
                        <p>Código: {{ scope.row.parceiro.codigo }}</p>
                        <p>Nome/Razão: {{ scope.row.parceiro.razao }}</p>
                        <p>Apelido/Nome Fantasia: {{ scope.row.parceiro.fantasia }}</p>
                        <p>CPF/CNPJ: {{ $formatCpfCnpj(scope.row.parceiro.cgc) }}</p>
                    </div>
                </template>
            </el-table-column>
        </div>
    </dvs-dynaform>
</template>

<script>
import Dynaform from '@/components/shared/Dynaform';
export default {
  name: 'Users',
  components: {
    'dvs-dynaform': Dynaform
  }, data() {
    return {
      metadata: [
        { label: 'Código: ', prop: 'codigo', type: 'number', disabled: true, required: false },
        { label: 'Login: ', prop: 'login', type: 'text', disabled: false, required: true },
        { label: 'Senha: ', prop: 'senha', type: 'password', disabled: false, required: true },
        { label: 'Nome: ', prop: 'nome', type: 'text', disabled: false, required: true },
        { label: 'Data/Hora Limite: ', prop: 'dhLimite', type: 'date', disabled: false, required: false, format: "yyyy/MM/dd", placeholder: 'Digite aqui a data limite para o usuário acessar o sistema.'},
      ]
    }
  }, computed: {
    doPasswordShow: (app) => (password) => {
      if (password.toString().length == 0)
        return "";
      else
        return '*'.repeat(password.toString().length);
    }
  }
}
</script>

<style scoped>
</style>