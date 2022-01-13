<template>
  <tr>
    <td>{{ oferta.id }}</td>
    <td>{{ oferta.nombre }}</td>
    <td>{{ empresa(oferta.empresa) }}</td>
    <td>{{ oferta.contacto }}</td>
    <td>{{ oferta.email }}</td>
    <td>
      <button class="btn btn-edit" v-on:click.prevent="editOfert(oferta.id)">
        <i class="bi bi-pencil"></i>
      </button>

      <button
        class="btn btn-trash"
        v-on:click.prevent="deleteOfert()"
      >
        <i class="bi bi-trash-fill"></i>
      </button>
      <button class="btn btn-house" v-on:click.prevent="showEmpresa(oferta.empresa)">
        <i class="bi bi-house"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
    name:"ofertas-row",
    props:["oferta"],
     methods:{
    showEmpresa(id){
      this.$router.push( '/empresa/' + id) 
    },
    deleteOfert(){
      this.$emit('delete-ofert')
      
    },
    editOfert(id){
      this.$router.push( '/editOfer/' + id) 
    },

  
        empresa(id){
            return this.$store.state.empresas.find((item)=> item.id == id ).nombre
        }
    },
}
</script>