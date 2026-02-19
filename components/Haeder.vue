<script lang="ts" setup>
const searchQuery = useState<string>("searchQuery", () => "");

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
        <img src="~/assets/img/searhIcon.svg" class="header-search__icon" alt="search icon" />
        <input
          class="header-search"
          v-model="searchQuery"
          type="search"
          placeholder="Найти"
          @keyup.enter="handleSearch(searchQuery)"
        />
      </label>
    </div>
  </header>
</template>

<style lang="postcss" scoped>
.header {
  display: flex;
  gap: 24px;
  max-height: 88px;
  max-width: 100%;
  border-bottom: 1px solid var(--accent-color);
  padding: 20px 5%;
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
</style>
