import http from '@/services/http';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import router from '../router';

export const useAuth = defineStore('auth', () => {

    const token = ref(localStorage.getItem("token"));
    const user = ref(JSON.parse(localStorage.getItem("user")));
    const isAuth = localStorage.getItem("token") == null ? ref(false) : ref(true);

    function setToken(tokenValue: string) {
        localStorage.setItem('token', tokenValue);
        token.value = tokenValue;
    }

    function setUser(userValue: UserType) {
        localStorage.setItem('user', JSON.stringify(userValue));
        user.value = userValue;
    }

    function setIsAuth(auth) {
        isAuth.value = auth;
    }

    const isAuthenticated = computed(() => {
        return token.value && user.value;
    })

    async function checkToken() {
        try {
            const tokenAuth = 'Bearer ' + token.value;
            const { data } = await http.get("/auth/verify", {
                headers: {
                    Authorization: tokenAuth,
                },
            });
            return data;
        } catch (error) {
            clear();
            router.push('/login');
            console.log('error', error.response.data);
        }
        router.push('/');
    }

    function clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        isAuth.value = false;
        token.value = '';
        user.value = '';
        router.push('/');
    }

    return {
        token,
        user,
        setToken,
        setUser,
        checkToken,
        isAuthenticated,
        clear,
        setIsAuth,
        isAuth
    }

})