<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="getTreeID ? 'menu' : 'eco'"
          :aria-label="getTreeID ? 'Menu' : 'Eco'"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title> Forest Manager </q-toolbar-title>
        <q-btn @click="logout" round color="red" icon="ion-power" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="getTreeID"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      :width="150"
    >
      <q-list
        class="column no-wrap items-center justify-center q-pa-md q-gutter-sm"
      >
        <q-item-label header class="text-grey-8"> Menu </q-item-label>
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

const { mapActions, mapGetters } = createNamespacedHelpers('base');
const preLinksData = [
  {
    title: 'Info',
    caption: 'Info',
    link: { name: 'editInfo' },
  },
  {
    title: 'Harvest',
    caption: 'Harvest',
    link: { name: 'harvest' },
  },
  {
    title: 'Fruit',
    caption: 'Fruit',
    link: { name: 'fruit' },
  },
  {
    title: 'Flower',
    caption: 'Flower',
    link: { name: 'flower' },
  },
  {
    title: 'Prunning',
    caption: 'Prunning',
    link: { name: 'prunning' },
  },
  {
    title: 'Healt',
    caption: 'Healt',
    link: { name: 'healt' },
  },
  {
    title: 'About',
    caption: 'About',
    link: { name: 'about' },
  },
];

export default {
  name: 'MainLayout',
  components: {},
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  computed: {
    ...mapGetters(['getTreeID', 'getUserState']),
    menuLinks() {
      let newLinks;
      if (this.getUserState === 'offline') {
        newLinks = [
          {
            title: 'Main',
            caption: 'Main',
            link: { name: 'treeoffline' },
          },
          ...preLinksData,
          {
            title: 'Send Data',
            caption: 'Send Data',
            link: { name: 'send' },
          },
        ];
      } else {
        newLinks = [{
          title: 'Main',
          caption: 'Main',
          link: { name: 'tree' },
        }, ...preLinksData];
      }
      return newLinks;
    },
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
