<template>
  <ul class="c-sidebar-nav sidebarku">
    <button class="c-header-toggler c-class-toggler d-lg-none ml-auto" type="button" data-target="#sidebar"
      data-class="c-sidebar-show">
      <svg class="c-icon c-icon-lg">
        <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-menu"></use>
      </svg>
    </button>
    <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-dashboard'}" class="c-sidebar-nav-link black-text " href="index.html">
        <svg class="c-sidebar-nav-icon ">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-speedometer" class="black-text"></use>
        </svg> Dashboard</nuxt-link></li>

    <li class="c-sidebar-nav-title black-text">MASTER DATA</li>

    <li class="c-sidebar-nav-item"><nuxt-link :to="{name: 'admin-categories'}" class="c-sidebar-nav-link black-text">
   <svg class="c-sidebar-nav-icon">
     <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-folder"  class="black-text"></use>
   </svg> Kategori</nuxt-link>
    </li>

    <li class="c-sidebar-nav-item"> <nuxt-link :to="{name: 'admin-products'}"  class="c-sidebar-nav-link black-text">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-layers"  class="black-text"></use>
        </svg> Produk</nuxt-link>
    </li>

    <li class="c-sidebar-nav-title black-text black-text">Transaksi</li>

    <li class="c-sidebar-nav-item"> <nuxt-link :to="{name: 'admin-invoices'}" class="c-sidebar-nav-link black-text">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-cart"  class="black-text"></use>
        </svg> Invoice </nuxt-link>
    </li>
    <li class="c-sidebar-nav-item"> <nuxt-link :to="{name: 'admin-laporans'}" class="c-sidebar-nav-link black-text">
        <svg class="c-sidebar-nav-icon">
          <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-cart"  class="black-text"></use>
        </svg> Laporan Transaksi </nuxt-link>
    </li>

    <li class="c-sidebar-nav-title black-text">OTHERS</li>

    <li class="c-sidebar-nav-item">
    <nuxt-link :to="{name: 'admin-customers'}" class="c-sidebar-nav-link black-text">
        <svg class="c-sidebar-nav-icon">
            <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-user"  class="black-text"></use>
        </svg> Pelanggan
    </nuxt-link>
</li>

<li class="c-sidebar-nav-item">
    <nuxt-link :to="{name: 'admin-sliders'}" class="c-sidebar-nav-link black-text">
        <svg class="c-sidebar-nav-icon">
            <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-laptop" class="black-text"></use>
        </svg> Slider
    </nuxt-link>
</li>

<li class="c-sidebar-nav-item">
    <nuxt-link :to="{name: 'admin-users'}" class="c-sidebar-nav-link black-text">
        <svg class="c-sidebar-nav-icon">
            <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-group"  class="black-text"></use>
        </svg> Admin
    </nuxt-link>
</li>

    <li class="c-sidebar-nav-divider"></li>
  </ul>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  a.nuxt-link-active {
    background: rgba(255,255,255,.05)!important;
  }
  .black-text {
  color: black;
  fill: black;
  }

</style>
