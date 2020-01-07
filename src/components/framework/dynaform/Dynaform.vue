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
            <i
              v-show="modoFormulario"
              class="el-icon-s-order"
              data-toggle="tooltip"
              data-placement="left"
              title="Ir p/ modo Grade"
            ></i>
            <i
              v-show="!modoFormulario"
              class="el-icon-s-grid"
              data-toggle="tooltip"
              data-placement="left"
              title="Ir p/ modo Formulário"
            ></i>
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            plain
            @click="buscarTodos"
            data-toggle="tooltip"
            data-placement="left"
            title="Atualizar"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-plus"
            plain
            @click="novo"
            data-toggle="tooltip"
            data-placement="left"
            title="Adicionar"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-edit"
            plain
            @click="editar"
            data-toggle="tooltip"
            data-placement="left"
            title="Editar"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-copy-document"
            plain
            @click="duplicar"
            data-toggle="tooltip"
            data-placement="left"
            title="Duplicar"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            @click="salvar"
            v-show="persisting"
            data-toggle="tooltip"
            data-placement="left"
            title="Salvar"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            @click="cancelar(false)"
            v-show="persisting"
            data-toggle="tooltip"
            data-placement="left"
            title="Cancelar"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-delete"
            plain
            @click="excluir"
            data-toggle="tooltip"
            data-placement="left"
            title="Excluir"
          ></el-button>
        </el-button-group>
      </div>
      <div class="col p-0">
        <el-input
          v-model="filtro"
          maxlength="50"
          placeholder="Pesquise algo aqui ;)"
          prefix-icon="el-icon-search"
          clearable
        />
      </div>
      <div class="col-auto m-0">
        <el-tag
          type="info"
          size="medium"
          effect="plain"
          color="whitesmoke"
          class="font-weight-bold h-100 m-l-0"
          data-toggle="tooltip"
          data-placement="left"
          title="Resultados encontrados"
        >
          <u>{{ this.filtredRow.length }}</u>
        </el-tag>
      </div>
    </div>
    <div id="modo-formulario" v-show="modoFormulario">
      <dvs-dataform
        ref="dataform"
        :metadata="metadata"
        :model="data"
        :persisting="notifyEdit"
        :rules="rules"
      ></dvs-dataform>
    </div>
    <div id="modo-grade" v-show="!modoFormulario">
      <el-table
        ref="tabela"
        :data="filtredRow"
        border
        style="width: 100%"
        size="small"
        stripe
        resizable
        highlight-current-row
        @current-change="currentLineChanged"
        @row-dblclick="changeLayout()"
      >
        <slot name="table-data-cols"></slot>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import BasicService from "@/domain/basic/BasicService";
import DataForm from "@/components/framework/dataform/DataForm";
import MaskUtils from "../../../../static/MaskUtils.js";

export default {
  name: "Dynaform",
  components: {
    "dvs-dataform": DataForm
  },
  props: {
    name: {
      type: String,
      required: true
    },
    serviceName: {
      type: String,
      required: true
    },
    instancia: {
      type: String,
      required: true
    },
    metadata: {
      type: Array,
      required: true
    },
    rules: {
      type: Object,
      required: false
    },
    loadByPK: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      modoFormulario: false,
      persisting: false,
      filtro: "",
      selectedRow: undefined,
      data: {},
      rows: [],
      loadingProps: {
        text: "Carregando " + this.name + "...",
      }
    }
  },
  computed: {
    filtredRow: function() {
      return this.rows.filter(row => !this.filtro || JSON.stringify(Object.values(row)).toUpperCase().indexOf(this.filtro.toUpperCase()) > -1);
    },
    label: app => label => {
      return label + ":";
    },
    getFieldProp: app => (dataw, fieldProp) => {
      return "1";
      //return this.data[fieldProp];
    },
    isFieldType: app => (fieldType, type) => {
      return fieldType === type || fieldType.indexOf("|" + type + "|") > 0;
    }
  },
  beforeCreate: function() {
    Loading.service(this.loadingProps);
  },
  created: function() {
    Loading.service(this.loadingProps).close();
    this.service = new BasicService(this.$http, this.serviceName);
    this.buscarTodos();
    this.checkIfPkIsLoaded();
  },
  methods: {
    changeLayout(changed) {
      if (!changed) this.modoFormulario = !this.modoFormulario;
      this.data = Object.assign({}, this.$valueOrDefault(this.selectedRow, {}));
      // if (this.modoFormulario) {
      //   this.data = Object.assign({}, this.$valueOrDefault(this.selectedRow, {}));
      // }
    },
    changeToRow(row) {
      this.currentLineChanged(row);
      this.modoFormulario = true;
      this.changeLayout(true); //Força a ir para modo formulário.
    },
    currentLineChanged(row) {
      if (this.persisting) this.cancelar(true);
      this.selectedRow = row;
    },
    notifyEdit() {
      this.persisting = true;
    },
    buscarTodos() {
      Loading.service(this.loadingProps);
      this.rows = [];
      this.selectedRow = undefined;
      this.modoFormulario = false;
      this.changeLayout(true); //Força a ir para modo grade.
      this.service
        .buscarTodos()
        .then(resp => {
          this.rows = resp.data;
        })
        .catch(err => {
          this.$showError(
            err,
            'Não foi possível carregar os "' + this.name + '". '
          );
        });
      Loading.service(this.loadingProps).close();
    },
    excluir() {
      if (this.persisting) {
        this.$mensagem(
          "warning",
          "Salve ou Cancele as alterações atuais primeiro!"
        );
        return;
      }

      if (this.selectedRow === undefined || this.selectedRow === null) {
        this.$mensagem("error", "Selecione alguma linha para exclusão!");
        return;
      }

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
        this.$mensagem(
          "warning",
          "Salve ou Cancele as alterações atuais primeiro!"
        );
        return;
      }

      if (this.selectedRow === undefined || this.selectedRow === null) {
        this.$mensagem("error", "Selecione alguma linha para duplicar!");
        return;
      }

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
      }

      this.$refs["dataform"].isValid(resp => {
        if (!resp) {
          this.$mensagem(
            "warning",
            "Verifique as validações do formulário antes de salvar!"
          );
        } else {
          this.service
            .salvar(this.data)
            .then(resp => {
              this.persisting = false;
              this.changeLayout();
              this.$mensagem(
                "success",
                this.name + " incluído/alterado com sucesso"
              );
              this.buscarTodos();
            })
            .catch(err => {
              console.error(err);
              this.$showError(
                err,
                "Não foi possível incluir/alterar o " + this.name
              );
            });
        }
      });
    },
    cancelar(force) {
      if (force) {
        if (this.persisting) {
          this.persisting = false;
          this.changeLayout(true);
          this.$mensagem(
            "warning",
            "Alterações em andamento canceladas forçadamente!"
          );
        }
      } else {
        this.$showConfirm(
          "warning",
          "Deseje realmente cancelar as alterações?"
        ).then(() => {
          this.persisting = false;
          this.changeLayout();
          this.$mensagem("warning", "Alterações canceladas!");
        });
      }
    },
    novo() {
      if (this.persisting) {
        this.$mensagem(
          "warning",
          "Salve ou Cancele as alterações atuais primeiro!"
        );
        return;
      }

      this.modoFormulario = true;
      this.changeLayout(true); //Força a ir para modo grade.
      this.persisting = true;
      this.data = {};
      this.$refs["dataform"].$refs["form"].resetFields();
    },
    editar() {
      if (this.persisting) {
        this.$mensagem(
          "warning",
          "Salve ou Cancele as alterações atuais primeiro!"
        );
        return;
      }

      if (this.selectedRow === undefined || this.selectedRow === null) {
        this.$mensagem("error", "Selecione alguma linha para editar!");
        return;
      }

      this.modoFormulario = true;
      this.changeLayout(true); //Força a ir para modo grade.
      this.persisting = true;
    },
    toPassword(arg) {
      return agr;
    },
    checkIfPkIsLoaded() {
      const pkIsLoaded = !this.$isEmpty(this.$route.query);

      if (!pkIsLoaded) {
        return;
      } else if (!this.loadByPK) {
        this.loadByPKDefault(this.$route.query, this.service, this.changeToRow);
      } else {
        this.loadByPK(this.$route.query, this.service, this.changeToRow);
      }
    },
    loadByPKDefault(params, service, doChange) {
      const codigo = params["codigo"];

      if (codigo) {
        service
          .buscarPorId(codigo)
          .then(resp => {
            const data = resp.data;
            doChange(data);
          })
          .catch(err => {
            console.error(err);
            this.$showError(
              "Não foi encontrado um registro de código: " + codigo
            );
          });
      }
    }
  },
  mounted() {
    $(document).ready(function() {
      MaskUtils.loadAllMasks();
    });
  }
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