<template>
  <dvs-dynaform ref="dynaform" name="Series" service-name="/series" instancia="Séries" :metadata="metadata" :loadByPK="loadByPK">
    <div slot="table-data-cols">
      <el-table-column prop="codigo" label="#" align="center" fixed="left" width="70" sortable></el-table-column>
      <el-table-column prop="descricao" label="Descrição" align="center" sortable></el-table-column>
      <el-table-column prop="nome" label="Nome" align="center" sortable></el-table-column>
      <el-table-column label="Data/Hora Prim. Episódio" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span v-text="$formatDate(scope.row.dataPrimeiroEpisodio, '(Não Definido)')"></span>
        </template>
      </el-table-column>
      <el-table-column label="Data/Hora Ult. Episódio" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span v-text="$formatDate(scope.row.dataUltimoEpisodio, '(Não Definido)')"></span>
        </template>
      </el-table-column>
    </div>
  </dvs-dynaform>
</template>

<script>
import Dynaform from "@/components/framework/dynaform/Dynaform";
import metadataJSON from "@/components/commom/series/metadata.json";
//import rulesJSON from '@/components/commom/series/rules.json';
export default {
  name: "Series",
  components: {
    "dvs-dynaform": Dynaform
  },
  data() {
    return {
      metadata: metadataJSON
      //rules: rulesJSON
    };
  }, methods: {
    loadByPK(params, service, doChange) {
      const codigo = params["codigo"];

      if (!codigo) {
        this.$mensagem("warning", "É necessário selecionar um código válido para o re-posicionamento!");
      } else {
        service.buscarPorId(codigo)
          .then(resp => {
            const data = resp.data;
            doChange(data);
          }).catch(err => {
            console.error(err);
            this.$showError("Não foi encontrado série para o código: " + codigo);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>