<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-user"></i> Pelanggan</span>
              </div>
              <div class="card-body">

                <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                            <nuxt-link :to="{name: 'admin-customers-create'}" class="btn btn-warning btn-sm" style="padding-top: 10px;">
                            <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                        </div>
                    <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="cari berdasarkan nama customer">

                    <div class="input-group-append">
                      <button @click="searchData" class="btn btn-warning"><i class="fa fa-search"></i>
                        SEARCH
                      </button>
                    </div>
                  </div>
                </div>

                <b-table striped bordered hover :items="customers.data" :fields="fields" show-empty>
                  <template v-slot:cell(actions)="row">
                   <b-button :to="{name: 'admin-customers-edit-id', params: {id: row.item.id}}" variant="info" size="sm">
                      EDIT
                    </b-button>
                    <b-button variant="danger" size="sm" @click="destroyProduct(row.item.id)">DELETE</b-button>
                  </template>
                </b-table>

                <!-- pagination -->
                <b-pagination align="right" :value="customers.current_page" :total-rows="customers.total"
                  :per-page="customers.per_page" @change="changePage" aria-controls="my-table"></b-pagination>

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

    //layout
    layout: 'admin',

    //meta
    head() {
      return {
        title: 'Customers - Administrator',
      }
    },

    //data function
    data() {
      return {
        //table header
        fields: [{
            label: 'Customer Name',
            key: 'name'
          },
          {
            label: 'Email Address',
            key: 'email'
          },
          {
            label: 'Joined',
            key: 'created_at'
          },
          {
            label: 'Actions',
            key: 'actions',
            tdClass: 'text-center'
          }
        ],


        //state search
        search: ''
      }
    },

    //hook "asyncData"
    async asyncData({ store }) {
      await store.dispatch('admin/customer/getCustomersData')
    },

    //computed
    computed: {

      //customers
      customers() {
        return this.$store.state.admin.customer.customers
      },
    },

    //method
    methods: {

        //method "searchData"
        searchData() {

            //commit to mutation "SET_PAGE"
            this.$store.commit('admin/customer/SET_PAGE', 1)

            //dispatch on action "getCustomersData"
            this.$store.dispatch('admin/customer/getCustomersData', this.search)
        },

        //method "changePage"
        changePage(page) {

            //commit to mutation "SET_PAGE"
            this.$store.commit('admin/customer/SET_PAGE', page)

            //dispatch on action "getCustomersData"
            this.$store.dispatch('admin/customer/getCustomersData', this.search)
        },

    //method "destroyProduct"
    destroyProduct(id) {
          this.$swal.fire({
            title: 'APAKAH ANDA YAKIN ?',
            text: "INGIN MENGHAPUS DATA INI !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'YA, HAPUS!',
            cancelButtonText: 'TIDAK',
          }).then((result) => {
            if (result.isConfirmed) {

              //dispatch to action "deleteCategory" vuex
              this.$store.dispatch('admin/customer/destroyCustomer', id)
                .then(() => {

                  //feresh data
                  this.$nuxt.refresh()

                  //alert
                  this.$swal.fire({
                    title: 'BERHASIL!',
                    text: "Data Berhasil Dihapus!",
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                  })

                })
            }
          })
        }
    }

  }
</script>

<style>

</style>
