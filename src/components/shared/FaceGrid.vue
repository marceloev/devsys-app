<template>
  <div>
    <el-table ref="tabela" :data="rows" border style="width: 100%" size="mini" stripe resizable highlight-current-row>
      <el-table-column prop="codigo" label="#" align="center" fixed="left" width="70" sortable></el-table-column>
      <el-table-column prop="razao" label="Razão Social" align="center" sortable></el-table-column>
      <el-table-column prop="fantasia" label="Nome Fantasia" align="center" sortable></el-table-column>
      <el-table-column prop="cgc" label="CPF/CNPJ" align="center" sortable></el-table-column>
      <el-table-column prop="ie" label="Insc. Estadual" align="center" sortable></el-table-column>
      <el-table-column prop="email" label="E-mail" align="center" sortable></el-table-column>
      <el-table-column type="expand" label="Endereço" width="80">
        <template scope="scope">
          <p>
            <b>
              <u>:: Informações detalhadas do Endereço ::</u>
            </b>
          </p>
          <p>Bairo: {{ scope.row.bairro }}</p>
          <p>Logradouro: {{ scope.row.logradouro }}</p>
          <p>Nº: {{ scope.row.numero }}</p>
          <p>Complemento: {{ scope.row.complemento }}</p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "FaceGrid",
  props: ["rows"],
  created() {
    console.log(this.rows);
  }
};
</script>

<style scoped>
</style>