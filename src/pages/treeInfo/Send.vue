<template>
  <q-page-container>
    <q-page
      padding
      class="column no-wrap items-center justify-center q-pa-md q-gutter-sm"
    >
      <q-icon name="cloud_upload" size="150px" />
      <div class="row q-mb-md">
        <q-btn
          @click="cloudSync"
          style="width: 150px"
          color="primary"
          label="Sync with Cloud"
        />
      </div>
    </q-page>
  </q-page-container>
</template>

<script>

function toUnique(data) {
  return data.filter((v, idx, arr) => {
    if (idx === 0) return true;
    for (let i = 0; i < idx; i += 1) {
      if (v.id === arr[i].id) {
        return false;
      }
    }
    return true;
  });
}

export default {
  methods: {
    cloudSync() {
      // Get all offline entries
      this.$idb
        .getAllEntries('treeInfo')
        .then((treesData) => {
          // For each entry
          treesData.forEach((treeInfo) => {
            // First the id
            const docID = treeInfo.id;
            // Firebase Batch
            const batch = this.$db.batch();
            const ledger = this.$db.collection('ledger');
            const treeInfoCol = this.$db.collection('treeInfo');
            // Try get current document
            treeInfoCol.doc(docID).get()
              .then((current) => {
                const currentState = current.data() ? current.data() : {};
                const dataTypes = ['info', 'harvest', 'fruit', 'flower', 'prunning', 'healt'];
                // For each data type
                dataTypes.forEach((type) => {
                  // Check if there is anything to upload
                  if (treeInfo[type]) {
                    // Create each reference with name "type+id+timeInMilis"
                    const typeRefs = treeInfo[type].map((reg) => {
                      const regToUpdate = reg;
                      if (!regToUpdate.author) regToUpdate.author = this.$auth.currentUser.uid;
                      const ref = ledger.doc(`${type + docID + reg.timestamp.getTime()}`);
                      batch.set(ref, regToUpdate);
                      return ref;
                    });
                    // Concatenate with current values or create new
                    if (currentState[type]) {
                      currentState[type] = ([...typeRefs, ...currentState[type]]);
                    } else {
                      currentState[type] = typeRefs;
                    }
                    // Sanitize, unique refs and olders first
                    currentState[type] = toUnique(currentState[type]).sort().reverse();
                  }
                });
                // update treeInfo collection
                if (!currentState.id) currentState.id = docID;
                batch.set(treeInfoCol.doc(docID), currentState);
                // Commit changes
                batch.commit();
              });
          });
        });
      // .catch((e) => console.log(e));
    },
  },
};
</script>
