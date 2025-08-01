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

    const exams = computed(() => props.exams) // ✅ Aqui está a reatividade correta

    const emitSelection = () => {
      const selected = exams.value.filter((exam: Exam) =>
        selectedIds.value.includes(exam.id)
      )
      emit('selected', selected)
    }

    return {
      selectedIds,
      exams,
      emitSelection,
    }
  },
})


</script>
