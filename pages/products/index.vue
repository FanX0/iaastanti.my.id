<template>
  <div class="container mt-custom">
    <div class="fade-in">
      <div class="row">

        <div class="col-md-3 mt-1 mb-4" v-for="product in products.data" :key="product.id">
          <div class="card card-border  h-100 border-0 border-rounded ">
            <div class="card-body">
              <div class="card-img-actions">
                <img :src="product.image" class="card-img img-fluid">
                </div>
            </div>
            <div class="card-body bg-light-custom rounded-bottom">
              <div class="mb-2">
                <h3 class="font-weight-bold mb-2">
                  <nuxt-link :to="{name: 'products-slug', params: {slug: product.slug}}" class="text-default mb-2" data-abc="true">{{ product.title }}</nuxt-link>
                </h3>
                <nuxt-link :to="{name: 'categories-slug', params: {slug: product.category.slug}}" class="text-muted" data-abc="true">{{ product.category.name }}</nuxt-link>
              </div>
              <h6 class="mb-0 font-weight-semibold"><s class="text-red">Rp. {{ formatPrice(product.price) }}</s> / <strong>{{ product.discount }} %</strong></h6>
              <h5 class="mb-0 font-weight-semibold mt-3 text-success">Rp. {{ formatPrice(calculateDiscount(product)) }}</h5>
              <hr>
                <client-only>
                  <vue-star-rating :rating="parseFloat(product.reviews_avg_rating)" :increment="0.5" :star-size="20" :read-only="true" :show-rating="false" :inline="true"></vue-star-rating>
                  (<strong>{{ product.reviews_count }}</strong> ulasan)
                </client-only>
            </div>
          </div>
        </div>

      </div>

        <!-- pagination -->
        <div class="row justify-content-center mt-4 mb-4">
          <div class="text-center">
              <b-pagination align="center" :value="products.current_page" :total-rows="products.total"
                  :per-page="products.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {

    //meta
    head() {
      return {
        title: 'IAASTANTI GLOWSCARE',
        meta: [{
            hid: 'og:title',
            name: 'og:title',
            content: 'Semua Produk - IAASTANTI GLOWSCARE'
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'Semua Produk -IAASTANTI GLOWSCARE'
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: '/images/logo.png'
          },
          {
            hid: 'description',
            name: 'description',
            content: 'Semua Produk dari IAASTANTI GLOWSCARE'
          },
        ]
      }
    },

    //hook "asyncData"
    async asyncData({ store }) {
        await store.dispatch('web/product/getProductsData')
    },

    //computed
    computed: {

        //products
        products() {
            return this.$store.state.web.product.products
        },
    },
     //method
     methods: {

    //method "changePage"
    changePage(page) {

      //commit to mutation "SET_PAGE"
      this.$store.commit('web/product/SET_PAGE', page)

      //dispatch on action "getProductsData"
      this.$store.dispatch('web/product/getProductsData')
    },
  }
}
</script>

<style>
.container {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 150px;
}

</style>
