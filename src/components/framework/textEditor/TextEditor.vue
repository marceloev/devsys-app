<template>
  <div>
    <ckeditor :editor="editor" v-model="value" :config="editorConfig" @input="$emit('update:arg', value)"></ckeditor>
  </div>
</template>

<script>
import ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import CKEditor  from '@ckeditor/ckeditor5-vue';



export default {
  name: 'TextEditor',
  created: function () {
    this.getEditorConfig()
  },
  data (){
    return { 
      value: this.arg,
      editor: ClassicEditor,
      editorConfig: {}
    }
  },
  props: {
    arg: { type: String, required: false },
    fieldtype: { type: String, required: false } 
  },
  methods: {
    getEditorConfig() {
      //depending on the fieldType, we will add different items to the toolbar
      // to see every possibility of items, check https://ckeditor.com/old/forums/CKEditor/Complete-list-of-toolbar-items
      let items = [];

      items = [ 'bold', 'italic', '|', 'undo', 'redo', 'NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Link', 'HorizontalRule'];

      this.editorConfig = {
                    toolbar: {
                        items: items
                    }
                }
    }
  },
  components: {
    ckeditor: CKEditor.component
  },
};
</script>

<style scoped>
</style>