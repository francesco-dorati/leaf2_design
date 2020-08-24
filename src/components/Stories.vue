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
    <a-avatar
      class="story"
      :size="60"
      src="https://weneedfun.com/wp-content/uploads/2016/01/Pink-Flower-17.jpg"
      :style="{
        boxSizing: 'border-box',
        margin: '10px',
        marginLeft: '20px',
        cursor: 'pointer',
        border: userStories.length ? '2px white solid' : '',
        boxShadow: userStories.length ? '0 0 0 2.5px #20bf6b' : '',
      }"
      @click="viewMyStory"
    />

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
      v-for="story in unviewedStories"
      :size="60"
      icon="user"
      :key="story.id"
      :style="{
        boxSizing: 'border-box',
        margin: '10px',
        cursor: 'pointer',
        border: '2px white solid',
        boxShadow: '0 0 0 2.5px #20bf6b',
      }"
      @click="viewStory"
    />

    <!-- Viewed Story -->
    <a-avatar
      v-for="story in viewedStories"
      :size="60"
      icon="user"
      :key="story.id"
      :style="{
        boxSizing: 'border-box',
        margin: '10px',
        cursor: 'pointer',
        border: '2px white solid',
        boxShadow: '0 0 0 2.5px #d1d8e0',
      }"
      @click="viewStory"
    />

    <!-- prendere solo dati riferenti alle storie -->
    <!-- poi prima della story mode prendere la storia effettiva -->
    <!-- fare animazioni caricamento storia -->

    <!-- VIEW STORY -->
    <!-- <StoryViewer
      v-if="mode === 1"
      @exit="exit"
    > -->
    <!-- END VIEW STORY -->

    <StoryCreator
      v-if="mode === 2"
      @exit="exit"
    />

  </div>
</template>

<script>
// import http from '@/axios.config.js';
// import StoryViewer from '@/components/StoryViewer.vue';
import StoryCreator from '@/components/StoryCreator.vue';

export default {
  name: 'Stories',

  components: {
    // StoryViewer,
    StoryCreator,
  },

  data() {
    return {
      mode: 0, // 0: normal, 1: story, 2: createStory;
      userStories: [
        {},
      ],
      unviewedStories: [
        {},
        {},
        {},
      ],
      viewedStories: [
        {},
        {},
      ],
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
      // const { data } = await http.get('/stories/');

      // this.userStories = data.userStories;
      // this.stories = data.stories;
    },
  },

  computed: {
    // add a computed to move viewed stories to the right data array
  },

  created() {
    this.getStories();
  },
};
</script>
