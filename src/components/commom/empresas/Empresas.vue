<template>
        <dvs-dynaform name="Empresas" service-name="/empresas" instancia="Empresa" :metadata="metadata">
      <div slot="table-data-cols">
        <el-table-column prop="codigo" label="#" align="right" header-align="center" fixed="left" width="70" sortable></el-table-column>
        <el-table-column prop="cgc" label="CPF/CNPJ" align="right" header-align="center" sortable>
          <template slot-scope="scope">
            <span v-text="$formatCpfCnpj(scope.row.cgc, '(Não Definido)')"></span>
          </template>
        </el-table-column>
        <el-table-column prop="ativo" label="Ativo" align="center" header-align="center" sortable>
          <template slot-scope="scope">
            <span v-text="$formatSimNao(scope.row.ativo)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="razaoSocial" label="Razão Social" align="left" header-align="center" sortable></el-table-column>
        <el-table-column prop="nomeFantasia" label="Nome Fantasia" align="left" header-align="center" sortable></el-table-column>
        <el-table-column prop="ie" label="Insc. Estadual" align="right" header-align="center" sortable></el-table-column>
        <el-table-column prop="inscmun" label="Insc. Municipal" align="right" header-align="center" sortable></el-table-column>
        <el-table-column prop="email" label="Email" align="left" header-align="center" sortable></el-table-column>
        <el-table-column type="expand" label="Endereço" width="80">
          <template slot-scope="scope">
            <div>
              <p><b><u>:: Informações detalhadas do Endereço ::</u></b></p>
              <p><b>Bairro: </b>{{ scope.row.bairro }}</p>
              <p><b>Logradouro: </b>{{ scope.row.logradouro }}</p>
              <p><b>Nº: </b>{{ scope.row.numero }}</p>
              <p><b>Complemento: </b>{{ scope.row.complemento }}</p>
            </div>
          </template>
        </el-table-column>
      </div>
    </dvs-dynaform>
</template>

<script>
import Dynaform from "@/components/framework/dynaform/Dynaform.vue";
import metadataJSON from '@/components/commom/empresas/metadata.json';
export default {
    name: "Empresas",
    components: {
        "dvs-dynaform":Dynaform,
    }, data() {
        return {
            metadata: metadataJSON,
        }
    }
    
}
</script>

<style scoped>

</style>