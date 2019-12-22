<template>
    <div class="form-inline">
      <el-input class="rf-id" v-model="instancia[id]" @input="persisting" disabled></el-input>
      <el-autocomplete class="rf-value" 
        v-model="instancia[presentation]" 
        :fetch-suggestions="querySearch"
        @input="persisting"
        placeholder="Digite aqui para pesquisar"
        prefix-icon="el-icon-search"
        @select="selectedEntity"></el-autocomplete>
    </div>
</template>

<script>
import axios from "axios";
import BasicService from "@/domain/basic/BasicService";

export default {
  name: 'RelationalField',
  props: {
    instancia: { type: Object, required: true },
    id: { type: String, required: true },
    presentation: { type: String, required: true },
    persisting: { type: Function, required: true },
    entidade: { type: String, required: true },
    alias: { type: String, required: true },
    endpoint: { type: String, required: true },
    criterio: { type: String, required: true },
    max: { type: Number, required: true }
  },
  data() {
    return {
      entitys: []
    }
  }, created: function () {
    this.service = new BasicService(axios, this.endpoint);
  }, methods: {
    querySearch(queryString, cb) {
      var entitys = this.entitys;
      //var results = queryString ? rotas.filter(this.createFilter(queryString)) : [];
      this.service.findRelationalEntityByQuery(this.entidade, this.alias, this.criterio, this.criterio, this.queryString, this.max)
        .then(resp => {
          this.entitys = resp;
        }).catch(err => {
          console.error(err);
          this.$showError(err, 'Não foi possível carregar a relação de "' + this.endpoint + '". ');
        });
      cb(entitys);
    },
    selectedEntity() {
      console.log("Selected");
    }
  }
}
</script>

<style scoped>
.rf-id {
  width: 10%;
  max-width: 10%;
}
.rf-value {
  margin-left: 1%;
  width: 89%;
}
</style>