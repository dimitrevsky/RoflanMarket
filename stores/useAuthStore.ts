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
  const tokenCookie = useCookie<string | null>("auth_token", {
    maxAge: 60 * 60, // 1 час остаемся на акке, потом авто logout
    sameSite: "lax", // для безопасности, чтобы печеньки не отправлялись на сторонние сайты
  });

  const user = ref<User | null>(null);
  const token = computed({
    get: () => tokenCookie.value,
    set: (val) => {
      tokenCookie.value = val;
    },
  });

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

  async function init(): Promise<void> {
    if (token.value) {
      try {
        await fetchUser();
      } catch {
        logout();
      }
    }
  }

  function logout(): void {
    user.value = null;
    token.value = null;
  }

  return { user, token, isLoggedIn, login, logout, init };
});