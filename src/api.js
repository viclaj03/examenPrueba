import axios from 'axios'

const baseURL = 'http://localhost:3000';

const empresas = {
  getAll: () => axios.get(`${baseURL}/empresas`),
  getOne: (id)=> axios.get(`${baseURL}/empresas/${id}`),
  delProduct: (id) =>axios.delete(`${baseURL}/empresas/${id}`),
  create : (item)=>axios.post(`${baseURL}/empresas`,item),
  modify: (item)=>axios.put(`${baseURL}/empresas/${item.id}`,item),
  delete : (id)=>axios.delete(`${baseURL}/empresas/${id}`),
}

const ofertas = {
  getAll: (id) => axios.get(`${baseURL}/ofertas?empresa=${id}`),
  getOne: (id)=> axios.get(`${baseURL}/ofertas/${id}`),
  delProduct: (id) =>axios.delete(`${baseURL}/ofertas/${id}`),
  create : (item)=>axios.post(`${baseURL}/ofertas`,item),
  modify: (item)=>axios.put(`${baseURL}/ofertas/${item.id}`,item),
  delete : (id)=>axios.delete(`${baseURL}/ofertas/${id}`),
}

export default{
  empresas,
  ofertas
}

