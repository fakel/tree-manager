<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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
      comment: null,
    };
  },
  created() {
    const id = this.getTreeID;
    this.$idb.getEntry('treeInfo', id)
      .then((treeData) => {
        const prunningData = treeData.prunning
          ? treeData.flower.sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))[0]
          : null;
        if (prunningData) {
          this.comment = prunningData.comment;
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
          if (!treeData.prunning) {
            treeData.prunning = [];
          }
          treeData.prunning.push({
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
      this.comment = null;
    },
  },
};
</script>

<style></style>
