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
    <a-avatar
      class="story"
      :size="60"
      src="https://weneedfun.com/wp-content/uploads/2016/01/Pink-Flower-17.jpg"
      :style="{
        marginLeft: '20px',
      }"
      @click="viewMyStory"
    />

    <a-button
      type="danger"
      shape="circle"
      size="small"
      :style="{ position: 'absolute', top: '47px', left: '293px' }"
      @click="toggleCreateStoryMode"
    >
      +
    </a-button>

    <a-avatar
      v-for="i in 7"
      class="story"
      :size="60"
      icon="user"
      :key="i"
      @click="viewStory"
    />

  <!-- VIEW STORY -->
    <div
      v-if="storyMode"
      :style="{
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        top: '0',
        left: '0',
        backgroundColor: '#00000085',
        backdropFilter: 'blur(10px)',
      }"
      @click="exitStoryMode"
    >
      <div
        :style="{
          position: 'absolute',
          height: '100vh',
          width: '500px',
          top: '0',
          left: '0',
          right: '0',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: 'blue',
        }"
      >
        <a-avatar

          src="https://weneedfun.com/wp-content/uploads/2016/01/Pink-Flower-17.jpg"
          :style="{ border: 'white 1px solid', margin: '10px' }"
        />
        <span :style="{ color: 'white', fontWeight: 'bold' }">
          username
        </span>
      </div>
    </div>
    <!-- END VIEW STORY -->

    <StoryCreator
      v-if="createStoryMode"
      @exit="toggleCreateStoryMode"
    />

  </div>
</template>

<style lang="css">
.story {
  box-sizing: border-box;
  margin: 10px;
  cursor: pointer;
  border: 2px white solid;
  box-shadow: 0 0 0 2.5px #20bf6b;
}
</style>

<script>
import StoryCreator from '@/components/StoryCreator.vue';

export default {
  name: 'Stories',
  data() {
    return {
      storyMode: false,
      createStoryMode: false,
    };
  },
  methods: {
    toggleCreateStoryMode() {
      this.createStoryMode = !this.createStoryMode;
    },
    viewMyStory() {
      this.storyMode = true;
    },
    viewStory() {
      this.storyMode = true;
    },
    exitStoryMode() {
      this.storyMode = false;
    },
  },
  components: {
    StoryCreator,
  },
};
</script>
