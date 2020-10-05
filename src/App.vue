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
    this.$auth().onAuthStateChanged((user) => {
      if (user) this.$router.push({ path: '/dashboard' });
      else this.$router.push({ path: '/' });
    });
  },
};
</script>
