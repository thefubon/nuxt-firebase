<template>
  <div class="w-full flex flex-row flex-nowrap items-start">
    <div class="flex flex-grow flex-col">
      <input type="text" class="" v-model="settings.label" />
      <div class="flex flex-grow">
        <div class="image-wrapper w-full">
          <img
            @click.prevent="$refs.file.click()"
            :src="settings.value"
            v-if="settings.value"
            alt=""
          />
          <button
            v-else
            class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            type="button"
            @click.prevent="$refs.file.click()"
          >
            Upload image
          </button>
        </div>
        <!-- <div>{{ progress }}</div> -->
        <input
          accept="image/*"
          ref="file"
          @change="change"
          type="file"
          class="hidden"
        />
      </div>
    </div>
    <button
      @click="$emit('remove', { settings })"
      class="py-2  mt-6 ml-2 px-2 bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-700 focus:outline-none "
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
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  </div>
</template>

<script>
// import firebase from "firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
export default {
  name: "SingleImage",
  props: ["settings"],
  data: () => ({
    // image: null,
    progress: 0
  }),
  methods: {
    // emitChanges() {
    //   this.$emit("input", { value: this.image, settings: this.settings });
    // },
    change(e) {
      const metadata = {
        contentType: "image/jpeg"
      };
      const file = e.target.files[0];
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storage = getStorage();
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // this.progress =
          // (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => console.error(error),
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            // this.image = downloadURL;
            this.settings.value = downloadURL;
            this.$forceUpdate();
            // this.emitChanges();
          });
        }
      );
    }
  }
};
</script>

<style scoped>
.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 170px;
  border: 1px dashed black;
  border-radius: 8px;
  padding: 8px;
}
</style>
