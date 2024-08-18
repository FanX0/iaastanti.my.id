<template>
  <div id="app">

    <section class="about-section">
      <div class="container">
        <h1 class="section-title">About Us</h1>
        <p class="section-description">
          Iaastanti Glowscare didirikan oleh Ria Risti Astanti sejak tahun 2018
        </p>
        <p class="section-description">
          Iaastanti Glowscare fokus pada perawatan kulit dengan menyediakan berbagai produk kesehatan dan kecantikan kulit serta sangat aman karena telah teruji BPOM
        </p>
        <div class="products-services">
          <h2 class="section-subtitle">Our Category</h2>
          <div class="product-list" v-for="category in categories" :key="category.id">

            <nuxt-link :to="{name: 'categories-slug', params: {slug: category.slug}}">
              {{ category.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        { id: 1, name: "Ria Risti Astanti", role: "Founder", photo: "https://via.placeholder.com/150" },
      ]
    };
  },

   //hook "asyncData"
   async asyncData({ store }) {
      await store.dispatch('web/category/getCategoriesData')
    },

    //computed
    computed: {

      //categories
      categories() {
        return this.$store.state.web.category.categories
      },
    },

};
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
  background: #f4f4f9;
  color: #333;
  margin: 0;
  padding: 0;
}

.header-main {
  padding: 10px 0;
  background-color: #171405;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;
  text-align: center;
}

.logo {
  font-size: 25px;
  font-weight: 700;
}

.about-section {

  padding: 60px 0;
  background: #fff;
  text-align: center;
}

.section-title {
  font-size: 36px;
  margin-bottom: 20px;
}

.section-description {
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto 20px;
  color: #555;
}

.products-services {
  margin: 40px 0;
}

.section-subtitle {
  font-size: 28px;
  margin-bottom: 15px;
}

.product-list,
.service-list {
  list-style-type: none;
  padding: 0;
  font-size: 18px;
  color: #444;
}

.product-list li,
.service-list li {
  margin-bottom: 10px;
}

.mission-vision {
  margin-top: 40px;
}



.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
