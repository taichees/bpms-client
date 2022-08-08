<template>
  <div>
    <TheHeader @sidenavToggle="humbergerClick" />
    <TheSidenav :show="displaySidenav" @close="sideberClose" />

    <Nuxt />
  </div>
</template>
<script>
import TheHeader from "@/components/Navigation/TheHeader";
import TheSidenav from "@/components/Navigation/TheSidenav";

export default {
  components: {
    // Header,
    TheHeader,
    TheSidenav,
  },
  data() {
    return {
      displaySidenav: false,
    };
  },
  methods: {
    humbergerClick() {
      this.displaySidenav = !this.displaySidenav;
    },
    sideberClose() {
      this.displaySidenav = false;
    },
  },
};
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
