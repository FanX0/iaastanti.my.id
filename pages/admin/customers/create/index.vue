<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-folder"></i> Tambah Pelanggan</span>
              </div>
              <div class="card-body">

                <form @submit.prevent="storeCustomer">

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>NAME</label>
                        <input type="text" v-model="customer.name" placeholder="Enter Customer Name"
                          class="form-control">
                        <div v-if="validation.name" class="mt-2">
                          <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>EMAIL</label>
                        <input type="email" v-model="customer.email" placeholder="Enter Customer Email"
                          class="form-control">
                        <div v-if="validation.email" class="mt-2">
                          <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>PASSWORD</label>
                        <input type="password" v-model="customer.password" placeholder="Enter Customer Password"
                          class="form-control">
                        <div v-if="validation.password" class="mt-2">
                          <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>CONFIRM PASSWORD</label>
                        <input type="password" v-model="customer.password_confirmation" placeholder="Confirm Customer Password"
                          class="form-control">
                      </div>
                    </div>
                  </div>

                  <button class="btn btn-info mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i>
                    SAVE</button>
                  <button class="btn btn-warning btn-reset" type="reset"><i class="fa fa-redo"></i>
                    RESET</button>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {

  // layout
  layout: 'admin',

  // meta
  head() {
    return {
      title: 'Add New Customer - Administrator',
    }
  },

  data() {
    return {
      // state customer
      customer: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      // state validation
      validation: []
    }
  },

  methods: {

    // method "storeCustomer"
    async storeCustomer() {

      // define formData
      let formData = new FormData();

      formData.append('name', this.customer.name)
      formData.append('email', this.customer.email)
      formData.append('password', this.customer.password)
      formData.append('password_confirmation', this.customer.password_confirmation)

      // sending data to action "storeCustomer" vuex
      await this.$store.dispatch('admin/customer/storeCustomer', formData)

        // success
        .then(() => {

          // sweet alert
          this.$swal.fire({
            title: 'SUCCESS!',
            text: "Customer Data Successfully Saved!",
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          })

          // redirect route "admin-customers"
          this.$router.push({
            name: 'admin-customers'
          })

        })

        // error
        .catch(error => {

          // assign error to state "validation"
          this.validation = error.response.data
        })
    }
  }

}
</script>
