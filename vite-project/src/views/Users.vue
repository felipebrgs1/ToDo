<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-gray-800">
    <div class="text-center p-8 rounded-lg shadow-lg bg-white max-w-4xl w-full">
      <h1 class="text-4xl font-bold mb-4">Lista de Usuários</h1>
      <p class="text-lg mb-6">Aqui estão todos os usuários cadastrados:</p>
      
      <div v-if="loading" class="text-xl text-blue-500">Carregando...</div>
      <div v-if="error" class="text-xl text-red-500">{{ error }}</div>
      
      <ul v-if="users.length" class="space-y-4">
        <li v-for="user in users" :key="user.id" class="p-4 border border-gray-200 rounded-lg shadow-sm">
          <h2 class="text-2xl font-semibold">{{ user.name }}</h2>
          <p class="text-gray-600">{{ user.email }}</p>
        </li>
      </ul>
      <div v-else class="text-xl text-gray-600">Nenhum usuário encontrado.</div>

      <router-link to="/" class="mt-8 text-blue-500 hover:text-blue-700">Voltar para a Página Inicial</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Users',
  data() {
    return {
      users: [],  // Array para armazenar os dados dos usuários
      loading: true,  // Indicador de carregamento
      error: null,  // Mensagem de erro (caso ocorra)
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        // Substitua pela URL da sua API para buscar os usuários
        const response = await axios.get('http://localhost:8080/api/users');
        this.users = response.data;
      } catch (err) {
        this.error = 'Erro ao carregar os usuários. Tente novamente mais tarde.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados podem ser adicionados aqui */
</style>
