<template>
    <form class="form-inline" id="formSearchTela">
        <el-autocomplete
            id="searchFrameInput"
            class="w-100"
            popper-class="my-autocomplete"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="Please input"
            prefix-icon="el-icon-search"
            @select="handleSelect"
            @focus="isSearching(true)"
            @blur="isSearching(false)"
            >
            <template slot-scope="{ item }">
                <div class="suggested-frame">
                    <div class="suggested-value">{{ item.value }}</div>
                    <span class="suggested-tooltip">{{ item.tooltip }}</span>
                    <hr class="suggested-separator">
                </div>
            </template>
        </el-autocomplete>
    </form>
</template>

<script>
import routes from "@/../static/routes.js"
export default {
  name: "SearchFrame",
  data() {
    return {
      rotas: [],
      state: ''
    };
  }, props: {
    searchingListener: {
      type: Function,
      required: true
    }
  }, methods: {
    isSearching(arg) {
      this.searchingListener(arg);
    },
    querySearch(queryString, cb) {
      var rotas = this.rotas;
      var results = queryString ? rotas.filter(this.createFilter(queryString)) : [];
      cb(results);
    },
    createFilter(queryString) {
      return (rota) => {
        return (rota.display === true && rota.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
      };
    },
    loadAll() {
      return routes;
    }, handleSelect(rota) {
      this.$router.push(rota.path);
    }
  }, mounted() {
    this.rotas = this.loadAll();
  }
}
</script>

<style scoped>
#formSearchTela {
  max-height: 40px;
}

.suggested-frame {
  margin: 2px;
  padding: 0px;
}
.suggested-frame .suggested-value {
  font-size: 14px;
  max-height: 15px;
  font-weight: bold;
}
.suggested-frame .suggested-tooltip {
  font-size: 12.5px;
  max-height: 10px;
  font-style: italic;
}
.suggested-frame .suggested-separator {
  padding: 0px;
  margin: 0px;
}
</style>