<template>
  <div class="p-6 max-w-5xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Solicitação de Exames</h1>

      <div class="flex gap-2">
        <BaseButton @click="showListModal = true" variant="secondary"
          >Pacotes</BaseButton
        >
        <BaseButton @click="showCreateModal = true">Criar Pacote</BaseButton>
      </div>
    </div>

    <ExamSelection :exams="exams" @selected="handleSelect" />

    <div v-if="selected.length > 0" class="pt-4 border-t">
      <SolicitationSummary :exams="selected" />
    </div>

    <PackageListModal
      :visible="showListModal"
      :packages="packages"
      @close="showListModal = false"
      @select="handlePackageSelect"
    />

    <PackageCreateModal
      :visible="showCreateModal"
      :exams="exams"
      @close="showCreateModal = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useExamStore, usePackageStore } from '@/modules/exams'
import { fetchExams } from '@/modules/exams'
import ExamSelection from '@/modules/exams/components/ExamSelection.vue'
import PackageListModal from '@/modules/exams/components/PackageListModal.vue'
import PackageCreateModal from '@/modules/exams/components/PackageCreateModal.vue'
import SolicitationSummary from '@/modules/exams/components/SolicitationSummary.vue'
import BaseButton from '@/components/BaseButton.vue'
import { Exam } from '@/modules/exams'

export default defineComponent({
  components: {
    ExamSelection,
    PackageListModal,
    PackageCreateModal,
    SolicitationSummary,
    BaseButton,
  },
  setup() {
    const store = useExamStore()
    const packageStore = usePackageStore()
    const packages = computed(() => packageStore.packages)

    const selected = ref<Exam[]>([])

    const showListModal = ref(false)
    const showCreateModal = ref(false)

    const handleSelect = (exams: Exam[]) => {
      selected.value = exams
    }

    const handlePackageSelect = (packageExams: Exam[]) => {
      selected.value = packageExams
      showListModal.value = false
    }

    const exams = computed(() => store.exams)

    onMounted(async () => {
      if (!store.exams.length) {
        const data = await fetchExams()
        store.setExams(data)
      }
    })

    return {
      exams,
      selected,
      showListModal,
      packages,
      showCreateModal,
      handleSelect,
      handlePackageSelect,
    }
  },
})
</script>
