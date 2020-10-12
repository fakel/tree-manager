<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="eco"
          aria-label="Eco"
        />
        <q-toolbar-title>
          Forest Manager
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">

          <q-card-section class="q-pt-md q-gutter-md">
            <q-input v-model="email" filled type="email" hint="Email" />
            <q-input
              v-model="password"
              filled
              :type="isPwd ? 'password' : 'text'"
              hint="Password"
              class="q-pl-none"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Accept" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
                <q-btn @click="offline" color="primary" label="Offline Access" />
            </div>
            <p class="row q-mb-none">Or</p>
            <div class="row">
                <q-btn @click="prompt=true" color="secondary" label="Sign-In" />
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
      prompt: false,
      isPwd: true,
      email: '',
      password: '',
    };
  },
  // eslint-disable-next-line no-unused-vars
  methods: {
    offline() {
      this.$store.dispatch('base/saveUserState', { userState: 'offline' });
      this.$router.push({ path: '/dashboard/offline' });
    },
    signWithEmailAndPassword() {
      this.$auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.dispatch('base/saveUserState', { userState: 'online' });
        });
      // .catch((error) => {
      //   // Handle Errors here.
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   // ...
      // });
    },
    signWithFacebook() {
      console.log('Facebook');
    },
    signWithTwitter() {
      console.log('Twitter');
    },
    signWithGoogle() {
      console.log('Google');
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$store.dispatch('base/saveUserState', { userState: 'online' });
        });
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     console.log(errorCode, errorMessage);
      //   });
    },
  },
};
</script>
