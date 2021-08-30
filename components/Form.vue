<template>
  <div class="container mx-auto max-w-md px-4">
    <form v-if="!registrationPassed" @submit.prevent="checkForm">
      <div class="my-3">
        <legend class="text-sm">First Name</legend>
        <input
          id="firstName"
          v-model.trim="form.firstName"
          class="form-input px-4 py-3 rounded w-full"
          :class="$v.form.firstName.$error ? 'is-invalid' : ''"
          type="text"
        />
        <p
          v-if="$v.form.firstName.$dirty && !$v.form.firstName.required"
          class="invalid-feedback text-xs"
        >
          Required field!
        </p>
        <p
          v-if="$v.form.firstName.$dirty && !$v.form.firstName.minLength"
          class="invalid-feedback text-xs"
        >
          There must be more than 3 characters!
        </p>
      </div>

      <div class="my-3">
        <legend class="text-sm">LastName</legend>
        <input
          id="LastName"
          v-model.trim="form.LastName"
          class="form-input px-4 py-3 rounded w-full"
          :class="$v.form.LastName.$error ? 'is-invalid' : ''"
          type="text"
        />
        <p
          v-if="$v.form.LastName.$dirty && !$v.form.LastName.required"
          class="invalid-feedback text-xs"
        >
          Required field!
        </p>
        <p
          v-if="$v.form.LastName.$dirty && !$v.form.LastName.minLength"
          class="invalid-feedback text-xs"
        >
          There must be more than 3 characters!
        </p>
      </div>

      <div class="my-3">
        <legend class="text-sm">Phone</legend>
        <div class="flex items-top space-x-4">
          <div>
            <input
              id="code"
              v-model.trim="form.code"
              :class="$v.form.code.$error ? 'is-invalid' : ''"
              class="form-input w-[100px] px-4 py-3 rounded"
              type="tel"
              placeholder="Code"
            />
            <p
              v-if="$v.form.code.$dirty && !$v.form.code.required"
              class="invalid-feedback text-xs"
            >
              Required field!
            </p>
          </div>
          <div class="flex-auto w-full">
            <input
              id="phone"
              v-model.trim="form.phone"
              :class="$v.form.phone.$error ? 'is-invalid' : ''"
              class="form-input px-4 py-3 rounded w-full"
              type="tel"
              placeholder="Phone number"
            />
            <p
              v-if="$v.form.phone.$dirty && !$v.form.phone.required"
              class="invalid-feedback text-xs"
            >
              Required field!
            </p>
          </div>
        </div>
      </div>

      <div class="my-3">
        <legend class="text-sm">Email</legend>
        <input
          id="email"
          v-model.trim="form.email"
          class="form-input px-4 py-3 rounded w-full"
          :class="$v.form.email.$error ? 'is-invalid' : ''"
          type="email"
        />
        <p
          v-if="$v.form.email.$dirty && !$v.form.email.required"
          class="invalid-feedback text-xs"
        >
          Required field!
        </p>
        <p
          v-if="$v.form.email.$dirty && !$v.form.email.email"
          class="invalid-feedback text-xs"
        >
          Email is incorrect
        </p>
      </div>

      <div class="flex my-3 space-x-4">
        <div class="flex items-center space-x-2">
          <input
            class="form-radio"
            type="radio"
            value="male"
            name="exampleRadios"
            id="male"
            v-model="form.gendere"
          />
          <label for="male">Male</label>
        </div>
        <div class="flex items-center space-x-2">
          <input
            class="form-radio"
            type="radio"
            value="female"
            name="exampleRadios"
            id="female"
            v-model="form.gendere"
          />
          <label for="female">Female</label>
        </div>
      </div>

      <div class="my-3">
        <legend class="text-sm">Country of residence:</legend>
        <select
          id="country"
          class="form-select px-4 py-3 rounded w-full"
          v-model="form.country"
        >
          <option
            v-for="(country, index) in countries"
            :value="country.value"
            :key="index"
          >
            {{ country.label }}
          </option>
        </select>
      </div>

      <div class="my-6">
        <div class="flex items-center space-x-2">
          <input
            id="checkbox"
            v-model.trim="form.checkbox"
            :class="$v.form.checkbox.$error ? 'is-invalid' : ''"
            class="form-checkbox rounded text-indigo-500"
            type="checkbox"
          />
          <label class="text-sm" for="checkbox"
            >Lorem, ipsum dolor sit amet consectetur adipisicing elit.</label
          >
        </div>
        <p
          v-if="$v.form.checkbox.$dirty && !$v.form.checkbox.mustBeTrue"
          class="invalid-feedback text-xs"
        >
          Required field!
        </p>
      </div>

      <input name="utmSource" type="hidden" id="form-input-utmSource" />
      <input name="utmMedium" type="hidden" id="form-input-utmMedium" />
      <input name="utmTerm" type="hidden" id="form-input-utmTerm" />
      <input name="utmContent" type="hidden" id="form-input-utmContent" />
      <input name="utmCampaign" type="hidden" id="form-input-utmCampaign" />

      <input name="date" type="hidden" id="dataReg" />

      <div class="my-6">
        <button type="submit" :disabled="loading" class="visually-hidden inline-flex items-center px-4 py-3 bg-indigo-500 text-white rounded d-flex align-items-center">
          <div
            v-if="loading"
            role="status"
          >
            <svg class="visually-hidden Registration animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          Registration
        </button>
      </div>
    </form>
    <div v-else>
      <h1 class="text-2xl font-bold">
        {{ `${form.firstName}, поздравляем вы успешно зарегистрированы!` }}
      </h1>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import { db } from "~/plugins/firebase";
import { doc, setDoc } from "firebase/firestore";
import { req } from "vuelidate/lib/validators/common";
export default {
  mixins: [validationMixin],
  data() {
    return {
      query: null,
      loading: false,
      registrationPassed: false,
      form: {
        firstName: "",
        LastName: "",
        code: "",
        phone: "",
        country: "Russia",
        email: "",
        gendere: "male",
        checkbox: false
      },
      countries: [
        {
          label: "Russia",
          value: "Russia"
        },
        {
          label: "Ukraine",
          value: "Ukraine"
        },
        {
          label: "USA",
          value: "USA"
        }
      ]
    };
  },
  validations: {
    form: {
      firstName: { required, minLength: minLength(3) },
      LastName: { required, minLength: minLength(3) },
      code: { required },
      phone: { required },
      email: { required, email },
      checkbox: {
        mustBeTrue(value) {
          return value;
        }
      }
    }
  },
  mounted() {
    const queryKeys = Object.keys(this.$route?.query);
    if (queryKeys && queryKeys.length) {
      this.query = this.$route?.query;
    }
  },
  methods: {
    async checkForm() {
      this.$v.form.$touch();
      if (!this.$v.form.$error) {
        try {
          this.loading = true;
          let request = this.form;
          if (this.query) {
            request = {
              ...request,
              ...this.query
            };
          }
          await setDoc(doc(db, "users", Date.now().toString()), request);
          this.loading = false;
          this.registrationPassed = true;
        } catch (e) {
          this.loading = false;
          console.log(e);
        }
      }
    }
  }
};
</script>

<style>
.is-invalid {
  @apply border-red-500;
}
.invalid-feedback {
  @apply text-red-500;
}
</style>
