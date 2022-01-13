<template>
<div>
    <h1>Lista de ofertas</h1>
    <table class="table table-striped table-hover">
      <thead class="thead-dark bg-light">
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Empresa</th>
          <th>Contacto</th>
          <th>email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
       <ofertas-row v-for="(oferta, key) in ofertas" :key="key" :oferta="oferta"
       @delete-ofert="deleteOfert(key)">

       </ofertas-row>
      </tbody>
    </table>
    <button @click="redirectForm">Añadir oferta </button>
</div>
</template>



<script>
 import api from '../api';
import OfertasRow from '../components/OfertasRow.vue';

export default {
  components: { OfertasRow },
    data(){
        return{
            ofertas: [],
        }
    },
    props: ['id'],
    
    mounted(){
        api.ofertas.getAll(this.id)
        .then((response)=> (this.ofertas = response.data))
        .catch((error)=>alert(error))
    },
    computed: {
        empresa(){
            return this.$store.state.empresas.find((item)=> item.id == this.id ).nombre
        }
    },
    methods:{
    showEmpresa(){
      this.$router.push( '/empresa/' + this.id) 
    },
    deleteOfert(key){
      api.ofertas.delete(this.ofertas[key].id)
      .then(this.ofertas.splice(key,1))
      .catch((error)=>alert(error))
    },
    editOfert(id){
      this.$router.push( '/editOfer/' + id) 
    },
    redirectForm(){
      this.$router.push( '/new' ) 
    }

  }
}

</script>
