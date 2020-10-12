<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="treeID ? 'menu' : 'eco'"
          :aria-label="treeID ? 'Menu' : 'Eco'"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          Forest Manager
        </q-toolbar-title>
        <q-btn
              @click="logout"
              round
              color="red"
              icon="ion-power"
          />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="treeID"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      :width="150"
    >
      <q-list class="column no-wrap items-center justify-center q-pa-md q-gutter-sm">
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <q-btn
          color="secondary"
          style="width: 100px"
          v-for="link in menuLinks"
          :key="link.title"
          :label="link.title"
          @click="$router.push(link.link)"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('base');
const linksData = [
  {
    title: 'Harvest',
    caption: 'quasar.dev',
    link: { name: 'harvest' },
  },
  {
    title: 'Fruit',
    caption: 'github.com/quasarframework',
    link: { name: 'fruit' },
  },
  {
    title: 'Flower',
    caption: 'chat.quasar.dev',
    link: { name: 'flower' },
  },
  {
    title: 'Prunning',
    caption: 'forum.quasar.dev',
    link: { name: 'prunning' },
  },
  {
    title: 'Healt',
    caption: '@quasarframework',
    link: { name: 'healt' },
  },
  {
    title: 'About',
    caption: '@QuasarFramework',
    link: { name: 'about' },
  },
  {
    title: 'Send Data',
    caption: 'Community Quasar projects',
    link: { name: 'send' },
  },
];

export default {
  name: 'MainLayout',
  components: {},
  data() {
    return {
      leftDrawerOpen: false,
      menuLinks: linksData,
    };
  },
  computed: {
    ...mapState({
      treeID: (state) => state.treeID,
    }),
  },
  methods: {
    logout() {
      if (this.$store.state.userState === 'offline') {
        this.saveUserState({ userState: null });
      } else {
        this.$auth().signOut();
        this.$router.push({ path: '/' });
      }
    },
    ...mapActions(['saveUserState']),
  },
};
</script>
