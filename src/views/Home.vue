<template>
  <div class="home" :style="{ width: '100%', height: '100%', overflow: 'scroll' }" >

    <a-config-provider>
      <template #renderEmpty>
        <div style="text-align: center">
          <a-list>
            <a-list-item>
              <a-skeleton avatar active/>
            </a-list-item>
          </a-list>
        </div>
      </template>
    </a-config-provider>

      <Stories />

      <!-- <a-comment>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <div slot="content">
        <a-form-item>
          <a-mentions :rows="2" :style="{ width: '70%' }" >
            <a-mentions-option value="afc163">
              afc163
            </a-mentions-option>
          </a-mentions>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary" >
            Add Comment
          </a-button>
        </a-form-item>
      </div>
    </a-comment> -->

      <!-- <div :style="{ paddingLeft: '200px'}">
        <Post
          v-for="post in posts"
          :key="post._id"
          :id="post._id"
          :post="post"
          :style="{ marginBottom: '30px'}"
        />
      </div> -->

  </div>
</template>

<script>
// import Post from '@/components/Post.vue';
import Stories from '@/components/Stories.vue';
import http from '@/axios.config.js';

export default {
  data() {
    return {
      posts: [],
      loading: false,
    };
  },

  components: {
    // Post,
    Stories,
  },

  async created() {
    const { data } = await http.get('/posts/post_testing');
    this.posts = data.reverse();
    this.loading = false;
  },
};
</script>
