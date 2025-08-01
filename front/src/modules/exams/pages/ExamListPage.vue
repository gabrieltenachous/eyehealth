<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Lista de Exames</h1>
    <template>
      <div
        class="p-10 bg-gray-100 text-center text-2xl font-bold text-blue-600"
      >
        Tailwind está funcionando?
      </div>
    </template>

    <ExamSelection :exams="exams" @selected="handleSelected" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useExamStore } from '@/modules/exams'
import { fetchExams } from '@/modules/exams'
import ExamSelection from '@/modules/exams/components/ExamSelection.vue'

export default defineComponent({
  components: { ExamSelection },
  setup() {
    const store = useExamStore()

    onMounted(async () => {
      if (!store.exams.length) {
        const exams = await fetchExams()
        store.setExams(exams)
      }
    })

    const exams = computed(() => store.exams)

    const handleSelected = (selected: any[]) => {
      console.log('Exames selecionados:', selected)
    }

    return {
      exams,
      handleSelected,
    }
  },
})
</script>
