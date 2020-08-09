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
        @click="addStory"
      >
        +
      </a-button>

      <a-avatar
        v-for="i in 10"
        class="story"
        :size="60"
        icon="user"
        :key="i"
        @click="viewStory"
      />

  </div>
</template>

<style lang="css" scoped>
.story {
  box-sizing: border-box;
  margin: 10px;
  cursor: pointer;
  border: 2px white solid;
  box-shadow: 0 0 0 3px #20bf6b;
}

</style>

<script>
export default {
  name: 'Stories',
  methods: {
    addStory() {
      this.$message.info('addStory');
    },
    viewMyStory() {
      this.$message.info('viewMyStory');
    },
    viewStory() {
      this.$message.info('viewStory');
    },
  },
};
</script>
