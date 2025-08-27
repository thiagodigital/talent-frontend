import { defineStore } from "pinia";
import http from "@/services/http";
import { ref } from "vue";
// import router from "../router";

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
        try {
            const response = await http.post('/exams/profile/store/disc', formData, {
                headers: {
                    Authorization: token,
                },
            });
            console.log('Exam submitted successfully:', response.data);
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