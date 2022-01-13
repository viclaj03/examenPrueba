<template>
  <tr>
    <td>{{ empresa.id }}</td>
    <td>{{ empresa.nombre }}</td>
    <td>{{ empresa.contacto }}</td>
    <td>{{ empresa.email }}</td>
    <td>
      <button class="btn btn-edit" v-on:click.prevent="showEmpresa(empresa.id)">
        <i class="bi bi-eye"></i>
      </button>

      <button
        class="btn btn-delete"
        v-on:click.prevent="showOferts(empresa.id)"
      >
        <i class="bi bi-archive"></i>
      </button>
    </td>
  </tr>
</template>


<script>
export default {
  props: ["empresa"],
  
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