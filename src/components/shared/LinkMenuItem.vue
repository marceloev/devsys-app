<template>
  <div
    id="link-menu-item"
    class="list-group-item list-group-item-action"
    @click="openUrl()"
    data-toggle="tooltip"
    data-placement="left"
    :title="tooltip"
  >
    <i id="link-menu-item-icon"></i>
    <a id="link-menu-item-info" v-text="name"></a>
  </div>
</template>

<script>
export default {
  name: "LinkMenuItem",
  props: {
    idx: {
      default: "",
      type: String
    },
    name: {
      default: "",
      type: String
    },
    index: {
      default: "",
      type: String
    },
    icon: {
      default: "",
      type: String
    },
    tooltip: {
      default: "",
      type: String
    },
    classPath: {
      default: "",
      type: String
    },
    selected: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    openUrl() {
      if (this.$isEmpty(this.index)) {
        return;
      }
      this.$router.push(this.index);
      this.setSelectedIndex();
    },
    setSelectedIndex() {
      $(".list-group-item").removeClass("selected");
      $("." + this.classPath).addClass("selected");
    }
  },
  created() {
    if (this.icon === undefined) {
      $("#link-menu-item-icon").remove();
    } else {
      $("#link-menu-item-icon").addClass(this.icon);
    }
  },
  mounted() {
    if (!this.$isEmpty(this.idx)) {
      this.classPath = this.$options.name + this.idx;
      this.$el.classList.add(this.classPath);
    };

    if (this.selected) {
      this.setSelectedIndex();
    }
  }
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
  background-color: inherit;
  max-height: 45px;
  text-align: -webkit-match-parent;
  color: whitesmoke;
}

#link-menu-item:hover {
  transition: all 0.2s;
  background-color: white;
  color: black;
}

.selected {
  background-color: white;
  color: black;
  border: solid 0.2px white;
}

.selected:before {
  content: "\f0da\3000";
  white-space: pre;
  font-family: FontAwesome;
  font-weight: normal;
  font-style: normal;
  margin: 0px 0px 0px 10px;
  text-decoration: none;
}
</style>