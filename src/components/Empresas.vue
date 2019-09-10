<template>
    <div id="app" class="container-fluid">
        <div id="title" class="row">
            <el-divider content-position="left"><h2>Empresas</h2></el-divider>
        </div>
        <div id="navigator" class="row">
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
                <el-input v-model="filtro" maxlength="50" placeholder="Pesquise aqui algo ;)" prefix-icon="el-icon-search" clearable/>
            </div>
            <div class="col-auto m-0">
                <el-tag type="info" size="medium" effect="plain" color="whitesmoke" 
                    class="font-weight-bold h-100 m-l-0" data-toggle="tooltip" data-placement="left" title="Resultados encontrados">
                    <u>{{ this.rows.length }}</u>
                </el-tag>
            </div>
        </div>
        <div id="modo-formulario" v-show="modoFormulario">
            <el-form ref="form" label-width="120px" size="mini">
                <el-form-item label="Código:" size="mini" required>
                    <el-input v-model="parceiro.codigo" type="number" disabled></el-input>
                </el-form-item>
                <el-form-item label="Razão Social:" size="mini" required>
                    <el-input v-model="parceiro.razao" type="text" v-on:input="notifyEdit()" maxlength="150" show-word-limit clearable></el-input>
                </el-form-item>
                <el-form-item label="Nome Fantasia:" size="mini" required>
                    <el-input v-model="parceiro.fantasia" type="text" v-on:input="notifyEdit()" maxlength="150" show-word-limit clearable></el-input>
                </el-form-item>
                <el-form-item label="CPF/CNPJ:" size="mini" required>
                    <el-input v-model="parceiro.cgc" :value="parceiro.cgc" v-on:input="notifyEdit()"></el-input>
                </el-form-item>
                <el-form-item label="Insc. Estadual:" size="mini" required>
                    <el-input v-model="parceiro.ie" type="text" v-on:input="notifyEdit()" maxlength="20" show-word-limit clearable></el-input>
                </el-form-item>
                <el-form-item label="E-mail:" size="mini" required>
                    <el-input v-model="parceiro.email" type="text" v-on:input="notifyEdit()" maxlength="150" show-word-limit clearable></el-input>
                </el-form-item>
                <el-form-item label="Bairro:" size="mini" required>
                    <el-input v-model="parceiro.bairro" type="text" v-on:input="notifyEdit()" maxlength="20" show-word-limit clearable></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div id="modo-grade" v-show="!modoFormulario">
            <el-table ref="tabela" :data="rows" border style="width: 100%" size="mini" stripe resizable highlight-current-row @current-change="currentLineChanged" @row-dblclick="changeLayout()" :default-sort="{prop: 'codigo'}">
                <el-table-column prop="codigo" label="#" align="center" fixed="left" width="70" sortable></el-table-column>
                <el-table-column prop="razao" label="Razão Social" align="center" sortable></el-table-column>
                <el-table-column prop="fantasia" label="Nome Fantasia" align="center" sortable></el-table-column>
                <el-table-column prop="cgc" label="CPF/CNPJ" align="center" sortable></el-table-column>
                <el-table-column prop="ie" label="Insc. Estadual" align="center" sortable></el-table-column>
                <el-table-column prop="email" label="E-mail" align="center" sortable></el-table-column>
                <el-table-column type="expand" label="Endereço" width="80">
                    <template scope="scope">
                        <p><b><u>:: Informações detalhadas do Endereço ::</u></b></p>
                        <p>Bairo: {{ scope.row.bairro }}</p>
                        <p>Logradouro: {{ scope.row.logradouro }}</p>
                        <p>Nº: {{ scope.row.numero }}</p>
                        <p>Complemento: {{ scope.row.complemento }}</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { Loading } from "element-ui";
import Empresa from "@/domain/empresa/empresa";
import EmpresaService from "@/domain/empresa/EmpresaService";
export default {
  data() {
    return {
      modoFormulario: false,
      persisting: false,
      filtro: "",
      selectedRow: undefined,
      parceiro: {},
      parceiros: []
    };
  },
  computed: {
    rows: function () {
      return this.parceiros.filter(row => !this.filtro || JSON.stringify(Object.values(row)).toUpperCase().indexOf(this.filtro.toUpperCase()) > -1);
    }
  },
  methods: {
    changeLayout(changed) {
      if (!changed) this.modoFormulario = !this.modoFormulario;

      if (this.modoFormulario) {
        this.parceiro = Object.assign(
          {},
          this.$valueOrDefault(this.selectedRow, {})
        );
      }
    },
    currentLineChanged(row) {
      if (this.persisting) this.cancelar(true);
      this.selectedRow = row;
    },
    buscarTodos() {
      Loading.service(loadingProps);
      this.parceiros = [];
      this.selectedRow = undefined;
      this.service
        .buscarTodos()
        .then(resp => {
          this.parceiros = resp.data;
          this.modoFormulario = false;
          this.changeLayout(true); //Força a ir para modo grade.
        })
        .catch(err => {
          this.$showError(err, 'Não foi possível carregar os "Parceiros". ');
        });
      Loading.service(loadingProps).close();
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

      this.$showConfirm(
        "warning",
        "Deseja realmente excluir o parceiro: " +
        this.selectedRow.codigo +
        " - " +
        this.selectedRow.razao +
        " ?"
      )
        .then(() => {
          this.service
            .excluir(this.selectedRow.codigo)
            .then(resp => {
              this.$mensagem("success", "Parceiro excluído com sucesso");
              this.buscarTodos();
              this.modoFormulario = false;
              this.changeLayout(true); //Força a ir para modo grade.
            })
            .catch(err => {
              this.$showError(err, "Não foi possível excluir o parceiro");
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
      this.parceiro.codigo = undefined;
    },
    salvar() {
      if (!this.persisting) {
        this.$mensagem("error", "Ocorreu um erro interno ao tentar salvar!");
        this.persisting = false;
        this.buscarTodos();
        return;
      }

      this.service
        .salvar(this.parceiro)
        .then(resp => {
          this.persisting = false;
          this.changeLayout();
          this.$mensagem("success", "Parceiro incluído/alterado com sucesso");
          this.buscarTodos();
        })
        .catch(err => {
          console.error(err);
          this.$showError(err, "Não foi possível incluir/alterar o parceiro");
        });
    },
    cancelar(force) {
      if (force) {
        if (this.persisting) {
          this.persisting = false;
          this.$mensagem(
            "warning",
            "Alterações em andamento canceladas forçadamento!"
          );
        };
      } else {
        this.$showConfirm(
          "warning",
          "Deseje realmente cancelar as alterações?"
        ).then(() => {
          this.persisting = false;
          this.changeLayout();
          this.$mensagem("success", "Alterações canceladas com sucesso!");
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
      this.parceiro = {};
    }, notifyEdit() {
      this.persisting = true;
    }, editar() {
      if (this.persisting) {
        this.$mensagem(
          "warning",
          "Salve ou Cancele as alterações atuais primeiro!"
        );
        return;
      };

      if (this.selectedRow === undefined || this.selectedRow === null) {
        this.$mensagem("error", "Selecione alguma linha para editar!");
        return;
      }

      this.modoFormulario = true;
      this.changeLayout(true); //Força a ir para modo grade.
      this.persisting = true;
    }
  },
  beforeCreate: function () {
    Loading.service(loadingProps);
  },
  created: function () {
    Loading.service(loadingProps).close();
    this.service = new EmpresaService(axios);
    this.buscarTodos();
  }
};

var loadingProps = {
  text: 'Carregando "Parceiros"...'
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
</style>