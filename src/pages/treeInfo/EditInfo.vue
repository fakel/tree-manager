<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">

      <q-input filled v-model="areaName" label="Area Name" lazy-rules />
      <q-input filled v-model="specieName" label="Specie Name" lazy-rules />
      <q-input filled v-model="haciendaName" label="Hacienda Name" lazy-rules />
      <q-input
      stack-label
        filled
        dense
        v-model="germinationDate"
        type="date"
        label="Germination Date"
        lazy-rules />
      <q-input
        filled
        stack-label
        v-model="firstFlowerDate"
        type="date"
        label="First Flower Date"
        lazy-rules />
      <q-input
        filled
        stack-label
        v-model="firstFruitDay"
        type="date"
        label="First Fruit Day"
        lazy-rules />
      <q-input filled v-model="coordinates" label="Coordinates" lazy-rules />
      <q-btn @click="getCoords" label="Get Coodinates" />

      <div>
        <q-btn label="Save" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('base');

export default {
  data() {
    return {
      areaName: null,
      specieName: null,
      haciendaName: null,
      coordinates: null,
      germinationDate: null,
      firstFlowerDate: null,
      firstFruitDay: null,
    };
  },
  created() {
    const id = this.getTreeID;
    this.$idb.getEntry('treeInfo', id)
      .then((treeData) => {
        const infoData = treeData.info
          ? treeData.info.sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))[0]
          : null;
        if (infoData) {
          this.areaName = infoData.areaName;
          this.specieName = infoData.specieName;
          this.haciendaName = infoData.haciendaName;
          this.coordinates = infoData.coordinates;
          this.germinationDate = infoData.germinationDate;
          this.firstFlowerDate = infoData.firstFlowerDate;
          this.firstFruitDay = infoData.firstFruitDay;
        }
      });
  },
  computed: {
    ...mapGetters(['getTreeID']),
  },
  methods: {
    getCoords() {
      this.coordinates = 'Getting coordinates...';
      navigator.geolocation.getCurrentPosition((position) => {
        this.coordinates = `${position.coords.latitude},${position.coords.longitude}`;
      }, () => {
        this.coordinates = 'Cannot get coordinates!';
      });
    },
    onSubmit() {
      const id = this.getTreeID;
      this.$idb.getEntry('treeInfo', id)
        .then((treeData) => {
          if (!treeData.info) {
            treeData.info = [];
          }
          treeData.info.push({
            areaName: this.areaName,
            specieName: this.specieName,
            haciendaName: this.haciendaName,
            coordinates: this.coordinates,
            germinationDate: this.germinationDate,
            firstFlowerDate: this.firstFlowerDate,
            firstFruitDay: this.firstFruitDay,
            timestamp: new Date(),
          });
          this.$idb
            .saveEntry('treeInfo', treeData);
        })
        .then(() => {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Saved',
          });
          setTimeout(() => this.$router.push({ name: 'info' }), 1000);
        });
    },

    onReset() {
      this.areaName = null;
      this.specieName = null;
      this.haciendaName = null;
      this.coordinates = null;
      this.germinationDate = null;
      this.firstFlowerDate = null;
      this.firstFruitDay = null;
    },
  },
};
</script>

<style></style>
