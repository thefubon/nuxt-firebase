<template>
  <div class="container mx-auto my-16">
    <h3 class="text-2xl font-bold mb-4">Registered Users</h3>
    <div
      v-if="loading"
      class="spinner-border"
      style="width: 2rem; height: 2rem"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <table v-else class="table table-hover  table-striped">
      <thead>
        <tr>
          <th>№</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Code</th>
          <th>Phone</th>
          <th>Country</th>
          <th>Email</th>
          <th>Gendere</th>
          <th>Date</th>
          <th>utmSource</th>
          <th>utmMedium</th>
          <th>utmTerm</th>
          <th>utmContent</th>
          <th>utmCampaign</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in itemsSorted" :key="index">
          <td>{{ itemsSorted.length - index }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.LastName }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.country }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.gendere }}</td>
          <td>{{ formatDate(item.id) }}</td>
          <td>{{ item.utm_source }}</td>
          <td>{{ item.utm_medium }}</td>
          <td>{{ item.utm_term }}</td>
          <td>{{ item.utm_content }}</td>
          <td>{{ item.utm_campaign }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <button @click="authbtn">auth</button> -->
    <!-- <button @click="signout">out</button> -->
  </div>
</template>

<script>
import { db } from "~/plugins/firebase";
import { getDocs, collection } from "firebase/firestore";
import { format } from "date-fns";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

export default {
  data: () => ({
    items: [],
    loading: true
  }),
  mounted() {
    this.setInitialize();
  },
  computed: {
    itemsSorted() {
      return this.items?.sort((a, b) => {
        if (a.id > b.id) return -1;
        else if (a.id < b.id) return 1;
        else return 0;
      });
    }
  },
  methods: {
    checkAuth() {
      const auth = getAuth();
      onAuthStateChanged(auth, user => {
        if (!user) {
          this.$router.push("/login");
        }
      });
    },

    // authbtn() {
    //   const auth = getAuth();
    //   signInWithEmailAndPassword(auth, "test@test.com", "123456")
    //     .then(async userCredential => {
    //       // Signed in
    //       const user = userCredential.user;
    //       console.log("accessToken", user.accessToken);
    //       console.log("uid", user.uid);
    //       const idToken = await user.getIdToken();
    //       console.log(idToken);

    //       onAuthStateChanged(auth, user => {
    //         console.log("user", user);
    //       });

    //       // ...
    //     })
    //     .catch(error => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       // ..
    //     });
    // },
    formatDate(date) {
      return format(new Date(parseInt(date)), "dd.MM.yy HH:mm");
    },
    async setInitialize() {
      try {
        this.checkAuth();
        // const auth = getAuth();
        // onAuthStateChanged(auth, user => {
        //   console.log("user", user);
        // });
        this.loading = true;
        const docs = await getDocs(collection(db, "users"));
        docs.forEach(doc => {
          this.items.push({
            id: doc.id,
            ...doc.data()
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
