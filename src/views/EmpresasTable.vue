<template>
  <div>
    <h1>Listado empresas</h1>
    <table class="table table-striped table-hover">
      <thead class="thead-dark bg-light">
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Contacto</th>
          <th>email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
       
        <empresas-row v-for="(empresa, key) in empresas" :key="key" :empresa="empresa">

        </empresas-row>
      </tbody>
    </table>
  </div>
</template>

<script>
import EmpresasRow from '../components/EmpresasRow.vue';

export default {
  components: {EmpresasRow  },
  
  computed: {
    empresas() {
      return this.$store.state.empresas;
    },
  },
  methods:{
    showEmpresa(id){
      this.$router.push( '/empresa/' + id) 
    },
    showOferts(id){
      this.$router.push( '/ofertas/' + id) 
    }
  }
};
</script>

