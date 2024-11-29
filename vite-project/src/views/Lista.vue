<template>

  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-gray-800">
    <router-link to="/" class="mt-8 text-blue-500 hover:text-blue-700">Página Inicial</router-link>
    <div class="text-center p-8 rounded-lg shadow-lg bg-white max-w-xl w-full">

      <h1 class="text-4xl font-bold mb-6 text-indigo-600">Lista de Tarefas</h1>
      <p class="text-lg mb-4">Gerencie suas tarefas de maneira simples e rápida.</p>

      <!-- Formulário de Criação de Item -->
      <form @submit.prevent="createLista" class="mb-6 space-y-4">
        <input type="text" v-model="newList.Titulo" placeholder="Digite o título da tarefa"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required />
        <textarea v-model="newList.Descricao" placeholder="Descreva a tarefa"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows="3" required></textarea>
        <input type="text" v-model="newList.Usuario" placeholder="ID do Usuário"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required />
        <button type="submit"
          class="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Criar Tarefa
        </button>
      </form>

      <!-- Indicador de Carregamento -->
      <div v-if="loading" class="text-xl text-blue-500">Carregando...</div>

      <!-- Mensagem de Erro -->
      <div v-if="error" class="text-xl text-red-500">{{ error }}</div>

      <!-- Lista de Itens -->
      <ul v-if="lista.length" class="space-y-6">
        <li v-for="item in lista" :key="item.id"
          class="flex justify-between items-start bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
          <div class="flex-1">
            <h2 class="text-xl font-semibold text-indigo-600">{{ item.titulo }}</h2>
            <p class="text-gray-600">{{ item.descricao }}</p>
            <p class="text-sm text-gray-500">ID do Usuário: {{ item.usuario }}</p>
          </div>
          <div class="space-x-2">
            <!-- Botão de Edição -->
            <button @click="editLista(item)"
              class="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
              Editar
            </button>
            <!-- Botão de Exclusão -->
            <button @click="deleteLista(item.id)"
              class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
              Deletar
            </button>
          </div>
        </li>
      </ul>

      <!-- Mensagem Caso Não Haja Itens -->
      <div v-else-if="!loading" class="text-xl text-gray-600">Nenhuma tarefa encontrada.</div>

      <!-- Link de Retorno -->

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Lista',
  data() {
    return {
      lista: [],
      newList: {
        Titulo: '',
        Descricao: '',
        Usuario: '',
      },
      loading: true,
      error: null,
      isEditing: false, // Estado para saber se estamos no modo de edição
      currentItemId: null, // Armazena o ID do item que está sendo editado
    };
  },
  mounted() {
    this.fetchLista();
  },
  methods: {
    async fetchLista() {
      try {
        const response = await axios.get('http://localhost:8080/api/lista');
        this.lista = Array.isArray(response.data) ? response.data : [];
      } catch (err) {
        this.error = 'Erro ao carregar os itens. Tente novamente mais tarde.';
        console.error("Erro na API de listagem:", err);
      } finally {
        this.loading = false;
      }
    },
    async createLista() {
      try {
        if (this.isEditing) {
          await this.updateLista();
        } else {
          const response = await axios.post('http://localhost:8080/api/lista', this.newList);
          this.lista.push(response.data);
        }
        this.resetForm();
      } catch (err) {
        this.error = 'Erro ao criar ou editar o item. Tente novamente mais tarde.';
        console.error("Erro na API de criação/edição:", err);
      }
    },
    async deleteLista(id) {
      try {
        await axios.delete(`http://localhost:8080/api/lista/${id}`);
        this.lista = this.lista.filter(item => item.id !== id);
      } catch (err) {
        this.error = 'Erro ao deletar o item. Tente novamente mais tarde.';
        console.error("Erro na API de exclusão:", err);
      }
    },
    editLista(item) {
      this.isEditing = true;
      this.currentItemId = item.id;
      this.newList.Titulo = item.titulo;
      this.newList.Descricao = item.descricao;
      this.newList.Usuario = item.usuario;
    },
    async updateLista() {
      try {
        const response = await axios.put(`http://localhost:8080/api/lista/${this.currentItemId}`, this.newList);
        const index = this.lista.findIndex(item => item.id === this.currentItemId);
        this.$set(this.lista, index, response.data);
        this.resetForm();
      } catch (err) {
        this.error = 'Erro ao atualizar o item. Tente novamente mais tarde.';
        console.error("Erro na API de atualização:", err);
      }
    },
    resetForm() {
      this.newList = { Titulo: '', Descricao: '', Usuario: '' };
      this.isEditing = false;
      this.currentItemId = null;
    }
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.mt-8 {
  margin-top: 2rem;
}

.block {
  display: block;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>
