<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
    <div class="row">
      <div class="col-md-3">
        <!-- sidebar -->
        <Sidebar />
        <!-- end sidebar -->
      </div>
      <div class="col-md-9">
        <div class="card border-0 rounded shadow-sm border-top-orange">
          <div class="card-body">
            <h5><i class="fa fa-tachometer-alt"></i> DASHBOARD</h5>
            <hr>

            <div class="row">
              <div class="col-md-12">
                <div class="alert alert-success" role="alert">
                  Selamat Datang <strong>{{ $auth.user.name }}</strong>
                </div>
              </div>
            </div>

            <div class="row">

              <div class="col-6 col-lg-3">
                <div class="card rounded shadow-sm overflow-hidden">
                  <div class="card-body p-0 d-flex align-items-center">
                    <div class="bg-primary py-4 px-5 mfe-3">
                      <i class="fas fa-circle-notch fa-spin fa-2x"></i>
                    </div>
                    <div>
                      <div class="text-value text-primary">{{ pending }}</div>
                      <div class="text-muted text-uppercase font-weight-bold small">PENDING</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6 col-lg-3">
                <div class="card rounded shadow-sm overflow-hidden">
                  <div class="card-body p-0 d-flex align-items-center">
                    <div class="bg-success py-4 px-5 mfe-3">
                      <i class="fas fa-check-circle fa-2x"></i>
                    </div>
                    <div>
                      <div class="text-value text-success">{{ success }}</div>
                      <div class="text-muted text-uppercase font-weight-bold small">SUCCESS</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6 col-lg-3">
                <div class="card rounded shadow-sm overflow-hidden">
                  <div class="card-body p-0 d-flex align-items-center">
                    <div class="bg-warning py-4 px-5 mfe-3">
                      <i class="fas fa-exclamation-triangle fa-2x"></i>
                    </div>
                    <div>
                      <div class="text-value text-warning">{{ expired }}</div>
                      <div class="text-muted text-uppercase font-weight-bold small">EXPIRED</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6 col-lg-3">
                <div class="card rounded shadow-sm overflow-hidden">
                  <div class="card-body p-0 d-flex align-items-center">
                    <div class="bg-danger py-4 px-5 mfe-3">
                      <i class="fas fa-times-circle fa-2x"></i>
                    </div>
                    <div>
                      <div class="text-value text-danger">{{ failed }}</div>
                      <div class="text-muted text-uppercase font-weight-bold small">FAILED</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  // Import dependencies
  import Sidebar from '@/components/web/sidebar.vue';
  import { initializeApp } from 'firebase/app';
  import { getMessaging, getToken, onMessage } from "firebase/messaging";
  import { mapActions } from 'vuex';

  const firebaseConfig = {
    apiKey: "AIzaSyAQuDGUwhr692CaUN9UZAzh833LdXj-qF8",
    authDomain: "push-notification-57bbc.firebaseapp.com",
    projectId: "push-notification-57bbc",
    storageBucket: "push-notification-57bbc.appspot.com",
    messagingSenderId: "1066753359582",
    appId: "1:1066753359582:web:56de82e59dff3d0a778c4f",
    measurementId: "G-8GWNSZ1LZP"
  };

  const app = initializeApp(firebaseConfig);

  export default {
    // Middleware
    middleware: 'isCustomer',

    // Layout
    layout: 'default',

    // Register components
    components: {
      Sidebar
    },

    // Meta
    head() {
      return {
        title: 'Dashboard - Customer',
      }
    },

    async asyncData({ $axios }) {
      // Fetching dashboard data
      const dashboard = await $axios.$get('/api/customer/dashboard');

      return {
        // Count statistics
        pending: dashboard.data.count.pending,
        success: dashboard.data.count.success,
        expired: dashboard.data.count.expired,
        failed: dashboard.data.count.failed,
      }
    },

    data() {
      return {
        token: null,
        error: null
      };
    },

    mounted() {
      const messaging = getMessaging(app);
      getToken(messaging, { vapidKey: 'BBPJVv8-5e9M3CggcdRBzKk-efAkWzNOZB_S98a2DLtzheeFTz5NMob_jslEMs3PbovITc870YjqLeEkw5v1R58' }).then((currentToken) => {
        if (currentToken) {
          this.token = currentToken;
          console.log('Device token: ', currentToken);
          this.sendTokenToServer({ token: currentToken }); // Send token to the server
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        this.error = err;
      });

      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // Handle foreground messages
      });
    },

    methods: {
      ...mapActions('customer/token', ['storeToken']),

      sendTokenToServer(payload) {
        this.storeToken(payload)
          .then(response => {
            console.log('Token successfully sent to the server.');
          })
          .catch(error => {
            console.error('Error sending token to the server: ', error);
          });
      }
    }
  }
</script>

<style>

</style>
