<template>
  <div id="app">
    <div id="title" class="row">
      <hr class="col">
      <h2 class="title-label col-auto">Empresas</h2>
      <hr class="col">
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {};
  },
  methods: {},
  beforeCreate: function() {
    Loading.service(loadingProps);
  },
  created: function() {
    Loading.service(loadingProps).close();
  }
};

var loadingProps = {
  text: 'Carregando "Empresas"...'
};
</script>

<style scoped>
#title {
  margin: 0px;
  padding: 0px 0px 0px 10px;
}

#title .title-label {
  margin: 0px;
  padding: 0px;
}

#title hr {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
