<template>
  <div
    class='main'
    :style="{ width: '100vw', height: '100vh', display: 'flex' }"
  >

    <SideMenu
      :active="$route.name"
      :style="{ height: '100%' }"
    />

    <router-view />

  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue';

export default {
  components: {
    SideMenu,
  },
};
</script>
