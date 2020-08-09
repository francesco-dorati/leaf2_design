<template>
    <div class="menu">

      <a-menu
        mode="inline"
        :style="{
          height: '100vh',
          width: '230px',
          padding: '20px 0 100px 0',
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }"
        :default-selected-keys="[active]"
      >

        <Header
          :style="{ marginRight: '80px', marginBottom: '20px' }"
        />

        <a-menu-item
          key='Home'
          :style="{ padding: '10px 16px 10px 24px', 'box-sizing': 'content-box', }"
          >
          <router-link to="/">
            <a-icon type="home" />
            Home
          </router-link>
        </a-menu-item>

        <a-menu-item
          key='Discover'
          :style="{ padding: '10px 16px 10px 24px', 'box-sizing': 'content-box', }"
        >
          <router-link to="/discover">
            <a-icon type="search" />
            Discover
          </router-link>
        </a-menu-item>

        <a-menu-item
          key='Notifications'
          :style="{ padding: '10px 16px 10px 24px', 'box-sizing': 'content-box', }"
          >
          <router-link to="/notifications">
            <a-badge dot :offset='[-8, 0]'>
              <a-icon type="bell" />
            </a-badge>
              Notifications
          </router-link>
        </a-menu-item>

        <a-menu-item
          key='Profile'
          :style="{ padding: '10px 16px 10px 24px', 'box-sizing': 'content-box', }"
          >
          <router-link to="/profile">
            <a-icon type="user" />
            Profile
          </router-link>
        </a-menu-item>

    </a-menu>

    </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'SideMenu',
  props: {
    active: {
      type: String,
      dafault: 'Home',
      required: false,
      validator(value) {
        const routes = ['Home', 'Discover', 'Notifications', 'Profile'];
        return routes.includes(value);
      },
    },
  },
  components: {
    Header,
  },
};
</script>
