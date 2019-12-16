<template>
    <dvs-dynaform name="Parceiros" service-name="/parceiros" instancia="Parceiro" :metadata="metadata" :rules="rules">
      <div slot="table-data-cols">
        <el-table-column prop="codigo" label="#" align="center" fixed="left" width="70" sortable></el-table-column>
      </div>
    </dvs-dynaform>
</template>

<script>
import Dynaform from '@/components/framework/dynaform/Dynaform';
import metadataJSON from '@/components/commom/parceiros/metadata.json';
import rulesJSON from '@/components/commom/parceiros/rules.json';
export default {
  name: 'Parceiros',
  components: {
    'dvs-dynaform': Dynaform
  }, data() {
    return {
      metadata: metadataJSON,
      rules: rulesJSON
    }
  }
}
</script>

<style scoped>

</style>