<template>
  <div class="form-inline">
    <el-input class="rf-id" v-model="instancia[id]" @input="persisting" disabled></el-input>
    <el-autocomplete
      v-bind="getFieldItem(field)"
      v-model="rfValue"
      :fetch-suggestions="querySearch"
      @input="changedEntity"
      @select="selectedEntity"
    >
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
  name: "RelationalField",
  props: {
    instancia: { type: Object, required: true },
    field: { type: Object, required: true },
    id: { type: String, required: true },
    presentation: { type: String, required: true },
    persisting: { type: Function, required: true },
    /*entidade: { type: String, required: true },
    alias: { type: String, required: true },
    endpoint: { type: String, required: true },
    criterio: { type: String, required: true },
    max: { type: Number, required: true }*/
  },
  data() {
    return {
      entitys: [],
      rfValue: "",
    };
  },
  created: function() {
    this.service = new BasicService(axios, this.field.endpoint);
    console.log("oi");
    //this.rfValue = this.instancia[this.presentation];
  },
  computed: {
    getFieldItem: app => options => {
      var item = {};

      item["prefix-icon"] = "el-icon-search";
      item["placeholder"] = "Pesquise aqui algum " + options.prop;
      item["popper-class"] = "my-autocomplete";
      item["class"] = "rf-value";

      return item;
    }
  },
  methods: {
    querySearch(queryString, cb) {
      if (!queryString) {
        return cb([]);
      } else {
        var promisse = this.service
          .findRelationalEntityByQuery(
            this.field.entidade,
            this.field.alias,
            this.field.criterio,
            queryString,
            this.field.max
          )
          .then(resp => {
            return resp.data;
          })
          .catch(err => {
            console.error(err);
            this.$showError(
              err,
              "Não foi possível consultar as entidades em " + this.field.endpoint
            );
          });
        Promise.resolve(promisse).then(function(v) {
          return cb(v);
        });
      }
    },
    selectedEntity(entity) {
      this.$emit("update:instancia", entity);
      this.rfValue = entity[this.presentation];
    },
    changedEntity() {
      this.$emit("update:instancia", {});
      this.persisting();
    }
  }
};
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
