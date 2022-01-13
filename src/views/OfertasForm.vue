<template>
  <div>
    <h1>Nueva oferta</h1>
    <form id="formOfert">
      <div class="form-group">
        <label for="newprod-name">Nombre:</label>
        <input
          type="text"
          class="form-control"
          id="newprod-name"
          required
          v-model="ofermForm.nombre"
        />
      </div>

      <div class="form-group">
        <label for="newprod-name">Contrato:</label>
        <input
          type="text"
          class="form-control"
          id="newprod-contrato"
          required
          v-model="ofermForm.contrato"
        />
      </div>
      <div class="form-group">
        <label for="newprod-name">Contacto</label>
        <input
          type="text"
          class="form-control"
          id="newprod-contacto"
          required
          v-model="ofermForm.contacto"
        />
      </div>
      <div class="form-group">
        <label for="newprod-name">email:</label>
        <input
          type="email"
          class="form-control"
          id="newprod-name"
          required
          v-model="ofermForm.email"
        />
      </div>
      <div class="form-group">
        <label for="newprod-name">Empresa:</label>
        <select v-model="ofermForm.empresa">
          <option
            @click.prevent="rejenarDatos"
            v-for="empresa in empresas"
            :key="empresa.id"
            :value="empresa.id"
          >
            {{ empresa.nombre }}
          </option>
        </select>
      </div>

      <br />
      <button
        id="boton"
        type="submit"
        class="btn btn-default btn-primary"
        v-on:click.prevent="addOfert"
      >
        Añadir
      </button>
      <button
        id="boton"
        type="reset"
        class="btn btn-default btn-primary"
        @click="redirectEmpresas"
      >
        Cancelar
      </button>
    </form>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      ofermForm: {},
      ifEdit: false,
    };
  },
  props: ["id"],
  methods: {
    addOfert() {
      if (this.ifEdit) {
        api.ofertas
          .modify(this.ofermForm)
          .then(() => this.$router.push("/ofertas/" + this.ofermForm.empresa))
          .catch((error) => alert(error));
      } else {
        api.ofertas
          .create(this.ofermForm)
          .then(() => this.$router.push("/ofertas/" + this.ofermForm.empresa))
          .catch((error) => alert(error));
      }
    },
    redirectEmpresas() {
      this.$router.push("/empresas");
    },
    refreshForm() {
      if (this.id) {
        this.ifEdit = true;
        api.ofertas
          .getOne(this.id)
          .then((response) => (this.ofermForm = response.data))
          .catch((error) => alert(error));
      } else {
        this.ofermForm = [];
      }
    },
    rejenarDatos() {
      if (!this.ofermForm.contacto) {
        this.ofermForm.email = this.$store.state.empresas.find(
          (item) => item.id == this.ofermForm.empresa
        ).email;
        this.ofermForm.contacto = this.$store.state.empresas.find(
          (item) => item.id == this.ofermForm.empresa
        ).contacto;
      }
    },
  },
  watch: {
    $route() {
      this.refreshForm();
    },
  },

  computed: {
    empresas() {
      return this.$store.state.empresas;
    },
  },

  mounted() {
    if (this.id) {
      this.ifEdit = true;
      api.ofertas
        .getOne(this.id)
        .then((response) => (this.ofermForm = response.data))
        .catch((error) => alert(error));
    }
  },
};
</script>