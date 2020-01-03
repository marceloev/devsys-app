<template>
  <div class="form-inline">
    <el-input
      class="rf-id"
      v-model="value[id]"
      @input="persisting"
      disabled
      prefix-icon="el-icon-key"
    ></el-input>
    <el-autocomplete
      v-bind="getFieldItem(field)"
      v-model="searchValue"
      :fetch-suggestions="querySearch"
      @input="changedEntity"
      @select="selectedEntity"
      @blur="undoSelectEntity"
    >
      <template slot-scope="{ item }">
        <div class="suggested-frame">{{ item[id] }} - {{ item[presentation] }}</div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
import BasicService from "@/domain/basic/BasicService";

export default {
  name: "RelationalField",
  props: {
    instancia: { required: true },
    field: { type: Object, required: true },
    id: { type: String, required: true },
    presentation: { type: String, required: true },
    persisting: { type: Function, required: true }
    /*entidade: { type: String, required: true },
    alias: { type: String, required: true },
    endpoint: { type: String, required: true },
    criterio: { type: String, required: true },
    max: { type: Number, required: true }*/
  },
  data() {
    return {
      entitys: [],
      rfValue: ""
    };
  },
  created: function () {
    this.service = new BasicService(this.$http, this.field.endpoint);
  },
  computed: {
    value: {
      // getter
      get: function () {
        return this.instancia == null ? {} : this.instancia;
      },
      // setter
      set: function (newValue) {
        this.$emit("update:instancia", newValue);
      }
    },
    searchValue: {
      // getter
      get: function () {
        return this.rfValue == ""
          ? this.value[this.presentation]
          : this.rfValue;
      },
      // setter
      set: function (newValue) {
        this.rfValue = newValue;
      }
    },
    getFieldItem: app => options => {
      var item = {};

      item["prefix-icon"] = "el-icon-search";
      item["placeholder"] = "Pesquise aqui algum " + options.prop;
      item["popper-class"] = "my-autocomplete";
      item["class"] = "rf-value";
      item["highlight-first-item"] = true;
      item["debounce"] = 300;

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
              "Não foi possível consultar as entidades em " +
              this.field.endpoint
            );
          });
        Promise.resolve(promisse).then(function (v) {
          return cb(v);
        });
      }
    },
    selectedEntity(entity) {
      this.value = entity;
      this.rfValue = entity[this.presentation];
    },
    changedEntity() {
      if (this.value != {}) {
        this.value = {};
      }
      this.persisting();
    }, undoSelectEntity() {
      if (this.$isEmpty(this.value)) {
        this.rfValue = "";
      } else {
        this.rfValue = this.value[this.presentation];
      }
    }
  }
};
</script>

<style scoped>
.rf-id {
  width: 10%;
  max-width: 10%;
  cursor: pointer;
}
.rf-value {
  margin-left: 1%;
  width: 89%;
}
.suggested-frame {
  max-height: 50px;
}
</style>
