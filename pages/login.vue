<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

const username = ref<string>("");
const password = ref<string>("");
const error = ref<string | null>(null);
const isLoading = ref<boolean>(false);

async function handleSubmit(): Promise<void> {
  error.value = null;
  isLoading.value = true;

  try {
    await authStore.login(username.value, password.value);
    router.push("/");
  } catch {
    error.value = "Неверный логин или пароль";
  } finally {
    isLoading.value = false;
  }
}

interface DebugUser {
  id: string;
  username: string;
  password: string;
}

interface usersResponse {
  users: DebugUser[];
}
const { data: usersList } = await useFetch<usersResponse>("https://dummyjson.com/users");
</script>

<template>
  <section class="login-wrapper">
    <form class="login-form" @submit.prevent="handleSubmit">
      <div class="sub-header">
        <img src="~/assets/img/RoflLogo.png" alt="" />
        <h2 class="login-title">Rofl SignIn</h2>
      </div>
      <input
        class="input input-login"
        :class="{ 'input-invalid': error }"
        !isLoading
        v-model="username"
        type="text"
        placeholder="Логин"
      />
      <input
        class="input input-password"
        :class="{ 'input-invalid': error }"
        v-model="password"
        type="password"
        placeholder="Пароль"
      />
      <p v-if="error" class="error">{{ error }}</p>
      <button class="sign-in" type="submit" :disabled="isLoading">
        {{ isLoading ? "Загрузка..." : "Войти" }}
      </button>
    </form>

    <aside class="debugging">
      <h2>Примеры аккаунтов</h2>
      <div v-for="user in usersList?.users.slice(0, 6)" :key="user.id" class="users-list">
        <div class="user-before">
          <span>{{ "Логин: " + user.username }}</span>
        </div>
        <div>
          <span>{{ "Пароль: " + user.password }}</span>
        </div>
      </div>
    </aside>
  </section>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: minmax(400px, 100%);
  margin: 0 auto;
}

.login-form {
  border: 2px solid var(--border-color);
  padding: 24px;
  border-radius: 32px;
}

.sub-header {
  display: flex;
  align-items: center;
  justify-self: center;
  margin-bottom: 10px;
}

.input {
  width: 100%;
  padding: 8px;
  margin-bottom: 6px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.error {
  color: red;
  margin-bottom: 6px;
}

.sign-in {
  width: 100%;
  padding: 8px;
  border: none;
  background-color: var(--border-color);
  color: #000;
  border-radius: 8px;
  cursor: pointer;
}

.input-invalid {
  border-color: red;
}

.debugging {
  display: flex;
  text-align: center;
  flex-direction: column;
  margin-top: 20px;
  border: 2px dashed var(--border-color);
  padding: 16px;
  border-radius: 16px;
}

.users-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
  text-align: start;
}

.user-before::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url(~/assets/img/RoflLogo.png);
  background-size: cover;
  margin-right: 4px;
}
</style>
