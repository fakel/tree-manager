<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar icon="eco" />
          Forest Manager
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
        <q-page padding class="column no-wrap items-center justify-center q-pa-md q-gutter-sm">
            <div class="row col-12">
                <q-avatar
                size="150px"
                font-size="52px"
                color="teal"
                text-color="white"
                icon="person" />
            </div>
            <div class="row">
                <q-btn color="primary" label="Offline Access" />
            </div>
            <p class="row q-mb-none">Or</p>
            <div class="row">
                <q-btn color="secondary" label="Sign-In" />
            </div>
            <div class="row">
                <p>Alternatively you can log in using:</p>
            </div>
            <div class="row q-gutter-sm">
                <q-btn round color="primary" icon="ion-logo-facebook" />
                <q-btn round color="cyan" icon="ion-logo-twitter" />
                <q-btn round color="red" icon="ion-logo-google" />
            </div>
        </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>
