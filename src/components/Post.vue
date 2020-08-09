<template>
  <div class="post" >
    <a-card
      :style="{width: '500px'}"
    >

      <template slot="actions" class="ant-card-actions">

        <span
          key="post-basic-like"
          @click="like"
        >
          <a-tooltip title="Like">
            <a-icon
              type="heart"
              :theme="liked ? 'filled' : 'outlined'"
              :style="{ color: liked ? '#eb3b5a' : 'inherit' }"
            />
          </a-tooltip>
          <span style="padding-left: '8px'; cursor: 'pointer'">
            {{ likes }}
          </span>
        </span>

        <span
          key="post-basic-save"
          @click="respond"
        >
          <a-tooltip title="Respond">
            <a-icon
              type="rollback"
            />
          </a-tooltip>
        </span>
      </template>

      <a-card
        :title="author"
        :style="{ margin: '16px' }"
        slot="cover"
        hoverable
        @click="showOriginal"
      >
        <a-avatar
          slot="extra"
          :src="avatar"
        />
        {{body}}
      </a-card>

      <a-card-meta :title="author" :description="body">
        <a-avatar
          slot="avatar"
          :src="avatar"
        />

      </a-card-meta>
    </a-card>

  </div>
</template>

<style scoped>
  .ant-card-actions span:hover i,
  .ant-card-actions span:hover span {
    color: rgba(0, 0, 0, 0.45);
  }
</style>

<script>
import moment from 'moment';
// import { scroller } from 'vue-scrollto/src/scrollTo';

export default {
  data() {
    return {
      moment,
      author: this.post.username,
      avatar: this.post.avatar,
      time: this.post.time,
      likes: this.post.likes,
      liked: this.post.liked,
      body: this.post.body,
      includedPost: this.includedPost,
    };
  },
  methods: {
    like() {
      this.likes += this.liked ? -1 : 1;
      this.liked = !this.liked;
      // write on database
    },
    respond() {
      window.scrollTo(0, 0);
      // respond
    },
    showOriginal() {
      document.querySelector('#5f284495edd42dd89d69e64d').scrollIntoView({ behavior: 'smooth' });
      // go to the original comment
    },
  },
  props: {
    post: {
      type: Object,
    },
  },
};
</script>
