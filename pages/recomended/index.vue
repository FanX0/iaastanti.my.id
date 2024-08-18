<template>
  <div class="container mt-custom">
    <div class="fade-in">
      <h3>Rekomendasi Produk Berdasarkan Pelanggan</h3>
      <hr>
    <div class="row" v-if="recomended_products.length > 0">
      <!-- jika data recomendeds ada, maka tampilkan -->
              <div class="col-md-3 mt-1 mb-4" v-for="recomended_product in recomended_products" :key="recomended_product.id">
                <div class="card h-100 border-0 rounded ">

                  <div class="card-body">
                    <div class="card-img-actions">
                      <img :src="recomended_product.product.image" class="card-img img-fluid">
                    </div>
                  </div>

                  <div class="card-body bg-light-custom rounded-bottom">
                  <div class="mb-2">
                    <h3 class="font-weight-semibold mb-2">
                      <nuxt-link :to="{name: 'products-slug', params: {slug: recomended_product.product.slug}}" class="text-default mb-2" data-abc="true">{{ recomended_product.product.title }}</nuxt-link>
                    </h3>
                    <nuxt-link :to="{name: 'categories-slug', params: {slug: recomended_product.product.category.slug}}" class="text-muted" data-abc="true">{{ recomended_product.product.category.name }}</nuxt-link>
                  </div>
                  <h6 class="mb-0 font-weight-semibold"><s class="text-red">Rp. {{ formatPrice(recomended_product.product.price) }}</s> / <strong>{{ recomended_product.product.discount }} %</strong></h6>
                  <h5 class="mb-0 font-weight-semibold mt-3 text-success">Rp. {{ formatPrice(calculateDiscount(recomended_product.product)) }}</h5>
                  </div>
              </div>
              </div>
        </div>
    <div class="row justify-content-center" v-else>
      <!-- data carts tidak tersedia -->
      <div class="col-md-10">
        <div class="card border-0 rounded border-top-orange shadow-sm">
          <div class="card-body">
            <div class="col-sm-12 empty-cart-cls text-center">
              <img src="/images/Normal.png" width="150" height="150" class="img-fluid mb-4 mr-3">
              <h3><strong>Silahnkan Memasukan Jenis kulit terlebih dahulu :)</strong></h3>
              <nuxt-link :to="{name: 'customer-skins-create'}" class="btn btn-warning btn-lg mt-4" data-abc="true">Klik disini
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {

    //middleware
    middleware: 'isCustomer',

    //meta
    head() {
      return {
        title: 'Rekomendasi Produk - Iaastanti Glowscare',
        meta: [{
            hid: 'og:title',
            name: 'og:title',
            content: 'Rekomendasi Produk - Iaastanti Glowscare'
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Rekomendasi Produk - Iaastanti Glowscare'
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: '/images/Normal.png'
          },
          {
            hid: 'description',
            name: 'description',
            content: 'Rekomendasi Produk - Iaastanti Glowscare'
          },
        ]
      }
    },

    //hook asyncData
    async asyncData({ store }) {

      //call action vuex "getRecomendedsData"
      await store.dispatch('web/recomended/getRecomendedsData')
    },

    //computed
    computed: {

      //recomended_products data
      recomended_products() {
        return this.$store.state.web.recomended.recomended_products
      },

    }

  }
</script>

<style scoped>
  .table-cart {
    border-style: solid !important;
    border-color: rgb(198, 206, 214) !important;
  }

  .table-font {
    font-size: 14px;
  }

  .container {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 150px;
}
</style>
