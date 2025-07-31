<template>
  <BaseModal :visible="visible" @close="$emit('close')">
    <h2 class="text-lg font-semibold mb-4">Novo Pacote de Exames</h2>

    <div class="space-y-4">
      <BaseInput
        v-model="name"
        placeholder="Nome do pacote"
      />

      <textarea
        v-model="observations"
        placeholder="Observações (opcional)"
        class="w-full p-2 border rounded resize-none"
        rows="3"
      ></textarea>

      <div>
        <h3 class="text-sm font-semibold mb-1">Selecione os exames:</h3>
        <div class="max-h-[200px] overflow-y-auto space-y-2">
          <label
            v-for="exam in exams"
            :key="exam.id"
            class="flex items-start gap-2"
          >
            <input
              type="checkbox"
              :value="exam.id"
              v-model="selectedExamIds"
              class="mt-1"
            />
            <span>{{ exam.name }} ({{ exam.group }})</span>
          </label>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-end gap-2">
      <BaseButton variant="danger" @click="$emit('close')">Cancelar</BaseButton>
      <BaseButton :disabled="!name || selectedExamIds.length === 0" @click="handleCreate">
        Criar pacote
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import { Exam } from '@/modules/exams'

export default defineComponent({
  name: 'PackageCreateModal',
  components: { BaseModal, BaseButton, BaseInput },
  props: {
    visible: { type: Boolean, required: true },
    exams: { type: Array as () => Exam[], required: true },
  },
  emits: ['close', 'create'],
  setup(_, { emit }) {
    const name = ref('')
    const observations = ref('')
    const selectedExamIds = ref<string[]>([])

    const handleCreate = () => {
      emit('create', {
        name: name.value,
        observations: observations.value,
        exams: selectedExamIds.value,
      })

      // Reset
      name.value = ''
      observations.value = ''
      selectedExamIds.value = []
    }

    return { name, observations, selectedExamIds, handleCreate }
  },
})
</script>
