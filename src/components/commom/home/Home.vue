<template>
  <div class="section">
    <div class="card card-1">
        <sapp-text-editor
         :arg.sync="fooObj" >
        </sapp-text-editor>
    </div>
  </div>
    
    
</template>

<script>
import TextEditor from "@/components/framework/textEditor/TextEditor.vue";
export default {
  data () {
    return {
      fooObj: 'abc'
    }
  },
  name: 'Home',
  components: {
    'sapp-text-editor': TextEditor
  },
  methods: {
    print(text) {
        console.log(text);
    }
  }
}
</script>

<style scoped>
body {
  background: #e2e1e0;
  text-align: center;
}

.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 300px;
  margin: 1rem;
  position: relative;
  width: 300px;
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.card-1:hover {
  top: -5px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

</style>