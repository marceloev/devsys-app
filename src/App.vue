<template>
  <div id="app">
    <main-menu>
      <div slot="menu-itens">
        <link-menu-item idx="1" index="/home" name="Home" icon="fas fa-home" tooltip="Voltar a tela principal" selected></link-menu-item>
        <link-menu-item idx="2" index="/cte" name="Marcelou"></link-menu-item>
        <link-menu-item idx="3" index="cte" name="Marcelou"></link-menu-item>
        <link-menu-item idx="4" name="Marcewlou"></link-menu-item>
        <link-menu-item index="cte" name="Marcelou"></link-menu-item>
      </div>
      <router-view slot="view"></router-view>
    </main-menu>
  </div>
</template>

<script>
import MainMenu from "@/components/MainMenu.vue";
import LinkMenuItem from "@/components/shared/LinkMenuItem.vue";

export default {
  name: "App",
  components: {
    "main-menu": MainMenu,
    "link-menu-item": LinkMenuItem
  }
};
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
