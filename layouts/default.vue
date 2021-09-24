<template>
  <div>
    <client-only>
      <nav class="navbar navbar-expand navbar-light bg-light">
        <div class="container-fluid">
          <!-- <nuxt-link class="navbar-brand" to="/">Nuxt Form</nuxt-link> -->
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link text-indigo-500 font-bold"
                  :class="{
                    active:
                      this.$route.path ===
                      '/?utm_source=website_com&utm_medium=news&utm_term=name_conference&utm_content=article&utm_campaign=moscow'
                  }"
                  exact
                  aria-current="page"
                  to="/?utm_source=website_com&utm_medium=news&utm_term=name_conference&utm_content=article&utm_campaign=moscow"
                  >UTM Link</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: this.$route.path === '/' }"
                  exact
                  aria-current="page"
                  to="/"
                  >Form</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="isAuth">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: this.$route.path === '/data' }"
                  exact
                  aria-current="page"
                  to="/admin/data"
                  >Data</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="isAuth">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: this.$route.path === '/posts' }"
                  exact
                  aria-current="page"
                  to="/admin/posts"
                  >Posts</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="!isAuth">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: this.$route.path === '/login' }"
                  exact
                  aria-current="page"
                  to="/login"
                  >Login</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="isAuth">
                <a href="#" class="nav-link" @click.prevent="logout">LogOut</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Nuxt />
    </client-only>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { mapState } from "vuex";
import { SET_AUTH } from "~/store/types";
export default {
  data: () => ({
    // isAuth: false
  }),
  computed: {
    ...mapState({
      isAuth: state => state?.auth?.isAuth
    })
  },
  mounted() {
    // this.checkAuth();
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$store.commit(`auth/${SET_AUTH}`, false, { root: true });
        this.$router.push("/login");
      });
    }
    // checkAuth() {
    //   const auth = getAuth();
    //   onAuthStateChanged(auth, user => {
    //     console.log("onAuthStateChanged", user);
    //     if (user) {
    //       this.isAuth = true;
    //     } else {
    //       this.isAuth = false;
    //     }
    //   });
    // }
  }
};
</script>

<style>
.container-fluid {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.navbar-nav {
  display: flex;
  flex-flow: row nowrap;
}

.nav-item {
  margin: 12px;
}

.nav-link {
  padding: 10px;
}

.nav-link.active {
  font-weight: bold;
}

.b1 {
  border: 1px solid red;
}

.b2 {
  border: 1px solid yellow;
}
</style>
