<template>
  <client-only>
    <div class="container mx-auto max-w-md px-4" v-if="isNotEmpty">
      <h1 class="mb-4 text-center">{{ title }}</h1>
      <div>
        <div>
          <!-- <div class="mb-2">
            <legend class="text-sm">Title</legend>
            <input
              v-model.trim="title"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="$v.title.$error ? 'is-invalid' : ''"
              type="text"
            />
            <p
              v-if="$v.title.$dirty && !$v.title.required"
              class="invalid-feedback text-xs"
            >
              Required field!
            </p>
          </div> -->
          <div class="flex flex-grow flex-col mb-2">
            <legend class="text-sm">Category</legend>
            <div class="relative flex-grow">
              <div>{{ category.name }}</div>
            </div>
          </div>
          <div class="mb-5">
            <!-- <legend class="text-sm">Description</legend> -->
            <div v-html="description"></div>
            <!-- <input
              v-model.trim="description"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="$v.description.$error ? 'is-invalid' : ''"
              type="text"
            />
            <p
              v-if="$v.description.$dirty && !$v.description.required"
              class="invalid-feedback text-xs"
            >
              Required field!
            </p> -->
          </div>
          <component
            class="mb-2"
            :is="block.component"
            v-for="block in body"
            :key="block.id"
            :settings="block"
            :edit="false"
            @remove="handlerRemove"
          ></component>
          <div class="w-full mb-5 flex flex-row flex-nowrap">
            <button
              class="mr-2  py-2 px-4 bg-gray-200  text-white font-semibold rounded-lg shadow-sm hover:bg-gray-300  focus:outline-none "
              type="button"
              @click.prevent="$router.push('/posts')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import Input from "~/components/Builder/Input.vue";
import Textarea from "~/components/Builder/Texarea.vue";
import SingleImage from "~/components/Builder/Image.vue";
import SingleSelect from "~/components/Builder/Select.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { db } from "~/plugins/firebase";
import { doc, setDoc, getDocs, getDoc, collection } from "firebase/firestore";

export default {
  name: "CreatePostPage",
  mixins: [validationMixin],
  components: {
    Input,
    Textarea,
    SingleImage,
    SingleSelect
  },
  data: () => ({
    loading: false,
    title: null,
    description: null,
    category: null,
    categories: [],
    body: []
  }),
  validations: {
    title: { required },
    description: { required }
  },
  computed: {
    isNotEmpty() {
      return this.title && this.description;
    },
    allowSave() {
      return this.body?.length > 0 && !this.loading;
    },
    postId() {
      return this.$route.params.id;
    }
  },
  async mounted() {
    // this.getPosts();
    await this.getCategories();
    await this.getPost(this.postId);
  },
  methods: {
    async getPost(id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { title, description, body } = docSnap.data();
        this.title = title;
        this.description = description;
        this.body = body;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    async getCategories() {
      try {
        this.loading = true;
        const categories = await getDocs(collection(db, "postCategories"));
        categories.forEach(item => {
          this.categories.push({
            id: item.id,
            ...item.data()
          });
        });
        if (this.categories?.length) {
          this.category = this.categories[0];
        }
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },
    async saveForm() {
      this.$v.$touch();
      if (!this.$v.$error) {
        // this.body.forEach(item => console.log(item.value));
        try {
          this.loading = true;
          let request = {
            title: this.title,
            description: this.description,
            category: this.category,
            body: this.body,
            date: Date.now().toString()
          };
          await setDoc(doc(db, "posts", this.postId), request);
          this.loading = false;
          this.$router.push("/posts");
        } catch (e) {
          this.loading = false;
          console.log(e);
        }
      }
    },
    addSelect() {
      this.body.push({
        id: Date.now(),
        component: "SingleSelect",
        vlaue: null,
        label: "Label Select",
        options: ["Option 1", "Option 2", "Option 3"]
      });
    },
    addImage() {
      this.body.push({
        id: Date.now(),
        component: "SingleImage",
        vlaue: null,
        label: "Label Image"
      });
    },
    addInput() {
      this.body.push({
        id: Date.now(),
        component: "Input",
        vlaue: null,
        label: "Label Input"
      });
    },
    addTextarea() {
      this.body.push({
        id: Date.now(),
        component: "Textarea",
        vlaue: null,
        label: "Label Textarea"
      });
    },
    handlerRemove(e) {
      const id = e?.settings?.id;
      if (id) {
        const find = this.body?.find(x => x.id === id);
        const index = this.body?.indexOf(find);
        this.body?.splice(index, 1);
      }
    },
    // handlerChange(e) {
    //   console.log("e", e);
    //   const { id, value } = e;
    //   console.log(id, value);
    //   // const value = e?.value;
    //   if (id) {
    //     const find = this.body.find(x => x.id === id);
    //     const newObj = Object.assign({}, find);
    //     newObj.value = value;
    //     const index = this.body.indexOf(find);
    //     console.log(index);
    //     this.body.splice(index, 1, newObj);
    //   }
    // },
    async getPosts() {
      try {
        this.loading = true;
        const posts = await getDocs(collection(db, "posts"));
        posts.forEach(post => {
          this.posts.push({
            id: post.id,
            ...post.data()
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
