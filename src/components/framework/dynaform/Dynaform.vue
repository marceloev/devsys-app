<template>
    <div id="app" class="container-fluid">
        <div id="title" class="row">
            <el-divider content-position="left">
                <h2 v-text="name"></h2>
            </el-divider>
        </div>
        <div id="navigator" class="form-row">
            <div class="col-auto">
                <el-button-group>
                    <el-button type="info" @click="changeLayout()">
                        <i v-show="modoFormulario" class="el-icon-s-order" data-toggle="tooltip" data-placement="left" title="Ir p/ modo Grade"></i>
                        <i v-show="!modoFormulario" class="el-icon-s-grid" data-toggle="tooltip" data-placement="left" title="Ir p/ modo Formulário"></i>
                    </el-button>
                    <el-button type="primary" icon="el-icon-refresh-right" plain @click="buscarTodos" data-toggle="tooltip" data-placement="left" title="Atualizar"></el-button>
                    <el-button type="success" icon="el-icon-plus" plain @click="novo" data-toggle="tooltip" data-placement="left" title="Adicionar"></el-button>
                    <el-button type="info" icon="el-icon-edit" plain @click="editar" data-toggle="tooltip" data-placement="left" title="Editar"></el-button>
                    <el-button type="primary" icon="el-icon-copy-document" plain @click="duplicar" data-toggle="tooltip" data-placement="left" title="Duplicar"></el-button>
                    <el-button type="success" icon="el-icon-check" @click="salvar" v-show="persisting" data-toggle="tooltip" data-placement="left" title="Salvar"></el-button>
                    <el-button type="danger" icon="el-icon-close" @click="cancelar(false)" v-show="persisting" data-toggle="tooltip" data-placement="left" title="Cancelar"></el-button>
                    <el-button type="warning" icon="el-icon-delete" plain @click="excluir" data-toggle="tooltip" data-placement="left" title="Excluir"></el-button>
                </el-button-group>
            </div>
            <div class="col p-0">
                <el-input v-model="filtro" maxlength="50" placeholder="Pesquise algo aqui ;)" prefix-icon="el-icon-search" clearable/>
            </div>
            <div class="col-auto m-0">
                <el-tag type="info" size="medium" effect="plain" color="whitesmoke" class="font-weight-bold h-100 m-l-0" data-toggle="tooltip" data-placement="left" title="Resultados encontrados">
                    <u>{{ this.filtredRow.length }}</u>
                </el-tag>
            </div>
        </div>
        <div id="modo-formulario" v-show="modoFormulario">
            <dvs-dataform :metadata="metadata" :model="data" :persisting="notifyEdit" :rules="rules"></dvs-dataform>
        </div>
        <div id="modo-grade" v-show="!modoFormulario">
            <el-table ref="tabela" :data="filtredRow" border style="width: 100%" size="mini" stripe resizable highlight-current-row @current-change="currentLineChanged" @row-dblclick="changeLayout()">
                <slot name="table-data-cols"></slot>
            </el-table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import BasicService from "@/domain/basic/BasicService";
import DataForm from "@/components/framework/dataform/DataForm";

export default {
  name: 'Dynaform',
  components: {
    'dvs-dataform': DataForm
  },
  props: {
    name: {
      type: String,
      required: true,
    }, serviceName: {
      type: String,
      required: true,
    }, instancia: {
      type: String,
      required: true
    }, metadata: {
      type: Array,
      required: true
    }, rules: {
      type: Object,
      required: false
    }
  }, data() {
    return {
      modoFormulario: false,
      persisting: false,
      filtro: "",
      selectedRow: undefined,
      data: {},
      rows: []
    };
  },
  computed: {
    filtredRow: function () {
      return this.rows.filter(row => !this.filtro || JSON.stringify(Object.values(row)).toUpperCase().indexOf(this.filtro.toUpperCase()) > -1);
    }, label: (app) => (label) => {
      return label + ":";
    }, getFieldProp: (app) => (dataw, fieldProp) => {
      return "1";
      //return this.data[fieldProp];
    }, isFieldType: (app) => (fieldType, type) => {
      return (fieldType === type || fieldType.indexOf("|" + type + "|") > 0);
    },
  }, beforeCreate: function () {
    Loading.service(loadingProps);
  }, created: function () {
    Loading.service(loadingProps).close();
    this.service = new BasicService(axios, this.serviceName);
    this.buscarTodos();
  }, methods: {
    changeLayout(changed) {
      if (!changed) this.modoFormulario = !this.modoFormulario;

      if (this.modoFormulario) {
        this.data = Object.assign({}, this.$valueOrDefault(this.selectedRow, {}));
      };
    },
    currentLineChanged(row) {
      if (this.persisting) this.cancelar(true);
      this.selectedRow = row;
    }, notifyEdit() {
      this.persisting = true;
    },
    buscarTodos() {
      Loading.service(loadingProps);
      this.rows = [];
      this.selectedRow = undefined;
      this.service.buscarTodos()
        .then(resp => {
          this.rows = resp.data;
          this.modoFormulario = false;
          this.changeLayout(true); //Força a ir para modo grade.
        }).catch(err => {
          this.$showError(err, 'Não foi possível carregar os "' + this.name + '". ');
        });
      Loading.service(loadingProps).close();
    },
    excluir() {

      if (this.persisting) {
        this.$mensagem("warning", "Salve ou Cancele as alterações atuais primeiro!");
        return;
      };

      if (this.selectedRow === undefined || this.selectedRow === null) {
        this.$mensagem("error", "Selecione alguma linha para exclusão!");
        return;
      };

      this.$showConfirm("warning", "Deseja realmente excluir esta linha?")
        .then(() => {
          this.service
            .excluir(this.selectedRow.codigo)
            .then(resp => {
              this.$mensagem("success", this.name + " excluído com sucesso");
              this.buscarTodos();
              this.modoFormulario = false;
              this.changeLayout(true); //Força a ir para modo grade.
            })
            .catch(err => {
              this.$showError(err, "Não foi possível excluir!");
            });
        })
        .catch(() => {
          this.$mensagem("warning", "Operação de exclusão cancelada!");
        });
    },
    duplicar() {
      if (this.persisting) {
        this.$mensagem("warning", "Salve ou Cancele as alterações atuais primeiro!");
        return;
      };

      if (this.selectedRow === undefined || this.selectedRow === null) {
        this.$mensagem("error", "Selecione alguma linha para duplicar!");
        return;
      };

      this.modoFormulario = true;
      this.changeLayout(true); //Força a ir para modo grade.
      this.persisting = true;
      this.data.codigo = undefined;
    },
    salvar() {
      if (!this.persisting) {
        this.$mensagem("error", "Ocorreu um erro interno ao tentar salvar!");
        this.persisting = false;
        this.buscarTodos();
        return;
      };

      this.service
        .salvar(this.data)
        .then(resp => {
          this.persisting = false;
          this.changeLayout();
          this.$mensagem("success", this.name + " incluído/alterado com sucesso");
          this.buscarTodos();
        })
        .catch(err => {
          console.error(err);
          this.$showError(err, "Não foi possível incluir/alterar o " + this.name);
        });
    },
    cancelar(force) {
      if (force) {
        if (this.persisting) {
          this.persisting = false;
          this.$mensagem("warning", "Alterações em andamento canceladas forçadamento!");
        };
      } else {
        this.$showConfirm("warning", "Deseje realmente cancelar as alterações?")
          .then(() => {
            this.persisting = false;
            this.changeLayout();
            this.$mensagem("success", "Alterações canceladas com sucesso!");
          });
      }
    },
    novo() {
      if (this.persisting) {
        this.$mensagem("warning", "Salve ou Cancele as alterações atuais primeiro!");
        return;
      };

      this.modoFormulario = true;
      this.changeLayout(true); //Força a ir para modo grade.
      this.persisting = true;
      this.data = {};
    }, editar() {
      if (this.persisting) {
        this.$mensagem("warning", "Salve ou Cancele as alterações atuais primeiro!");
        return;
      };

      if (this.selectedRow === undefined || this.selectedRow === null) {
        this.$mensagem("error", "Selecione alguma linha para editar!");
        return;
      }

      this.modoFormulario = true;
      this.changeLayout(true); //Força a ir para modo grade.
      this.persisting = true;
    }, toPassword(arg) {
      return agr;
    }
  }
};

var loadingProps = {
  text: 'Carregando...'
};
</script>

<style scoped>
#navigator {
  padding-bottom: 10px;
}
#modo-grade {
  padding-bottom: 25px;
  cursor: pointer;
}
#form-field-item {
  margin-bottom: 8px;
}
</style>