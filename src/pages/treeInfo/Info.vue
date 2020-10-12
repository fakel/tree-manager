<template>
    <q-page-container>
        <q-page padding class="column no-wrap items-center justify-center q-pa-md q-gutter-sm">
            <h1>Tree Info</h1>
            <h2>{{getTreeID}}</h2>
        </q-page>
    </q-page-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('base');

export default {
  computed: {
    ...mapGetters(['getTreeID']),
  },
};
</script>
