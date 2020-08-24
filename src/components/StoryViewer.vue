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

</template>

<script>
export default {
  name: 'StoryViewer',

  data() {
    return {

    };
  },

  methods: {

  },
};
</script>
