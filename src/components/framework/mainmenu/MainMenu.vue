<template>
  <div class="d-flex" id="wrapper">
    <div class="border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">
        <h3>
          <u id="btn-home" @click="goHome">TecLibrary</u>
          <i id="untoggle-menu" class="fas fa-times btn btn-dark" @click="abreFechaMenuPanel()"></i>
        </h3>
      </div>
      <div id="menu-item" class="list-group list-group-flush">
        <slot name="menu-itens" />
      </div>
    </div>

    <div id="page-content-wrapper">
      <nav class="navbar navbar-light bg-light border-bottom navbar-expand">
        <!--justify-content-between-->
        <i id="toggle-menu" class="fas fa-bars btn btn-dark" @click="abreFechaMenuPanel()"></i>
        <!--<button class="btn btn-outline-success col-of-1 col-2" type="submit">Search</button>-->

        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto"></ul>
          <sapp-search-frame :searchingListener="searchingTela" />
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link"
                id="navbarDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-v"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <h6 class="dropdown-header">
                  <i class="fas fa-tools"></i> Outras Opções
                </h6>
                <div class="dropdown-divider"></div>
                <el-avatar :size="50" >
                  <img shape="square" :fit="'fill'" :src="loggedUserFoto" />
                </el-avatar>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click="doLogout">Sair do sistema</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container-fluid active-page">
        <slot name="view"></slot>
      </div>
    </div>
    <div id="dimScreen"></div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import SearchFrame from "@/components/framework/mainmenu/SearchFrame.vue";
export default {
  name: "MainMenu",
  components: {
    "sapp-search-frame": SearchFrame
  },
  data() {
    return {
      loggedUserFoto: this.$getUserFotoURL(this.$getUser("login"), true),
    };
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    abreFechaMenuPanel() {
      $("#wrapper").toggleClass("toggled");
    },
    searchingTela(isSearching) {
      var size = isSearching ? 300 : 200;
      $("#formSearchTela").width(size);
    },
    doLogout() {
      localStorage.removeItem("user");
      this.$router.push("/login?logout=true");
      this.$router.go();
    }
  },
  beforeCreate: function() {
    Loading.service(loadingProps);
  },
  created: function() {
    Loading.service(loadingProps).close();
    this.abreFechaMenuPanel();
  }
};

var loadingProps = {
  text: "Carregando o menu principal..."
};
</script>

<style scoped>
#sidebar-wrapper {
  background-color: #7386d5;
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
  z-index: 1;
  position: fixed;
}
#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
  color: white;
  margin-bottom: 2rem;
}
#sidebar-wrapper .list-group {
  width: 15rem;
}
#page-content-wrapper {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
}
#page-content-wrapper .active-page {
  padding: 0px;
  margin: 0px;
  width: 100%;
  flex-grow: 1;
}
#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}
#menu-item {
  border-top: 1px solid #47748b;
  border-bottom: 1px solid #47748b;
}
#navbarDropdown {
  cursor: pointer;
}
#btn-home {
  cursor: pointer;
}
#untoggle-menu {
  display: initial;
  right: 10px;
  background-color: transparent;
  border-color: transparent;
  font-size: large;
  position: absolute;
}
#dimScreen {
  display: none;
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
    z-index: 0;
    position: inherit;
  }
  #page-content-wrapper {
    min-width: 0;
    width: 100%;
    min-height: 0;
    height: inherit;
  }
  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
  #untoggle-menu {
    display: none;
  }
}
</style>