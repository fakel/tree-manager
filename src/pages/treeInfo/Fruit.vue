<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="fruits"
        label="Number of Fruits *"
        lazy-rules
        type="number"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input filled v-model="status" label="Fruit Status" lazy-rules />
      <q-input filled v-model="comment" label="Comments" lazy-rules />

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
      fruits: null,
      status: null,
      comment: null,
    };
  },
  created() {
    const id = this.getTreeID;
    this.$idb.getEntry('treeInfo', id)
      .then((treeData) => {
        const fruitData = treeData.fruit
          ? treeData.fruit.sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))[0]
          : null;
        if (fruitData) {
          this.fruits = fruitData.fruits;
          this.status = fruitData.status;
          this.comment = fruitData.comment;
        }
      });
  },
  computed: {
    ...mapGetters(['getTreeID']),
  },
  methods: {
    onSubmit() {
      const id = this.getTreeID;
      this.$idb.getEntry('treeInfo', id)
        .then((treeData) => {
          if (!treeData.fruit) {
            treeData.fruit = [];
          }
          treeData.fruit.push({
            fruits: this.fruits,
            status: this.status,
            comment: this.comment,
            timestamp: new Date(),
          });
          return this.$idb
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
      this.fruits = null;
      this.status = null;
      this.comment = null;
    },
  },
};
</script>

<style></style>
