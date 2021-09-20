<template>
  <div class="p-4">
    <h3 class="text-2xl font-bold mb-4 text-center">
      Posts
    </h3>
    <Loading v-if="loading" />
    <div v-else>
      <div>
        <nuxt-link
          to="/posts/create"
          class="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
        >
          Create
        </nuxt-link>
      </div>
      <table
        class="my-4 table text-gray-400 border-separate space-y-6 text-sm w-full"
      >
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col style="width: 120px" />
        </colgroup>
        <thead class="bg-blue-500 text-white">
          <tr>
            <th class="p-3 text-left">#</th>
            <th class="p-3 text-left">Title</th>
            <th class="p-3 text-left">Description</th>
            <th class="p-3 text-left">Category</th>
            <th class="p-3 text-left">Date</th>
            <th class="p-3"></th>
          </tr>
        </thead>
        <tbody class="bg-blue-200 lg:text-black">
          <tr v-for="(item, index) in posts" :key="item.id">
            <td class="p-3">{{ posts.length - index }}</td>
            <td class="p-3">{{ item.title }}</td>
            <td class="p-3">{{ item.description }}</td>
            <td class="p-3">{{ item.categoryName }}</td>
            <td class="p-3">{{ item.dateStr }}</td>
            <td class="p-3">
              <button
                @click="$router.push('/posts/' + item.id)"
                class="py-2 ml-2 px-2 self-end bg-blue-500 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                @click="removePost(item.id)"
                class="py-2 ml-2 px-2 self-end bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-700 focus:outline-none "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <nuxt-link
          to="/posts/create"
          class="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
        >
          Create
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  orderBy,
  query
} from "firebase/firestore";
import { format } from "date-fns";
export default {
  name: "IndexPostPage",
  middleware: ["auth"],
  data: () => ({
    posts: [],
    loading: false
  }),
  mounted() {
    // this.getPosts();
    this.getPostsQuery();
  },
  methods: {
    async removePost(id) {
      try {
        await deleteDoc(doc(db, "posts", id));
        await this.getPosts();
      } catch (e) {
        console.log(e);
      }
    },
    async getPostsQuery() {
      try {
        this.loading = true;
        this.posts = [];
        // Query the first page of docs
        const postsQuery = query(
          collection(db, "posts"),
          orderBy("date", "desc")
        );
        const postsSnapshots = await getDocs(postsQuery);
        postsSnapshots.forEach(post => {
          const data = post.data();
          this.posts.push({
            id: post.id,
            categoryName: data?.category?.name,
            dateStr: format(new Date(parseInt(data.date)), "dd.MM.yy HH:mm"),
            ...data
          });
        });
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },
    async getPosts() {
      try {
        this.loading = true;
        this.posts = [];
        const posts = await getDocs(collection(db, "posts"));
        posts.forEach(post => {
          const data = post.data();
          this.posts.push({
            id: post.id,
            categoryName: data?.category?.name,
            dateStr: format(new Date(parseInt(data.date)), "dd.MM.yy HH:mm"),
            ...data
          });
        });
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.table {
  border-spacing: 0 15px;
}

i {
  font-size: 1rem !important;
}

.table tr {
  border-radius: 20px;
}

tr td:nth-child(n + 6),
tr th:nth-child(n + 6) {
  border-radius: 0 0.625rem 0.625rem 0;
}

tr td:nth-child(1),
tr th:nth-child(1) {
  border-radius: 0.625rem 0 0 0.625rem;
}
</style>
