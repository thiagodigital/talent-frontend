import { defineStore } from "pinia";
import { ref } from "vue";
import http from "@/services/http";
import router from "../router";

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

    async function setCollaborator(collaborator: CollaboratorFormType) {
        try {
            const { data } = await http.post(`/collaborators`,
                collaborator,
                {
                    headers: {
                        Authorization: token,
                    },
                });
                router.push('/collaborators');
                window.location.reload();
            console.log('Collaborator created:', data);
            // collaborator.value = data.data;
        } catch (error) {
            window.alert(error?.response?.data?.message ?? 'Ocorreu um erro ao criar um colaborador');
            console.log('Error fetching collaborator:', error?.response?.data);
            console.error('Error fetching collaborator:', error);
        }
    }

    return {
        collaborators,
        collaborator,
        getCollaborators,
        getCollaborator,
        setCollaborator,
    }
});