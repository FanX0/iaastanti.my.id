<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 cardku rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-folder"></i>Tambah Jenis Kulit</span>
              </div>
              <div class="card-body">
                <form @submit.prevent="storeSkin">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Silahkan memilih jenis kulit</label>
                        <div class="skin-selection">
                          <div
                            v-for="option in skinOptions"
                            :key="option.value"
                            class="skin-option"
                            @click="selectSkin(option.value)"
                            :class="{ selected: skin.jenis_kulit === option.value }"
                          >
                            <img
                              :src="option.image"
                              :alt="option.label"
                            >
                            <p>{{ option.label }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-info mr-1 btn-submit" type="submit">
                    <i class="fa fa-paper-plane"></i> SAVE
                  </button>
                  <button class="btn btn-warning btn-reset" type="reset">
                    <i class="fa fa-redo"></i> RESET
                  </button>
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
  middleware: 'isCustomer',
  layout: 'default',
  head() {
    return {
      title: 'Add New Skin - Customer',
    }
  },
  data() {
    return {
      skin: {
        'jenis_kulit': '',
      },
      validation: [],
      skinOptions: [
        { value: 'berminyak', label: 'Berminyak', image: '/images/Berminyak.png' },
        { value: 'kering', label: 'Kering', image: '/images/Kering.png' },
        { value: 'normal', label: 'Normal', image: '/images/Normal.png' },
        { value: 'berflek', label: 'Berflek', image: '/images/Berflek.png' },
        { value: 'bumil', label: 'Ibu Hamil / Menyusui', image: '/images/Bumil.png' },
        { value: 'berjerawat', label: 'Berjerawat ', image: '/images/Berjerawat.png' },
      ]
    }
  },
  methods: {
    selectSkin(type) {
      this.skin.jenis_kulit = type;
    },
    async storeSkin() {c
      let formData = new FormData();
      formData.append('jenis_kulit', this.skin.jenis_kulit);
      await this.$store.dispatch('customer/skin/storeSkin', formData)
      .then(() => {
        this.$swal.fire({
          title: 'BERHASIL!',
          text: "Data Berhasil Disimpan!",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
        this.$router.push({
          name: 'customer-skins'
        })
      })
      .catch(error => {
        this.validation = error.response.data
      })
    }
  }
}
</script>

<style>
.cardku {
  margin-top: 120px;
}

.skin-selection {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.skin-option {
  flex: 0 0 30%;
  cursor: pointer;
  text-align: center;
  margin: 10px;
  border: 2px solid transparent;
  padding: 5px;
  transition: border 0.3s ease;
  border-radius: 10%;
}

.skin-option:hover {
  border: 2px solid lightgray;
}

.skin-option.selected {
  border: 2px solid black;
  border-radius: 10%;
}

.skin-option img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.skin-option p {
  margin-top: 5px;
  font-weight: bold;
}
</style>
