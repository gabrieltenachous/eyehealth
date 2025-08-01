<template>
  <div class="min-h-screen bg-gray-100 text-gray-800 font-sans">
    <header class="bg-white shadow p-4 mb-4">
      <h1 class="text-xl font-bold text-blue-600">EyeCare Health - Exames</h1>
    </header>

    <main class="container mx-auto px-4 md:px-8">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>
