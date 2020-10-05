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
                <q-btn
                    @click="signWithFacebook"
                    round
                    color="primary"
                    icon="ion-logo-facebook"
                    />
                <q-btn
                    @click="signWithTwitter"
                    round
                    color="cyan"
                    icon="ion-logo-twitter"
                />
                <q-btn
                    @click="signWithGoogle"
                    round
                    color="red"
                    icon="ion-logo-google"
                />
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
  // eslint-disable-next-line no-unused-vars
  methods: {
    signWithFacebook() {
      console.log('Facebook');
    },
    signWithTwitter() {
      console.log('Twitter');
    },
    signWithGoogle() {
      console.log('Google');
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$auth().signInWithPopup(provider).then(() => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken;
        // The signed-in user info.
        // const { user } = result;
        // this.$idb.saveUser(user);
        // this.$store.dispatch('base/storeUser', user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // The email of the user's account used.
        // const { email } = error;
        // The firebase.auth.AuthCredential type that was used.
        // const { credential } = error;
        // ...
      });
    },
  },
};
</script>
