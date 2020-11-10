<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    //   this.$idb.getUser()
    //     .then((res) => {
    //       console.log(res);
    //       if (res[0].value.uid) this.$router.push({ path: '/dashboard' });
    //     });
    this.$auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('base/saveUserState', { userState: 'online' });
        this.$router.push({ name: 'online' });
      } else if (window.location.hash !== '#/') {
        this.$store.dispatch('base/saveUserState', { userState: null });
        this.$router.push({ name: 'login' });
      }
    });
  },
};
</script>
