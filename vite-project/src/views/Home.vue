<template>
  <div
    class="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 flex flex-col items-center justify-center text-white">
    <div class="text-center p-8 rounded-lg shadow-lg bg-white bg-opacity-40 max-w-lg w-full">
      <h1 class="text-4xl font-extrabold mb-4">Bem-vindo à Página Inicial</h1>
      <router-link to="/Users" class="text-xl font-semibold text-red-300 hover:text-blue-500 transition-colors">Ir para
        a Página About</router-link>
    </div>
    <div class="text-center p-8 rounded-lg shadow-lg bg-white bg-opacity-40 max-w-lg w-full mt-8">
      <h1 class="text-4xl font-extrabold mb-4">Lista</h1>
      <router-link to="/Lista" class="text-xl font-semibold text-red-300 hover:text-blue-500 transition-colors">Ir para
        a Página Lista</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
