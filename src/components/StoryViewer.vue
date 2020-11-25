<template>
  <!-- show only if loaded -->
  <div
    class="storyViewer"
    :style="{
      position: 'absolute',
      height: '100vh',
      width: '100vw',
      top: '0',
      left: '0',
      backgroundColor: '#00000085',
      backdropFilter: 'blur(10px)',
    }"
  >
    <div
      :style="{
        position: 'absolute',
        height: '100vh',
        width: '35vw',
        top: '0',
        left: '0',
        right: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#00000085',
      }"
    >

      <a-icon
        type="close-circle"

        :style="{
          position: 'absolute',
          top: '10px',
          right: '-35px',
          zIndex: '100',
          fontSize: '25px',
          color: '#fff',
          opacity: '0.5',
        }"
        @click="exit"
      />

      <a-carousel
        v-if="Object.keys(users).length"
        :before-change="beforeChange"
        :after-change="() => {}"
        :initialSlide="currentUser.startingStoryIndex"
        autoplay
        :autoplaySpeed="15000"
        arrows
      >
        <!-- Left Arrow -->
        <div
          slot="prevArrow"
          class="custom-slick-arrow"
          :disabled="false /* currentUserIndex === 0 */"
          :style="{
            left: '10px',
            zIndex: 1
          }"
        >
          <a-icon type="left-circle" />
        </div>
        <!-- Right Arrow -->
        <div
          slot="nextArrow"
          class="custom-slick-arrow"
          :style="{
            right: '10px',
          }"
        >
          <a-icon type="right-circle" />
        </div>

        <!-- Stories -->
        <div
          v-for="(story, storyId) in currentUser.stories"
          :key="storyId"
          :style="{
            height: '100vh',
            width: '35vw',
            margin: 'auto',
            background: '#364d79',
          }"
        >
          <!-- Avatar -->
          <!--
          <a-avatar
            src="https://weneedfun.com/wp-content/uploads/2016/01/Pink-Flower-17.jpg"
            :style="{ border: 'white 1px solid', margin: '10px' }"
          />
          <span :style="{ color: 'white', fontWeight: 'bold' }">
            username
          </span>
          -->
          <h1>{{ story.text }}</h1>
        </div>

      </a-carousel>

      <div v-else>
        <!-- add skeleton -->
      </div>

    </div>
  </div>

</template>

<script>
import http from '@/axios.config.js';
// user
// current user returning an object
// array of users

// story
// starting index
// index of current story
// id of current story

$(function() {
  var slides_count;
  slides_count = $('.slides .slide').length <= 5 ? 0 : 5;
  $('.slides').slick({
    slidesToShow: slides_count
  });
  if ($('.slides .slide').length <= 5) {
    return $('.slides .slick-next').addClass('slick-disabled').off('click');
  }
});

export default {
  name: 'StoryViewer',

  props: {
    storiesProp: {
      type: Object,
      required: true,
    },
    startingUserId: {
      type: Number,
      required: false,
    },
  },

  data() {
    return {
      users: {},
      currentUserId: null,
    };
  },

  methods: {
    async getData() {
      const { data } = await http.get('/stories', {
        params: this.requestParameters,
      });

      Object.entries(this.storiesProp).forEach(([_id, user]) => {
        this.users = {
          ...this.users,
          [_id]: {
            username: user.username,
            avatar: user.avatar,
            stories: data.users[_id.toString()],
            startingStoryIndex: user.startingStoryIndex,
          },
        };
      });

      console.log('Current User: ', this.currentUser);
    },

    beforeChange(from, to) {
      console.log('from: ', from, ', to: ', to);
      // send view notification to server
      // http.post();

      // store viewed stories to be handled on exit
    },

    async afterChange(/* from, to */) {
      // send view notification to server
      // http.post();

      // store viewed stories to be handled on exit
    },

    exit() {
      console.log(this.userList);
      this.$emit('exit');
    },
  },

  computed: {
    requestParameters() {
      const request = { users: {} };
      Object.entries(this.storiesProp).forEach(([_id, user]) => {
        request.users = {
          ...request.users,
          [_id]: user.stories,
        };
      });
      return request;
    },

    userList() {
      return Object.keys(this.users);
    },

    currentUser() {
      return this.users[this.currentUserId];
    },

    // currentUserIndex() {
    //   return this.userList.indexOf(this.currentUserId);
    // },

  },

  created() {
    this.currentUserId = this.startingUserId;
    this.getData();
  },
};
</script>

<style scoped>
.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

</style>

<!--
users: {
  userId: {
    username,
    avatar,
    startingStoryIndex,
    stories: {
      storyId: {
        data
      },
    },
  },
}
-->
