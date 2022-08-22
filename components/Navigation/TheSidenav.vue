<template>
  <div class="sidenav-container">
    <!-- サイドバーのバックドロップ背景 -->
    <div v-if="show" class="sidenav-backdrop" @click="$emit('close')"></div>
    <!-- トランジション -->
    <transition name="slide-side">
      <!-- サイドナブ -->
      <div v-if="show" class="sidenav">
        <div class="drawer-toggle" role="button" @click="$emit('close')">
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <!-- ハンバーガーメニュー -->
        <ul class="nav-list" @click="$emit('close')">
          <li class="nav-item"><nuxt-link to="/test">テスト</nuxt-link></li>
          <li class="nav-item"><nuxt-link to="/csv">csv</nuxt-link></li>
          <li class="nav-item"><nuxt-link to="/BarChart">グラフ</nuxt-link></li>
          <li class="nav-item"><nuxt-link to="/admin">管理画面</nuxt-link></li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "TheSidenav",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.sidenav-container {
  height: 100%;
  width: 100%;
}

.sidenav-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}

.sidenav {
  height: 100%;
  width: 300px;
  background-color: white;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 30px;
}

.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(-100%);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 20px 0;
}

.nav-item a {
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: #f7797d;
}

.drawer-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 35px;
  width: 35px;
  cursor: pointer;
}
.bar {
  height: 2px;
  background: black;
  transition: all 0.3s ease-in-out 0.5s;
}
.bar:nth-child(1) {
  transform: rotate(135deg) translateY(-10px);
  transform-origin: bottom;
}
.bar:nth-child(2) {
  transform: rotate(-135deg) translateY(10px);
  transform-origin: top;
}
</style>
