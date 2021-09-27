<template>
  <div class="container mx-auto max-w-md px-4">
    <Loading v-if="loading" />
    <div v-else>
      <div class="post" v-for="item in posts" :key="item.id">
        <div class="post-title">{{ item.title }}</div>
        <div class="post-descr">{{ item.description }}</div>
        <span class="post-read" @click="openPost(item)">read</span>
      </div>
      <Observer @intersect="intersected" />
    </div>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase";
import Observer from "~/components/Observer.vue";
import {
  getDocs,
  collection,
  orderBy,
  query,
  limit,
  startAfter
} from "firebase/firestore";
import { format } from "date-fns";
export default {
  name: "PublicIndexPostPage",
  components: { Observer },
  data: () => ({
    posts: [],
    loading: false,
    lastVisible: null,
    total: 0
  }),
  async mounted() {
    const docs = await getDocs(collection(db, "posts"));
    this.total = docs.size;
  },
  methods: {
    openPost(post) {
      this.$router.push("/posts/" + post.id);
    },
    async intersected() {
      if (this.posts?.length >= this.total && this.total !== 0) return;
      let next;
      if (this.lastVisible) {
        next = query(
          collection(db, "posts"),
          orderBy("date", "desc"),
          startAfter(this.lastVisible),
          limit(10)
        );
      } else {
        next = query(
          collection(db, "posts"),
          orderBy("date", "desc"),
          limit(10)
        );
      }

      const postsSnapshots = await getDocs(next);
      this.lastVisible = postsSnapshots.docs[postsSnapshots.docs.length - 1];
      postsSnapshots.forEach(post => {
        const data = post.data();
        this.posts.push({
          id: post.id,
          categoryName: data?.category?.name,
          dateStr: format(new Date(parseInt(data.date)), "dd.MM.yy HH:mm"),
          ...data
        });
      });
    }
  }
};
</script>

<style scoped>
.post {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 18px;
  cursor: pointer;
  position: relative;
}

.post:hover {
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 4px, rgba(0, 0, 0, 0.21) 0px 2px 4px;
}

.post .post-title {
  font-size: 14px;
  font-weight: bold;
}

.post .post-descr {
  font-size: 14px;
}

.post .post-read {
  position: absolute;
  bottom: 10px;
  right: 20px;
  color: rgba(0, 0, 0, 0.438);
}
</style>
