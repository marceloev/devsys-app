<template>
    <el-submenu :index="index" data-toggle="tooltip" data-placement="left" :title="tooltip">
        <template slot="title">
            <i v-if="hasIcon" :class="icon" style="margin-right: 10px; margin-top: -3px;"></i>
            {{name}}
        </template>
        <slot name="sub-menu-itens"></slot>
    </el-submenu>
</template>

<script>
export default {
  name: "LinkSubMenu",
  props: ["name", "index", "tooltip", "icon"],
  computed: {
    hasIcon() {
      return (!this.$isEmpty(this.icon));
    }
  }
}
</script>

<style scoped>
.el-submenu .el-menu-item {
  min-width: 0px;
}
</style>