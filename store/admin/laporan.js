//state
export const state = () => ({

  laporans:[],

})

//mutations
export const mutations = {

//mutation "SET_LAPORAN_TRANSAKSI"
SET_LAPORAN_TRANSAKSI(state, payload) {
  state.laporans = payload
},

}

// Actions
export const actions = {
  // Get laporan transaksi
  getLaporansData({ commit }, payload) {
    // Periksa payload sebelum mengirim request
    console.log('Payload:', payload);

    // Set promise
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/api/admin/laporans`, { params: payload })
        .then(response => {
          commit('SET_LAPORAN_TRANSAKSI', response.data.data);
          resolve();
        })
        .catch(error => {
          // Tampilkan error response dari server
          console.error('Error:', error.response.data);
          reject(error);
        });
    });
  },
};


