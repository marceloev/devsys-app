<template>
    <dvs-dynaform name="Usuários" service-name="/users" instancia="User" :metadata="metadata">
        <div slot="table-data-cols">
            <el-table-column prop="codigo" label="#" align="right" fixed="left" width="70" sortable></el-table-column>
            <el-table-column prop="login" label="Login" align="left" sortable></el-table-column>
            <el-table-column label="Senha" align="left" sortable>
                <template slot-scope="scope">
                     <span v-text="doPasswordShow(scope.row.password)"></span>
                </template>
            </el-table-column>
            <el-table-column prop="nome" label="Nome" align="left" sortable></el-table-column>
            <el-table-column align="left" label="D/H Limite Acesso">
                <template slot-scope="scope">
                    <i class='el-icon-time'></i>
                    <span v-text="$formatDate(scope.row.dhLimite, '(Não Definido)')"></span>
                </template>
            </el-table-column>
            <el-table-column prop="parceiro" type="expand" label="Parceiro" width="80">
                <template slot-scope="scope">
                    <div v-if="!scope.row.parceiro">
                        <p><b><u>Não há parceiro vinculado.</u></b></p>
                    </div>
                    <div v-else>
                        <p><b><u>:: Informações detalhadas do Parceiro ::</u></b></p>
                        <p><b>Código: </b>{{ scope.row.parceiro.codigo }}</p>
                        <p><b>Nome/Razão: </b>{{ scope.row.parceiro.razao }}</p>
                        <p><b>Apelido/Nome Fantasia: </b>{{ scope.row.parceiro.fantasia }}</p>
                        <p><b>CPF/CNPJ: </b>{{ $formatCpfCnpj(scope.row.parceiro.cgc) }}</p>
                    </div>
                </template>
            </el-table-column>
        </div>
    </dvs-dynaform>
</template>

<script>
import Dynaform from '@/components/framework/dynaform/Dynaform';
import metadataJSON from '@/components/commom/usuarios/metadata.json';
export default {
  name: 'Users',
  components: {
    'dvs-dynaform': Dynaform
  }, data() {
    return {
      metadata: metadataJSON
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