<template>
  <q-page-container>
    <q-page
      padding
      class="column no-wrap items-center justify-center q-pa-md q-gutter-sm"
    >
      <div class="row q-mb-md">
        <q-icon name="edit" size="xl" class="q-mr-sm" />
        <q-btn
          @click="prompt = true"
          style="width: 150px"
          color="primary"
          label="Write Tag"
        />
      </div>
      <div class="row q-mb-md">
        <q-icon name="description" size="xl" class="q-mr-sm" />
        <q-btn style="width: 150px" color="primary" label="Read Tag" />
      </div>
      <p class="row q-mb-none">Or</p>
      <q-icon name="qr_code_scanner" size="150px" />
      <p>Scan Code</p>
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Tree Code</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="treeID"
              autofocus
              @keyup.enter="setTree"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn @click="treeID = ''" label="Cancel" v-close-popup />
            <q-btn @click="setTree" label="Accept" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </q-page-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('base');

export default {
  name: 'PageIndexOffline',
  data() {
    return {
      prompt: false,
      treeID: '',
    };
  },
  computed: {},
  methods: {
    setTree() {
      if (this.treeID !== '') {
        this.saveTreeID({ treeID: this.treeID });
        this.$router.push({ name: 'treeoffline' });
      }
      this.prompt = false;
    },
    ...mapActions(['saveTreeID']),
  },
};
</script>
