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
            <h5><i class="fa fa-shopping-cart"></i> MY SKIN</h5>
            <hr>

            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-append">
                  <nuxt-link v-if="showAddNewButton" :to="{name: 'customer-skins-create'}" class="btn btn-warning btn-sm mb-3 p-2">
                      <i class="fa fa-plus-circle"></i> ADD NEW
                    </nuxt-link>

                </div>
              </div>
            </div>

            <b-table striped bordered hover :items="skins.data" :fields="fields" show-empty>

              <template v-slot:cell(actions)="row">
                <b-button :to="{name: 'customer-skins-edit-id', params: {id: row.item.id}}" variant="info" size="sm">
                      EDIT
                    </b-button>
               </template>
            </b-table>



          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  //import sidebar
  import Sidebar from '@/components/web/sidebar.vue'

  export default {

    //middleware
    middleware: 'isCustomer',

    //layout
    layout: 'default',

    //register components
    components: {
      Sidebar
    },

    //meta
    head() {
      return {
        title: 'SkinDetails - Customer',
      }
    },

    //data function
    data() {
      return {
        //table header
        fields: [{
            label: 'Jenis Kulit',
            key: 'jenis_kulit'
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
      await store.dispatch('customer/skin/getSkinsData')
    },

    //computed
    computed: {

      //skins
      skins() {
        return this.$store.state.customer.skin.skins
      },
      showAddNewButton() {
         return this.skins.data.length <= 0;
  }
    },

    //method
    methods: {

        //method "searchData"
        searchData() {


            //dispatch on action "getSkinsData"
            this.$store.dispatch('customer/skin/getSkinsData', this.search)
        },


    }

  }
</script>

<style>

</style>
