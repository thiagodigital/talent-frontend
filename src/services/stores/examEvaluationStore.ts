import { defineStore } from 'pinia'
import http from '@/services/http'
import { ref } from 'vue'
import router from '../router'

export const useExamEvaluation = defineStore('exam-evaluation', () => {
  const token = 'Bearer ' + localStorage.getItem('token')
  const examEvaluation = ref<ProfileEvaluationType[]>([])

  async function getExamEvaluation() {
    try {
      const { data } = await http.get('/exams/profile/list/evaluation', {
        headers: {
          Authorization: token,
        },
      })
      examEvaluation.value = data.data
    } catch (error) {
      console.error('Error fetching collaborators:', error)
    }
  }

  async function setExamEvaluation(formData: any) {
    const id = router.currentRoute.value.params.id
    try {
      const response = await http.post('/exams/profile/store/evaluation', formData, {
        headers: {
          Authorization: token,
        },
      })
      router.push('/collaborators/' + id)
      setTimeout(() => window.location.reload(), 1000)
      console.log('Exam submitted:', response)
    } catch (error) {
      console.error('Error submitting exam:', error)
    }
  }

  return {
    examEvaluation,
    getExamEvaluation,
    setExamEvaluation,
  }
})
