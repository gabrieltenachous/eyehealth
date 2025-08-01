<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-6">Resumo da Solicitação</h1>
    <BaseButton @click="goBack" variant="secondary" class="mt-6">
      Voltar e editar seleção
    </BaseButton>

    <div v-if="groupedExams.length === 0" class="text-gray-500">
      Nenhum exame selecionado.
    </div>

    <div
      v-for="(group, index) in groupedExams"
      :key="index"
      class="bg-white border rounded mb-6 shadow-sm p-4"
    >
      <h2 class="text-lg font-semibold mb-3">Página {{ index + 1 }}</h2>
      <ul class="space-y-2">
        <li
          v-for="exam in group"
          :key="exam.id"
          class="p-3 border rounded bg-gray-50"
        >
          <p class="font-medium">{{ exam.name }}</p>
          <p class="text-sm text-gray-600">{{ exam.comment }}</p>
          <p class="text-xs text-blue-600">
            Lateralidade: {{ exam.laterality || 'Não definida' }} | Grupo:
            {{ exam.group }}
          </p>
        </li>
      </ul>
    </div>

    <router-link to="/exams/selection">
      <BaseButton variant="secondary">Voltar à seleção</BaseButton>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Exam } from '@/modules/exams'
import BaseButton from '@/components/BaseButton.vue'
import { useRoute } from 'vue-router/types/composables'
export default {
  name: 'ExamSummaryPage',
  components: { BaseButton },
  data() {
    const exams = this.$route.query.exams
      ? (JSON.parse(this.$route.query.exams as string) as Exam[])
      : []

    return {
      exams,
    }
  },
  methods: {
    goBack() {
      this.$router.push('/exams/solicitation')
    },
  },
  computed: {
    groupedExams(): Exam[][] {
      const groups: Exam[][] = []
      const maxPerGroup = 4

      for (let i = 0; i < this.exams.length; i += maxPerGroup) {
        groups.push(this.exams.slice(i, i + maxPerGroup))
      }

      return groups
    },
  },
}
</script>
