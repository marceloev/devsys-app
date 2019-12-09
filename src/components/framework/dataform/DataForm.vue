<template>
    <el-form id="form-fields" label-width="auto" ref="form" size="mini" :model="model" :rules="rules">
      <div v-for="field in metadata"> 
        <el-divider v-if="field.separator" content-position="left"> {{field.separator}}</el-divider>
        <el-form-item v-else v-bind="getFieldItem(field)">
          <el-input v-model="model[field.prop]" @input="persisting" v-bind="getFieldOptions(field)"></el-input>
        </el-form-item>
      </div>
    </el-form>
</template>

<script>
export default {
  name: 'DataForm',
  props: {
    metadata: {
      type: Array,
      required: true
    }, model: {
      type: Object,
      required: true
    }, rules: {
      type: Object,
      required: false
    }, persisting: {
      type: Function,
      required: false
    }
  }, computed: {
    getFieldItem: (app) => (options) => {
      var item = {};

      item["size"] = "mini";
      item["label"] = options.label + ":";
      item["required"] = !!options.required;
      item["prop"] = options.prop;
      item["class"] = "field field-item";

      return item;
    }, getFieldOptions: (app) => (options) => {
      var metadata = {};
      
      metadata["class"] = "field field-input";
      metadata["type"] = options.type || 'tel';
      metadata["disabled"] = !!options.disabled;
      metadata["required"] = !!options.required;
      metadata["placeholder"] = (options.placeholder ? options.placeholder : options.label);
      metadata["clearable"] = true;
      metadata["show-word-limit"] = true;

      if (options.maxlength) {
        metadata["maxlength"] = options.maxlength;
      };

      if (options.tooltip) {
        metadata["sapp-custom-tooltip"] = true;
        metadata["data-toggle"] = "tooltip";
        metadata["data-placement"] = "bottom";
        metadata["title"] = options.tooltip;
      };

      if (options.format) {
        metadata["format"] = options.format;
      };

      if (options.mask) {
        metadata["masked"] = options.mask;
      };

      if (options.rows) {
        metadata["rows"] = options.rows;
      };

      return metadata;
    }
  }
};

$(function () {
  $('[sapp-custom-tooltip]').tooltip();
});
</script>

<style scoped>
.field {
  padding: 1px 1px 1px 1px;
  margin: 0px 0px 0px 0px;
}
</style>