<template>
    <dvs-dynaform name="Series" service-name="/series" instancia="Séries" :metadata="metadata" :rules="rules">
      <div slot="table-data-cols">
        <el-table-column prop="codigo" label="#" align="center" fixed="left" width="70" sortable></el-table-column>
      </div>
    </dvs-dynaform>
</template>

<script>
import Dynaform from '@/components/framework/dynaform/Dynaform';
import metadataJSON from '@/components/commom/series/metadata.json';
//import rulesJSON from '@/components/commom/series/rules.json';
export default {
  name: 'Series',
  components: {
    'dvs-dynaform': Dynaform
  }, data() {
    return {
      metadata: metadataJSON,
      //rules: rulesJSON
    }
  }
}
</script>

<style scoped>

</style>