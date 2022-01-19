<template>
  <div>
    <h1>{{ifEdit? "Editar oferta":"Añadir oferta"}}</h1>
    <ValidationObserver  v-slot="{ handleSubmit }">
    <form id="formOfert" novalidate @submit.prevent="handleSubmit(addOfert)">

      <div class="form-group">
        <label for="newprod-name">Nombre:</label>

        <validation-provider rules="required|min:5|max:50" v-slot="{ errors }" >
        <input
          type="text"
          class="form-control"
          id="newprod-name"
          v-model="ofermForm.nombre"
        />
        <span class="text-danger">{{errors[0]}}</span>
        </validation-provider>

      </div>


      <div class="form-group">
        <label for="newprod-name">Contrato:</label>
        <validation-provider rules="required" v-slot="{ errors }" >
        <input
          type="text"
          class="form-control"
          id="newprod-contrato"
          required
          v-model="ofermForm.contrato"
        />
        <span class="text-danger">{{errors[0]}}</span>
        </validation-provider>

      </div>
      <div class="form-group">
        <validation-provider rules="required" v-slot="{ errors }" >

        <label for="newprod-name">Contacto</label>
        <input
          type="text"
          class="form-control"
          id="newprod-contacto"
          required
          v-model="ofermForm.contacto"
        />
        <span class="text-danger">{{errors[0]}}</span>
        </validation-provider>
      </div>
      <div class="form-group">
        <label for="newprod-name">email:</label>
        <validation-provider rules="required|email" v-slot="{ errors }" >
        <input
          type="email"
          class="form-control"
          id="newprod-name"
          required
          v-model="ofermForm.email"
        />
         <span class="text-danger">{{errors[0]}}</span>
        </validation-provider>
      </div>
      <div class="form-group">
        <label for="newprod-name">Empresa:</label>
        <validation-provider rules="required" v-slot="{ errors }" >
        <select v-model="ofermForm.empresa"  @change="rejenarDatos">
          <option value="">--Seleciona una empresa</option>
          <option
           
            v-for="empresa in empresas"
            :key="empresa.id"
            :value="empresa.id"
          >
            {{ empresa.nombre }}
          </option>
        </select>
        <span class="text-danger">{{errors[0]}}</span>
        </validation-provider>
      </div>

      <br />
      <button
        id="boton"
        type="submit"
        class="btn btn-default btn-primary"  
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
    </ValidationObserver>

  </div>
</template>

<script>
import api from "../api";

import { ValidationProvider,ValidationObserver } from 'vee-validate';
// Ahora importamos las reglas que queramos usar, en este caso 'required'
import { extend } from 'vee-validate';
import { required,min,max,email } from 'vee-validate/dist/rules';
import es from 'vee-validate/dist/locale/es.json';
import { localize } from 'vee-validate';

localize('es',es)

extend('required',{...required, message: 'El campo es obligatorio'});
extend('min',{...min,message: `el {_field_} debe tener minimo: {length} `  })
extend('max',max)
extend('email',{...email,message: 'Debes introduicir un correo valido'})
export default {
  components:{
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      ofermForm: {},
      ifEdit: false
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
      this.$nexttick(this.refreshForm())
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
