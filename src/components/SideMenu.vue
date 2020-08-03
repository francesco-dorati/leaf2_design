<template>
    <div class="menu">
        <a-menu
      mode="inline"
      :style="{
        height: '65vh',
        width: '240px',
        margin: '10px 0',
        padding: '5vh 0 15vh 0',
        display: 'flex',
        'justify-content': 'space-around',
        'flex-wrap': 'wrap',
        'box-sizing': 'content-box',
      }"
      :default-selected-keys="[active]"
    >
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
};
</script>
