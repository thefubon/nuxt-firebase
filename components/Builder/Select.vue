<template>
  <div class="flex flex-col">
    <div class="w-full">
      <div class="w-full flex flex-row flex-nowrap">
        <div class="flex flex-grow flex-col">
          <input type="text" class="" v-model="settings.label" />
          <div class="relative flex-grow">
            <select
              :value="settings.value"
              @change="changeProps"
              class="block appearance-none w-full  border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              <option v-for="(item, index) in options" :key="index">{{
                item
              }}</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <button
          v-if="edit"
          @click="$emit('remove', { settings })"
          class="py-2 self-end ml-2 px-2 bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-700 focus:outline-none "
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
    </div>
    <div class="w-full" v-if="edit">
      <button class="w-full" v-if="!showOptions" @click="showOptions = true">
        Show options
      </button>
      <button class="w-full" v-else @click="showOptions = false">
        Hide options
      </button>
      <div v-if="showOptions">
        <div
          class="flex flex-row flex-nowrap items-center mb-2"
          v-for="(item, index) in options"
          :key="index"
        >
          <span class="flex-grow">{{ item }}</span>
          <button
            @click="removeOption(index)"
            class="py-1 mr-1 ml-2 px-1 bg-yellow-500 text-white font-semibold rounded-lg shadow-sm hover:bg-yellow-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div class="flex flex-row flex-nowrap">
          <input
            v-on:keyup.enter="addOption"
            type="text"
            v-model="newOption"
            placeholder="New option"
            class="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            @click="addOption"
            class="py-1 mr-1 ml-2 px-1 bg-green-500 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 focus:outline-none"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleSelect",
  props: {
    settings: {
      type: Object
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    showOptions: false,
    newOption: null
  }),
  computed: {
    options() {
      return this.settings?.options ?? [];
    }
  },
  methods: {
    changeProps(event) {
      this.settings.value = event?.target?.value;
    },
    removeOption(index) {
      this.settings?.options?.splice(index, 1);
    },
    addOption() {
      if (this.newOption) {
        this.settings?.options?.push(this.newOption);
        this.newOption = null;
      }
    }
  }
};
</script>
