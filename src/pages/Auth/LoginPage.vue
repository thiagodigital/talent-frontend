<script setup lang="ts">
import LogoComponent from "@/components/LogoComponent.vue";
import ButtonComponent from "@/components/Form/ButtonComponent.vue";
import FormComponent from "@/components/Form/FormComponent.vue";
import AlertComponent from "@/components/Form/AlertComponent.vue";

import InputTextComponent from "@/components/Form/InputTextComponent.vue";
import http from "@/services/http.js";
import { useAuth } from "@/services/stores/authStore";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const auth = useAuth();
const router = useRouter();

const user = reactive({
  email: "",
  password: ""
});

const errors = ref([]);

async function login() {
  try {
    const { data } = await http.post("/login", user);
    // console.log(data.data.token);
    auth.setToken(data.data.token);
    auth.setUser(data.data.user);
    auth.setIsAuth(true);

    router.push({ name: "dashboard" });
    window.location.reload();
  } catch (err: any) {
    console.error(err);
    errors.value = err?.response?.data || "Erro ao fazer login";
  } finally {
    user.email = "";
    user.password = "";
  }
}
</script>
<template v-if="!auth.isAuth">
  <div class="grid grid-cols-4 grid-rows-3 gap-4">
  <div class="col-span-4 ">
    <img src="@/assets/logomarca.svg" alt="Logo" class="w-64 h-32 mx-auto my-10" />
    <AlertComponent v-if="errors != ''" :data="errors" class="card-body" />
  </div>
    <div class="col-span-4 row-start-2">
    <!-- <LogoComponent /> -->
      <!--begin::Form-->
      <!-- <div class="uk-padding uk-padding-remove-vertical">
      <div
        uk-alert
        v-if="auth.message.status !== ''"
        :class="auth.message.status === 'success' ? 'uk-alert-success' : 'uk-alert-danger'"
      >
        <a class="uk-alert-close" @click="auth.message.status.value = ''"></a>
        <p>{{ auth.message.message }}</p>
      </div>
    </div> -->
      <FormComponent @submit="login" class="gap-4 card-body">
        <InputTextComponent
          label="Email"
          v-model="user.email"
          type="text"
          name="email"
          placeholder="digite seu email"
        />
        <InputTextComponent
          label="Senha"
          v-model="user.password"
          id="login-password"
          type="password"
          name="password"
          placeholder="digite sua senha"
        />
        <ButtonComponent
          label="Entrar"
          type="submit"
        />

        <div class="text-center mt-7">
          <a href="#" class="link-primary fs-6 fw-bolder">Esqueceu sua senha?</a>
        </div>
      </FormComponent>
      <!--end::Form-->
    </div>
    </div>
</template>