import { useAuth } from "@/services/stores/authStore";
import { createPinia } from 'pinia';
import { createApp, markRaw } from "vue";
import './input.css'; // Ensure Tailwind CSS is imported
import '@/assets/main.css'; // Ensure Tailwind CSS is imported
import 'flyonui/flyonui'
import App from "./App.vue";
import router from '@/services/router';
import echo from "./services/echo";

// import $ from "jquery";
// import _ from "lodash";
// import noUiSlider from "nouislider";
// import "datatables.net";
// import "dropzone/dist/dropzone-min.js";

// window._ = _;
// window.$ = $;
// window.jQuery = $;
// window.DataTable = $.fn.dataTable;
// window.noUiSlider = noUiSlider;


const app = createApp(App);

const pinia = createPinia();
app.use(router);
app.use(pinia);

pinia.use(({ store }) => { store.router = markRaw(router) });

if (localStorage.getItem('token')) {
    (async () => {
        const auth = useAuth();
        try {
            auth.setIsAuth(true);
            await auth.checkToken();
        } catch (error) {
            console.error('Error during authentication check:', error);
            auth.clear()
        }
    })()
}

app.config.globalProperties.$echo = echo

app.mount('#app')
