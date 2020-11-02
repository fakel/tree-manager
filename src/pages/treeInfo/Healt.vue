<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input filled v-model="diagnosis" label="Diagnosis" lazy-rules />
      <q-input filled v-model="action" label="Actions taken" lazy-rules />
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
      diagnosis: null,
      action: null,
      comment: null,
    };
  },
  created() {
    const id = this.getTreeID;
    this.$idb.getEntry('treeInfo', id)
      .then((treeData) => {
        const healtData = treeData.healt
          ? treeData.healt.sort((a, b) => (a.timeStamp > b.timeStamp ? -1 : 1))[0]
          : null;
        if (healtData) {
          this.diagnosis = healtData.diagnosis;
          this.action = healtData.action;
          this.comment = healtData.comment;
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
          if (!treeData.healt) {
            treeData.healt = [];
          }
          treeData.healt.push({
            diagnosis: this.diagnosis,
            action: this.action,
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
      this.diagnosis = null;
      this.action = null;
      this.comment = null;
    },
  },
};
</script>

<style></style>
