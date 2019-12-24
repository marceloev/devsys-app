<template>
    <dvs-dynaform name="Parceiros" service-name="/parceiros" instancia="Parceiro" :metadata="metadata" :rules="rules">
      <div slot="table-data-cols">
        <el-table-column prop="codigo" label="#" align="right" fixed="left" width="70" sortable></el-table-column>
        <el-table-column prop="cgc" label="CPF/CNPJ" align="right" sortable>
          <template slot-scope="scope">
            <span v-text="$formatCpfCnpj(scope.row.cgc, '(Não Definido)')"></span>
          </template>
        </el-table-column>
        <el-table-column prop="razao" label="Razão Social" align="left" sortable></el-table-column>
        <el-table-column prop="fantasia" label="Nome Fantasia" align="left" sortable></el-table-column>
        <el-table-column prop="ie" label="Insc. Estadual" align="right" sortable></el-table-column>
        <el-table-column prop="email" label="Email" align="left" sortable></el-table-column>
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
import Dynaform from '@/components/framework/dynaform/Dynaform';
import metadataJSON from '@/components/commom/parceiros/metadata.json';
import rulesJSON from '@/components/commom/parceiros/rules.json';
export default {
  name: 'Parceiros',
  components: {
    'dvs-dynaform': Dynaform
  }, data() {
    return {
      metadata: metadataJSON,
      rules: rulesJSON
    }
  }
}
</script>

<style scoped>
</style>