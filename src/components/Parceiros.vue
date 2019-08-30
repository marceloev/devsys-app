<template>
  <div id="app">
    <div id="title" class="row">
      <hr class="col" />
      <h2 class="title-label col-auto">Parceiros</h2>
      <hr class="col" />
    </div>
    <div id="navigator">
      <el-button-group>
        <el-button type="info" @click="changeLayout(false)">
          <i v-show="modoFormulario" class="el-icon-s-order"></i>
          <i v-show="!modoFormulario" class="el-icon-s-grid"></i>
        </el-button>
        <el-button type="success" icon="el-icon-plus" plain></el-button>
        <el-button type="info" icon="el-icon-edit" plain></el-button>
        <el-button type="primary" icon="el-icon-copy-document" plain></el-button>
        <el-button type="success" icon="el-icon-check" plain v-show="persisting"></el-button>
        <el-button type="danger" icon="el-icon-close" plain v-show="persisting"></el-button>
        <el-button type="warning" icon="el-icon-delete" plain></el-button>
      </el-button-group>
    </div>
    <div id="modo-formulario" v-show="modoFormulario">
      <el-form ref="form" label-width="120px" size="mini">
        <el-form-item label="Código:" size="mini" required>
          <el-input v-model="parceiro.codigo" type="number" disabled></el-input>
        </el-form-item>
        <el-form-item label="Razão Social:" size="mini" required>
          <el-input v-model="parceiro.razao" type="text" maxlength="150" show-word-limit clearable></el-input>
        </el-form-item>
        <el-form-item label="Nome Fantasia:" size="mini" required>
          <el-input v-model="parceiro.fantasia" type="text" maxlength="150" show-word-limit clearable></el-input>
        </el-form-item>
        <el-form-item label="CPF/CNPJ:" size="mini" required>
          <el-input v-model="parceiro.cgc"></el-input>
        </el-form-item>
        <el-form-item label="Insc. Estadual:" size="mini" required>
          <el-input v-model="parceiro.ie" type="text" maxlength="20" show-word-limit clearable></el-input>
        </el-form-item>
        <el-form-item label="E-mail:" size="mini" required>
          <el-input v-model="parceiro.email" type="text" maxlength="150" show-word-limit clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div id="modo-grade" v-show="!modoFormulario">
      <el-table
        ref="tabela"
        :data="parceiros"
        border
        style="width: 100%"
        size="mini"
        stripe
        resizable
        highlight-current-row
        @current-change="currentLineChanged"
        @row-dblclick="changeLayout()"
      >
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
import { Loading } from "element-ui";
import Empresa from '@/domain/parceiro/parceiro'
import EmpresaService from '@/domain/parceiro/ParceiroService'
export default {
  data() {
    return {
      modoFormulario: false,
      persisting: false,
      selectedRow: {},
      parceiro: {},
      parceiros: [
        {
          codigo: 1,
          cgc: "06345774685",
          razao: "Clara Castro Barroso",
          fantasia: "Clarinha",
          ie: null,
          email: "marcelo@gmail.com",
          logradouro: null,
          numero: null,
          complemento: null,
          bairro: null,
          cpf: true
        },
        {
          codigo: 2,
          cgc: "06345774685",
          razao: "Clara Castro Barroso",
          fantasia: "Clarinha",
          ie: null,
          email: "marcelo@gmail.com",
          logradouro: null,
          numero: null,
          complemento: null,
          bairro: null,
          cpf: true
        },
        {
          codigo: 3,
          cgc: "06345774685",
          razao: "Clara Castro Barroso",
          fantasia: "Clarinha",
          ie: null,
          email: "marcelo@gmail.com",
          logradouro: null,
          numero: null,
          complemento: null,
          bairro: null,
          cpf: true
        },
        {
          codigo: 4,
          cgc: "06345774685",
          razao: "Clara Castro Barroso",
          fantasia: "Clarinha",
          ie: null,
          email: "marcelo@gmail.com",
          logradouro: null,
          numero: null,
          complemento: null,
          bairro: null,
          cpf: true
        },
        {
          codigo: 5,
          cgc: "06345774685",
          razao: "Clara Castro Barroso",
          fantasia: "Clarinha",
          ie: null,
          email: "marcelo@gmail.com",
          logradouro: null,
          numero: null,
          complemento: null,
          bairro: null,
          cpf: true
        },
        {
          codigo: 6,
          cgc: "06345774685",
          razao: "Clara Castro Barroso",
          fantasia: "Clarinha",
          ie: null,
          email: "marcelo@gmail.com",
          logradouro: null,
          numero: null,
          complemento: null,
          bairro: null,
          cpf: true
        },
        {
          codigo: 7,
          cgc: "06345774685",
          razao: "Clara Castro Barroso",
          fantasia: "Clarinha",
          ie: null,
          email: "marcelo@gmail.com",
          logradouro: null,
          numero: null,
          complemento: null,
          bairro: null,
          cpf: true
        },
        {
          codigo: 8,
          cgc: "06345774685",
          razao: "Clara Castro Barroso",
          fantasia: "Clarinha",
          ie: null,
          email: "marcelo@gmail.com",
          logradouro: "Rua do Marcelo",
          numero: 69,
          complemento: "Eu sou um puta complementão",
          bairro: "Cidade Jardim",
          cpf: true
        },
        {
          codigo: 9,
          cgc: "06345774685",
          razao: "Clara Castro Barroso",
          fantasia: "Clarinha",
          ie: null,
          email: "marcelo@gmail.com",
          logradouro: null,
          numero: null,
          complemento: null,
          bairro: null,
          cpf: true
        },
        {
          codigo: 10,
          cgc: "06345774685",
          razao: "Clara Castro Barroso",
          fantasia: "Clarinha",
          ie: null,
          email: "marcelo@gmail.com",
          logradouro: null,
          numero: null,
          complemento: null,
          bairro: null,
          cpf: true
        },
        {
          codigo: 11,
          cgc: null,
          razao: null,
          fantasia: null,
          ie: null,
          email: null,
          logradouro: null,
          numero: null,
          complemento: null,
          bairro: null,
          cpf: false
        }
      ]
    };
  },
  methods: {
    changeLayout(changed) {
      if (!changed) this.modoFormulario = !this.modoFormulario;

      if (this.modoFormulario) {
        this.parceiro = this.selectedRow;
      }
    },
    currentLineChanged(row) {
      this.selectedRow = row;
    }
  },
  beforeCreate: function() {
    Loading.service(loadingProps);
  },
  created: function() {
    this.service = new EmpresaService(this.$http);
    //console.log(axios)
    Loading.service(loadingProps).close();
  }
};

var loadingProps = {
  text: 'Carregando "Parceiros"...'
};
</script>

<style scoped>
#title {
  margin: 0px;
  padding: 0px 0px 5px 0px;
  margin: 5px 0px 0px 0px;
}

#navigator {
  padding-bottom: 5px;
}

#title .title-label {
  margin: 0px;
  padding: 0px;
}

#title hr {
  margin-left: 5px;
  margin-right: 5px;
}

#modo-formulario {
  padding-top: 20px;
}
</style>
