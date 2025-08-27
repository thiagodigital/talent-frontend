import { defineStore } from "pinia";
import http from "@/services/http";
import { ref } from "vue";
// import router from "../router";

export const useProfileCategory = defineStore('profile-category', () => {
    const token = 'Bearer ' + localStorage.getItem("token");
    const profileCategoryList = ref<ProfileCategoryType[]>([]);

    async function getProfileCategoryList() {
        try {
            const { data } = await http.get('/profile-category/list/group', {
                headers: {
                    Authorization: token,
                },
            });
            profileCategoryList.value = data;
        } catch (error) {
            console.error('Error fetching collaborators:', error);
        }
    }

    return {
        profileCategoryList,
        getProfileCategoryList,
    };
});