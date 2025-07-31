<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Resumo da Solicitação</h1>

    <SolicitationSummary :exams="selectedExams" />

    <div class="mt-6">
      <BaseButton @click="handlePdf" :disabled="!selectedExams.length">
        📄 Baixar PDF
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Exam } from '@/modules/exams'
import SolicitationSummary from '@/modules/exams/components/SolicitationSummary.vue'
import BaseButton from '@/components/BaseButton.vue'
import { generateExamPdf } from '@/modules/exams/services/pdfService'
import { downloadBlob } from '@/modules/exams/services/downloadUtil'

export default defineComponent({
  name: 'ExamSummaryPage',
  components: {
    SolicitationSummary,
    BaseButton,
  },

  setup() {
    const selectedExams = ref<Exam[]>([])

    onMounted(() => {
      // 🔁 Simula exames selecionados via localStorage ou estado global
      const raw = localStorage.getItem('selectedExams')
      if (raw) selectedExams.value = JSON.parse(raw)
    })

    const handlePdf = async () => {
      const ids = selectedExams.value.map(e => e.id)
      const pdf = await generateExamPdf(ids)
      downloadBlob(pdf, 'solicitacao_exames.pdf')
    }

    return {
      selectedExams,
      handlePdf,
    }
  },
})
</script>
