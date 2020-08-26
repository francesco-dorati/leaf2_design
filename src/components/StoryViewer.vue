<template>
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

      <!-- Avatar -->
      <!-- <a-avatar
        src="https://weneedfun.com/wp-content/uploads/2016/01/Pink-Flower-17.jpg"
        :style="{ border: 'white 1px solid', margin: '10px' }"
      />
      <span :style="{ color: 'white', fontWeight: 'bold' }">
        username
      </span> -->

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

      <a-carousel arrows autoplay :before-change="beforeChange">
        <!-- Left Arrow -->
        <div
          slot="prevArrow"
          class="custom-slick-arrow"
          style="left: 10px;zIndex: 1"
        >
          <a-icon type="left-circle" />
        </div>
        <!-- Right Arrow -->
        <div
          slot="nextArrow"
          class="custom-slick-arrow"
          style="right: 10px"
        >
          <a-icon type="right-circle" />
        </div>

        <!-- Stories -->
        <div
          v-for="(story, storyId) in stories[storyData.currentStoryId].stories"
          :key="storyId"
          :style="{
            height: '100vh',
            width: '35vw',
            margin: 'auto',
            background: '#364d79',
          }"
        >
          <h1>tab {{ storyId }}</h1>
        </div>

      </a-carousel>

    </div>
  </div>

</template>

<script>
export default {
  name: 'StoryViewer',

  props: {
  },

  data() {
    return {
      stories: {
        0: {
          username: 'user 0',
          avatar: {
            color: '',
          },
          stories: {
            0: {},
            1: {},
            2: {},
          },
        },
        1: {
          username: 'user 1',
          avatar: {
            color: '',
          },
          stories: {
            0: {},
            1: {},
          },
        },
      },
      storyData: {
        currentPage: 0,
        currentStoryId: 0,
        currentStoryLength: null,
      },
    };
  },

  methods: {
    beforeChange(from, to) {
      if (to === 0 && this.storyData.currentPage !== 1) {
        this.nextUser();
      } else if (to > 1 && this.storyData.currentPage === 0) {
        this.proviousUser();
      }
      this.storyData.currentPage = to;
    },

    previousUser() {
      //  refactor
      const index = Object.keys(this.stories).indexOf(this.storyData.currentStoryId.toString());
      this.storyData.currentStoryId = Object.keys(this.stories)[index - 1];
      this.$forceUpdate();
      console.log('previous');
    },

    nextUser() {
      //  refactor
      const index = Object.keys(this.stories).indexOf(this.storyData.currentStoryId.toString());
      this.storyData.currentStoryId = Object.keys(this.stories)[index + 1];
      console.log('next');
    },

    exit() {
      this.$emit('exit');
    },
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
