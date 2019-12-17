<template>
  <div class="d-flex" id="wrapper">
    <div class="border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">
        <h3>
          <u>TecLibrary</u>
        </h3>
      </div>
      <div id="menu-item" class="list-group list-group-flush">
        <slot name="menu-itens" />
      </div>
    </div>

    <div id="page-content-wrapper">
      <nav class="navbar navbar-light bg-light border-bottom navbar-expand">
        <!--justify-content-between-->
        <i class="fas fa-bars btn btn-dark" @click="abreFechaMenuPanel()"></i>
        <!--<button class="btn btn-outline-success col-of-1 col-2" type="submit">Search</button>-->

        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto"></ul>
          <form class="form-inline col-lg-2 col-sm-3" id="formSearchTela">
            <input
              class="form-control w-100"
              type="search"
              placeholder="Pesquise aqui algum livro"
              aria-label="Search"
              @focus="searchingTela(true)"
              @blur="searchingTela(false)"/>
          </form>
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
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
            </ul>
        </div>
      </nav>
      <div class="container-fluid p-0 m-0 h-100 w-100">
        <slot name="view"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  data() {
    return {};
  },
  methods: {
    abreFechaMenuPanel() {
      $("#wrapper").toggleClass("toggled");
    }, searchingTela(isSearching) {
      var size = (isSearching ? 500 : 100);
      $("#formSearchTela").width(size);
      console.log("fui? " + isSearching)
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
body {
  overflow-x: hidden;
}

#sidebar-wrapper {
  background-color: #7386d5;
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

.sidebar-heading {
  color: white;
  margin-bottom: 40px;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
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

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style>