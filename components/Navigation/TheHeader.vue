<template>
  <div class="header-container">
    <header class="the-header">
      <!-- ハンバーガー(768px以上で非表示) -->
      <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
      <div class="logo">
        <nuxt-link to="/">タイトル</nuxt-link>
      </div>
      <!-- スペース -->
      <div class="spacer"></div>
      <!-- ナブアイテム(768px未満で非表示) -->
      <div class="navigation-items">
        <ul class="nav-list">
          <li class="nav-item"><nuxt-link to="/test">テスト</nuxt-link></li>
          <li class="nav-item"><nuxt-link to="/test">アバウト</nuxt-link></li>
          <li class="nav-item"><nuxt-link to="/admin">管理画面</nuxt-link></li>
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";

export default {
  name: "TheHeader",
  components: {
    TheSideNavToggle,
  },
};
</script>
<style scoped>
.header-container {
  height: 60px;
}

.the-header {
  width: 100%;
  position: fixed;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  z-index: 100;
  box-sizing: border-box;
  padding: 0 20px;
}

.logo {
  margin: 0 10px;
  font-size: 1.3rem;
}

.logo a {
  text-decoration: none;
  color: white;
}

.spacer {
  flex: 1;
}

.navigation-items {
  display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: block;
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {
  text-decoration: none;
  color: white;
}

/* nuxt-link-activeでアクティブクラスをハイライト */
.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: #f7797d;
}
</style>
