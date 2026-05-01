<script lang="ts" setup>
const searchQuery = useState<string>("searchQuery", () => "");

const authStore = useAuthStore();

function handleSearch(value: string) {
  searchQuery.value = value.trim();
}
</script>

<template>
  <header class="header">
    <div class="header-logo">
      <img src="~/assets/img/RoflLogo.png" alt="ROFL" />
      <span class="header-text">RoflanMarket</span>
    </div>

    <div class="header-search__wrapper">
      <label>
        <img src="~/assets/img/SearchIcon.svg" class="header-search__icon" alt="search icon" />
        <input
          class="header-search"
          v-model="searchQuery"
          type="search"
          placeholder="Найти"
          @keyup.enter="handleSearch(searchQuery)"
        />
      </label>
    </div>

    <div class="authorization">
      <template v-if="authStore.isLoggedIn">
        <img :src="authStore.user?.image" :alt="authStore.user?.firstName" class="avatar" />
        <button class="sign-out__button" @click="authStore.logout()">Выйти</button>
      </template>
      <NuxtLink v-else to="/login">
        <button class="sign-in__button">Войти</button>
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  gap: 24px;
  max-height: 88px;
  max-width: 100%;
  border-bottom: 1px solid var(--accent-color);
  padding: 20px 10px;
}

.sign-in__button {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background-color: var(--accent-main-theme-color);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sign-out__button {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background-color: #e22a00;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sign-out__button:hover {
  background-color: #a21800;
}

.sign-in__button:hover {
  background-color: #c8b018;
}

.header-logo {
  display: flex;
  gap: 12px;
  align-items: center;

  .header-text {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
}

.header-search__wrapper {
  position: relative;
  width: 100%;

  .header-search {
    position: relative;
    min-height: 100%;
    width: 100%;
    padding: 0 34px;
    background-color: #fafafa;
    border: 1px solid #e4e4e7;
    border-radius: 14px;
  }

  .header-search__icon {
    position: absolute;
    cursor: text;
    top: 50%;
    left: 11px;
    transform: translateY(-50%);
    z-index: 1;
  }

  &::placeholder {
    line-height: 24px;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
}

.authorization {
  display: flex;
  gap: 12px;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
