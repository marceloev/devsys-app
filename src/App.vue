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
                            <link-menu-item index="/series" name="Series" tooltip="Acessar a tela de Séries" icon="far fa-handshake"></link-menu-item>
                            <link-menu-item index="/generos" name="Generos" tooltip="Acessar a tela de Gêneros" icon="far fa-handshake"></link-menu-item>
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
  data() {
    return {
      pressingCtrl: false,
    }
  },
  components: {
    "main-menu": MainMenu,
    "link-sub-menu": LinkSubMenu,
    "link-menu-item": LinkMenuItem
  }, methods: {
    focusSearchFrame: function() {
      //@keyup.ctrl.alt.75="focusSearchFrame"
      //$("#searchFrameInput").focus();
    }
  }, mounted() {    
    $(document).keyup(function (e) {  //O evento Kyeup é acionado quando as teclas são soltas
      if (e.which == 17) this.pressingCtrl = false; //Quando qualuer tecla for solta é preciso informar que Crtl não está pressionada
    })
    $(document).keydown(function (e) { //Quando uma tecla é pressionada
      if (e.which == 17) this.pressingCtrl = true; //Informando que Crtl está acionado
      if ((e.which == 75 || e.keyCode == 75) && this.pressingCtrl == true) { //Reconhecendo tecla Enter
        $("#searchFrameInput").focus();
      }
    });
  }
};
</script>

<style>
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: LightGray; }
::-webkit-scrollbar-thumb { background: DarkGray; }
::-webkit-scrollbar-thumb:hover { background: Black; }
</style>
