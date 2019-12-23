<template>
    <div class="form-inline">
      <el-input class="rf-id" v-model="getValue(id)" @input="persisting" disabled></el-input>
      <el-autocomplete class="rf-value"
        id="rfValue"
        :fetch-suggestions="querySearch"
        @input="changedEntity"
        placeholder="Digite aqui para pesquisar"
        prefix-icon="el-icon-search"
        @select="selectedEntity">
          <template slot-scope="{ item }">
            <div class="suggested-frame">{{ item[id] }} - {{ item[presentation] }}</div>
        </template>
      </el-autocomplete>
    </div>
</template>

<script>
import axios from "axios";
import BasicService from "@/domain/basic/BasicService";

export default {
  name: 'RelationalField',
  props: {
    instancia: { type: Object, required: false, default: () => { } },
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
      entitys: [],
    }
  }, created: function () {
    this.service = new BasicService(axios, this.endpoint);
  }, computed: {
    valueInstancia: {
      get: function () {
        return this.instancia;
      },
      set: function (newValue) {
        this.instancia = newValue;
      }
    },
    getValue: (app) => (prop) => {
      return (this.valueInstancia == undefined ? "" : this.valueInstancia[prop]);
    }
  }, methods: {
    querySearch(queryString, cb) {
      //var results = queryString ? rotas.filter(this.createFilter(queryString)) : [];-
      var results = [{ "codigo": "1", "razao": "oizão" }, { "codigo": "2", "razao": "oizin" }];
      console.log(this.service.findRelationalEntityByQuery(this.entidade, this.alias, this.criterio, "M", this.max).then(resp => { return resp.data }));
      //results = this.service.findRelationalEntityByQuery(this.entidade, this.alias, this.criterio, "M", this.max).then(resp => {return resp.data});
      return cb(results);
    },
    selectedEntity(entity) {
      console.log(entity);
    }, changedEntity(entity) {
      this.valueInstancia = entity;
      this.persisting();
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
.suggested-frame {
  max-height: 50px;
}
</style>