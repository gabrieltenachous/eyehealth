<template>
  <div>
    <div v-if="exams.length === 0" class="text-gray-500">Nenhum exame disponível.</div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <label
        v-for="exam in exams"
        :key="exam.id"
        class="border rounded p-4 cursor-pointer flex items-start gap-2 hover:shadow transition"
      >
        <input
          type="checkbox"
          :value="exam.id"
          v-model="selectedIds"
          class="mt-1"
        />
        <div>
          <p class="font-medium">{{ exam.name }}</p>
          <p class="text-sm text-gray-500">{{ exam.comment }}</p>
          <p class="text-xs text-blue-600 mt-1">
            Lateralidade: {{ exam.laterality || 'Não definida' }} | Grupo: {{ exam.group }}
          </p>
        </div>
      </label>
    </div>

    <div class="mt-4">
      <BaseButton @click="emitSelection" :disabled="selectedIds.length === 0">
        Adicionar exames selecionados
      </BaseButton>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Exam } from '@/modules/exams'
import BaseButton from '@/components/BaseButton.vue'
import { bulkCreateExams } from '../services/examService'
import { useUiStore } from '@/stores/ui'
import { useToast } from '@/composables/useToast'

export default defineComponent({
  name: 'ExamSelection',
  components: { BaseButton },

  props: {
    exams: {
      type: Array as () => Exam[],
      required: true,
    },
  },

  emits: ['selected'],

  setup(props, { emit }) {
    const selectedIds = ref<string[]>([])
    const exams = computed(() => props.exams)
    const uiStore = useUiStore()
    const toast = useToast()

    async function emitSelection() {
      if (selectedIds.value.length === 0) return;

      uiStore.setLoading(true)
      try {
        const examsToSend = selectedIds.value.map((id: string) => {
          const exam = exams.value.find((e: Exam) => e.id === id)
          return {
            name: exam?.name,
            comment: exam?.comment,
            laterality: exam?.laterality,
            group: exam?.group,
          }
        })

        const createdExams = await bulkCreateExams(examsToSend)
        selectedIds.value = []
        emit('selected', createdExams)
      } catch (error) {
        toast.error('Erro ao salvar exames')
      } finally {
        uiStore.setLoading(false)
      }
    }

    return {
      selectedIds,
      exams,
      emitSelection,
    }
  },
})
</script>
