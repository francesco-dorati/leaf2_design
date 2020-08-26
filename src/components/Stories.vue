<template>
  <div
    class="stories"
    :style="{
      borderBottom: '1px solid #e8e8e8',
      paddingBottom: '00px',
      height: '85px',
      overflow: 'hidden'
    }"
  >
    <!-- User Story -->
    <a-skeleton
      :loading="loading"
      :avatar="{ size: 60 }"
      :title="false"
      :paragraph="false"
      active
      :style="{
        display: 'inline-block',
        margin: '10px',
        marginLeft: '20px',
        width: '60px',
      }"
    >
      <a-avatar
        class="story"
        :size="60"
        :src="userStories.avatar.url"
        :icon="userStories.avatar.url ? '' : 'user'"
        :style="{
          boxSizing: 'border-box',
          margin: '10px',
          marginLeft: '20px',
          cursor: 'pointer',
          backgroundColor: userStories.avatar.color,
          border: userStories.stories ? '2px white solid' : '',
          boxShadow: userStories.stories ? '0 0 0 2.5px #20bf6b' : '',
        }"
        @click="viewMyStory"
      />
    </a-skeleton>

    <!-- Create Story Button -->
    <a-button
      type="danger"
      shape="circle"
      size="small"
      :style="{ position: 'absolute', top: '47px', left: '293px' }"
      @click="createStory"
    >
      +
    </a-button>

    <!-- Unviewed Story -->
    <a-avatar
      v-for="(user, userId) in unviewedStories"
      :size="60"
      :src="user.avatar.url"
      :icon="user.avatar.url ? '' : 'user'"
      :key="userId"
      :style="{
        boxSizing: 'border-box',
        margin: '10px',
        cursor: 'pointer',
        border: '2px white solid',
        boxShadow: '0 0 0 2.5px #20bf6b',
        backgroundColor: user.avatar.color,
      }"
      @click="viewStory"
    />

    <!-- Viewed Story -->
    <a-avatar
      v-for="(user, userId) in viewedStories"
      :size="60"
      :src="user.avatar.url"
      :icon="user.avatar.url ? '' : 'user'"
      :key="userId"
      :style="{
        boxSizing: 'border-box',
        margin: '10px',
        cursor: 'pointer',
        border: '2px white solid',
        boxShadow: '0 0 0 2.5px #d1d8e0',
        backgroundColor: user.avatar.color,
      }"
      @click="viewStory"
    />

    <!-- Skeleton -->
    <a-skeleton
      v-for="i in 5"
      :key="`skeleton-${i}`"
      :loading="loading"
      :avatar="{ size: 60 }"
      :title="false"
      :paragraph="false"
      active
      :style="{
        display: 'inline-block',
        margin: loading ? '10px' : '',
        width: '60px',
      }"
    />

    <StoryViewer
      v-if="mode === 1"
      :stories="[]"
      @exit="exit"
    />

    <StoryCreator
      v-if="mode === 2"
      @exit="exit"
    />

  </div>
</template>

<script>
import http from '@/axios.config.js';
import StoryViewer from '@/components/StoryViewer.vue';
import StoryCreator from '@/components/StoryCreator.vue';

export default {
  name: 'Stories',

  components: {
    StoryViewer,
    StoryCreator,
  },

  data() {
    return {
      mode: 0, // 0: normal, 1: story, 2: createStory;
      userStories: {
        avatar: {
          color: '',
        },
      },
      unviewedStories: {},
      viewedStories: {},
      loading: true,
    };
  },

  methods: {
    createStory() {
      this.mode = 2;
    },

    viewMyStory() {
      this.mode = 1;
    },

    viewStory() {
      this.mode = 1;
    },

    exit() {
      this.mode = 0;
    },

    async getStories() {
      this.loading = true;

      const { data } = await http.get('/stories/');

      this.loading = false;
      this.userStories = data.userStories;
      this.unviewedStories = data.unviewedStories;
      this.viewedStories = data.viewedStories;
    },
  },

  computed: {
    // add a computed to move viewed stories to the right data array
  },

  created() {
    this.getStories();
  },
};
// username: 'username',
//         avatar: 'https://weneedfun.com/wp-content/uploads/2016/01/Pink-Flower-17.jpg',
//         stories: {
//           0: {
//             time: 'today',
//             background: 0,
//             elements: {
//               0: {
//                 type: 1,
//                 text: 'hello',
//                 align: 'left',
//                 bold: true,
//                 italic: false,
//                 underline: false,
//                 margin: 40,
//                 size: 40,
//                 color: 1,
//               },
//             },
//           },
//         },
</script>
