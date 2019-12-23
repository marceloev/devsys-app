<template>
  <div class="form-inline">
    <el-input class="rf-id" v-model="instancia[id]" @input="persisting" disabled></el-input>
    <el-autocomplete
      class="rf-value"
      popper-class="my-autocomplete"
      v-model="rfValue"
      :fetch-suggestions="querySearch"
      @input="changedEntity"
      :placeholder="valueInstancia"
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
  name: "RelationalField",
  props: {
    instancia: { type: Object, required: true, default: () => {} },
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
      rfValue: "",
    };
  },
  created: function() {
    this.service = new BasicService(axios, this.endpoint);
    this.rfValue = (this.instancia[this.presentation]);
  },
  computed: {
    valueInstancia: {
      get: function() {
        return this.instancia[this.presentation];
      },
      set: function(newValue) {
        this.rfValue = newValue;
      }
    }
  },
  methods: {
    querySearch(queryString, cb) {
      if (!queryString) {
        return cb([]);
      } else {
        var promisse = this.service
          .findRelationalEntityByQuery(
            this.entidade,
            this.alias,
            this.criterio,
            queryString,
            this.max
          )
          .then(resp => {
            return resp.data;
          })
          .catch(err => {
            console.error(err);
            this.$showError(
              err,
              "Não foi possível consultar as entidades em " + this.endpoint
            );
          });
        Promise.resolve(promisse).then(function(v) {
          return cb(v);
        });
      }
    },
    selectedEntity(entity) {
      console.log(entity);
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
