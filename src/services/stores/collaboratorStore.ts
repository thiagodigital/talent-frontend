import { defineStore } from "pinia";
import { ref } from "vue";
import http from "@/services/http";

export const useCollaborator = defineStore('collaborator', () => {
    const collaborators = ref<CollaboratorType[]>([]);
    const collaborator = ref<CollaboratorType|null>(null);
    const token = 'Bearer ' + localStorage.getItem("token");

    async function getCollaborators() {
        try {
            const { data } = await http.get('/collaborators', {
                headers: {
                    Authorization: token,
                },
            });

            collaborators.value = data.data;
        } catch (error) {
            console.error('Error fetching collaborators:', error);
        }
    }

    async function getCollaborator(id: string) {
        try {
            const { data } = await http.get(`/collaborators/${id}`,{
                headers: {
                    Authorization: token,
                },
            });
            collaborator.value = data.data;
        } catch (error) {
            console.error('Error fetching collaborator:', error);
        }
    }

    return {
        collaborators,
        collaborator,
        getCollaborators,
        getCollaborator
    }
});