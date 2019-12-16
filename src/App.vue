<template>
    <div id="app">
        <main-menu>
            <div slot="menu-itens">
                <el-menu default-active="1" class="el-menu-vertical-demo" router>
                    <link-sub-menu index="1" name="Cadastros" tooltip="Veja as opções de cadastros" icon="fas fa-info">
                        <div slot="sub-menu-itens">
                            <link-menu-item index="/empresas" name="Empresas" tooltip="Acessar a tela de Empresas" icon="far fa-building" classe="p-r-0"></link-menu-item>
                            <link-menu-item index="/users" name="Usuários" tooltip="Acessar a tela de Usuários" icon="fa fa-users"></link-menu-item>
                            <link-menu-item index="/parceiros" name="Parceiros" tooltip="Acessar a tela de Parceiros" icon="far fa-handshake"></link-menu-item>
                        </div>
                    </link-sub-menu>
                    <link-sub-menu index="2" name="Processos" tooltip="Vamos a alguns processos" icon="fas fa-people-carry">
                        <div slot="sub-menu-itens">
                            <link-menu-item index="/empresas1" name="Empresas" tooltip="Acessar a tela de Empresas" icon="far fa-building"></link-menu-item>
                            <link-menu-item index="/parceiros2" name="Parceiros" tooltip="Acessar a tela de Parceiros" icon="far fa-handshake"></link-menu-item>
                        </div>
                    </link-sub-menu>
                </el-menu>
            </div>
            <router-view slot="view"></router-view>
        </main-menu>
    </div>
</template>

<script>
import MainMenu from "@/components/framework/mainmenu/MainMenu.vue";
import LinkSubMenu from "@/components/framework/mainmenu/LinkSubMenu.vue"
import LinkMenuItem from "@/components/framework/mainmenu/LinkMenuItem.vue";

export default {
  name: "App",
  components: {
    "main-menu": MainMenu,
    "link-sub-menu": LinkSubMenu,
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
