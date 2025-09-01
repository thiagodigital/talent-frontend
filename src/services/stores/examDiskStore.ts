import { defineStore } from "pinia";
import http from "@/services/http";
import { ref } from "vue";
import router from "../router";


export const useExamDisk = defineStore('exam-disk', () => {
    const token = 'Bearer ' + localStorage.getItem("token");
    const examDisk = ref<ExamDiskType[]>([]);

    async function getExamDisk() {
        try {
            const { data } = await http.get('/exams/profile/list/disc', {
                headers: {
                    Authorization: token,
                },
            });
            examDisk.value = data;
        } catch (error) {
            console.error('Error fetching collaborators:', error);
        }
    }

    async function setExamDisk(formData: any) {
        const id = router.currentRoute.value.params.id;
        try {
            const response = await http.post('/exams/profile/store/disc', formData, {
                headers: {
                    Authorization: token,
                },
            });
            router.push('/collaborators/'+id);
            setTimeout(() => window.location.reload(), 1000);
            console.log('Exam submitted:', response);
        } catch (error) {
            console.error('Error submitting exam:', error);
        }
    }

    return {
        examDisk,
        getExamDisk,
        setExamDisk,
    };
});