<template>
  <q-page-container>
    <q-page padding class="column no-wrap q-pa-md q-gutter-sm">
      <p>Tree Info</p>
      <p><strong>ID: </strong>{{ getTreeID }}</p>

      <strong>Info</strong>
      <section v-if="info">
        <ul v-for="(el, key, ind) in info" :key="key + ind">
          <li>{{ key.toUpperCase() }}: {{ el }}</li>
        </ul>
      </section>

      <strong>Harvest</strong>
      <section v-if="harvest">
        <ul v-for="(el, key, ind) in harvest" :key="key + ind">
          <li>{{ key.toUpperCase() }}: {{ el }}</li>
        </ul>
      </section>

      <strong>Fruit</strong>
      <section v-if="fruit">
        <ul v-for="(el, key, ind) in fruit" :key="key + ind">
          <li>{{ key.toUpperCase() }}: {{ el }}</li>
        </ul>
      </section>

      <strong>Flower</strong>
      <section v-if="flower">
        <ul v-for="(el, key, ind) in flower" :key="key + ind">
          <li>{{ key.toUpperCase() }}: {{ el }}</li>
        </ul>
      </section>

      <strong>Prunning</strong>
      <section v-if="prunning">
        <ul v-for="(el, key, ind) in prunning" :key="key + ind">
          <li>{{ key.toUpperCase() }}: {{ el }}</li>
        </ul>
      </section>

      <strong>Healt</strong>
      <section v-if="healt">
        <ul v-for="(el, key, ind) in healt" :key="key + ind">
          <li>{{ key.toUpperCase() }}: {{ el }}</li>
        </ul>
      </section>
    </q-page>
  </q-page-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('base');

export default {
  data() {
    return {
      flower: null,
      fruit: null,
      harvest: null,
      healt: null,
      info: null,
      prunning: null,
    };
  },
  computed: {
    ...mapGetters(['getTreeID']),
  },
  methods: {},
  mounted() {
    const id = this.getTreeID;
    this.$idb.getEntry('treeInfo', id).then((res) => {
      if (res) {
        this.flower = res.flower
          ? res.flower.sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))[0]
          : null;
        this.fruit = res.fruit
          ? res.fruit.sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))[0]
          : null;
        this.harvest = res.harvest
          ? res.harvest.sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))[0]
          : null;
        this.healt = res.healt
          ? res.healt.sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))[0]
          : null;
        this.info = res.info
          ? res.info.sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))[0]
          : null;
        this.prunning = res.prunning
          ? res.prunning.sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))[0]
          : null;
      } else {
        this.$idb.saveEntry('treeInfo', { id });
      }
    });
  },
};
</script>
