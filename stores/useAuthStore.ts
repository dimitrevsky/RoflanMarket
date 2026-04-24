import { defineStore } from "pinia";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  const isLoggedIn = computed(() => !!token.value);

  async function login(username: string, password: string): Promise<void> {
    const data = await $fetch<LoginResponse>("https://dummyjson.com/auth/login", {
      method: "POST",
      body: { username, password, expiresInMins: 60 },
    });

    token.value = data.accessToken;
    await fetchUser();
  }

  async function fetchUser(): Promise<void> {
    if (!token.value) return;

    user.value = await $fetch<User>("https://dummyjson.com/auth/me", {
      headers: { Authorization: `Bearer ${token.value}` },
    });
  }

  function logout(): void {
    user.value = null;
    token.value = null;
  }

  return { user, token, isLoggedIn, login, logout };
});
