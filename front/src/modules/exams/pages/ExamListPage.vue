<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Lista de Exames</h1>
    <ul class="space-y-2">
      <li v-for="exam in exams" :key="exam.id" class="border p-3 rounded">
        {{ exam.name }} — {{ exam.group }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useExamStore } from '@/modules/exams/store/examStore'
import { fetchExams } from '@/modules/exams/services/examService'

export default defineComponent({
  setup() {
    const store = useExamStore()

    onMounted(async () => {
      const exams = await fetchExams()
      store.setExams(exams)
    })

    return {
      exams: store.exams,
    }
  },
})
</script>
