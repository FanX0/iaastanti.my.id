<template>
  <div class="signup-container">
    <div class="form-container">
      <div class="image-section">
        <img src="/images/ias.png" alt="logo">
      </div>
      <div class="form-content">
        <div class="form-section">
          <h1>Login</h1>
          <form @submit.prevent="login">
            <div class="input-group">
              <input class="form-control" v-model="user.email" :class="{ 'is-invalid': validation.email }" type="email" placeholder="Email Address">
            </div>
            <div v-if="validation.email" class="mt-2">
              <b-alert show variant="danger">{{ validation.email }}</b-alert>
            </div>
            <div class="input-group">
              <input class="form-control" v-model="user.password" :class="{ 'is-invalid': validation.password }" type="password" placeholder="Password">
            </div>
            <div v-if="validation.password" class="mt-2">
              <b-alert show variant="danger">{{ validation.password }}</b-alert>
            </div>
            <button class="btn" type="submit">Log in</button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    //middleware
    middleware: 'authenticated',

    //layout
    layout: 'auth',

    //meta
    head() {
      return {
        title: 'Login - Administrator',
      }
    },

    data() {
      return {
        //state user
        user: {
          email: '',
          password: '',
        },
        //validation
        validation: []
      }
    },
  methods: {
      async login() {

        await this.$auth.loginWith('admin', {
            data: {
              email: this.user.email,
              password: this.user.password
            }
          })

          .then(() => {

            //redirect
            this.$router.push({
              name: 'admin-dashboard'
            })

          })

          .catch(error => {
            //assign validation
            this.validation = error.response.data
          })
      }

    }

  }
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  width: 100%;
  max-width: 1000px; /* Increased max-width to accommodate the image */
  background: #fff;
  padding: 40px; /* Adjusted padding for better layout */
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.form-content {
  display: flex; /* Use flexbox to place form and image side by side */
}

.form-section {
  flex: 1;
  padding-right: 40px; /* Adjusted padding */
}

.image-section {
  flex: 1; /* Allow image section to take up remaining space */
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-section img {
  max-width: 50%;
  border-radius: 10px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.input-group {
  margin-bottom: 15px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.checkbox {
  display: flex;
  align-items: center;
}

.checkbox input {
  margin-right: 10px;
}

.btn {
  display: inline-block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  margin-top: 20px;
}

p a {
  color: #007bff;
}

p a:hover {
  text-decoration: underline;
}
</style>
