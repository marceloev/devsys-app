<template>
  <el-menu-item :index="index" :class="classe" route
      data-toggle="tooltip" data-placement="left" :title="tooltip">
      <i v-if="hasIcon" :class="icon"></i>
      {{ name }}
  </el-menu-item>
</template>

<script>
export default {
  name: "LinkMenuItem",
  props: ["name", "index", "classe", "tooltip", "icon"],
  computed: {
    hasIcon() {
      return (!this.$isEmpty(this.icon));
    }
  }
};
</script>

<style scoped>
.el-menu-item  {
  width: inherit;
  min-width: 0px;
}
</style>