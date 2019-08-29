<template>
  <div id="link-menu-item" class="list-group-item list-group-item-action" @click="openUrl()">
    <i id="link-menu-item-icon"></i>
    <a id="link-menu-item-info" v-text="name"></a>
  </div>
</template>

<script>
export default {
  props: ["name", "index", "icon"],
  methods: {
    openUrl() {
      if (this.index === undefined || this.index.length === 0) {
        return;
      }
      this.$router.push(this.index);
    }
  },
  created() {
    if (this.icon === undefined) {
      $("#link-menu-item-icon").remove();
    } else {
      $("#link-menu-item-icon").addClass(this.icon);
    }
  }
};
</script>

<style scoped>
#link-menu-item {
  cursor: pointer;
  background-color: inherit;
  max-height: 45px;
  text-align: -webkit-match-parent;
  color: whitesmoke;
}

#link-menu-item:hover {
  transition: all 0.2s;
  background-color: whitesmoke;
  color: black;
}
</style>