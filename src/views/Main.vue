<template>
  <div class='main'>
    <Header />

    <main
      :style="{display: 'flex'}"
    >
      <SideMenu
        :active="$route.name"
      />

      <router-view/>
    </main>

  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import SideMenu from '@/components/SideMenu.vue';

export default {
  components: {
    Header,
    SideMenu,
  },
};
</script>
