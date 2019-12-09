<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item
    prop="region"
    label="Email"
    :rules="getFieldProp()"
  >
    <el-input v-model="ruleForm.region"></el-input>
  </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'DynaformFieldBuilder',
  data() {
    return {
      metadata: {
        "maxlength": 30,
        "prop": "login",
        "ordem": 2,
        "disabled": false,
        "label": "Login",
        "type": "text",
        "required": true
      },
      ruleForm: {
        name: 'asdasd',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  }, computed: {
    getFieldProp: (app) => (dataw, fieldProp) => {
      /* length */
      if (this.metadata.maxlength !== undefined) {
        
      }
      /* fim lenght */
      return { required: true, message: 'domain can not be null', trigger: 'blur' };
      /*    :rules="[
      { required: true, message: 'Please input email address', trigger: 'blur' },
      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
    ]"*/
    }
  }

}
</script>

<style scoped>
</style>