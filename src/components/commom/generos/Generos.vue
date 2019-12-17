<template>
  <dvs-dynaform
    name="Generos"
    service-name="/generos"
    instancia="Gêneros"
    :metadata="metadata"
    :rules="rules">
    <div slot="table-data-cols">
        <el-table-column prop="codigo" label="#" align="center" fixed="left" width="70" sortable></el-table-column>
    </div>
    </dvs-dynaform>


</template>

<script>
import Dynaform from "@/components/framework/dynaform/Dynaform";
import metadataJSON from '@/components/commom/generos/metadata.json';
export default {
  name: "Generos",
  components: {
    "dvs-dynaform": Dynaform
  },
  data() {
    return {
      metadata: metadataJSON
      //rules: rulesJSON
    };
  }
};
</script>

<style scoped>
</style>