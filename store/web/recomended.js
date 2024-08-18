//state
export const state = () => ({

  //recomended_products
  recomended_products: [],


})

//mutations
export const mutations = {

  //mutation "SET_RECOMENDEDS_DATA"
  SET_RECOMENDEDS_DATA(state, payload) {

      //set value state "recomended_products"
      state.recomended_products = payload
  },

}

//actions
export const actions = {

  //get carts data
  getRecomendedsData({ dispatch, commit }) {

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/web/recommendedProduct" with method "GET"
          this.$axios.get('/api/web/recommendedProduct')

          //success
          .then((response) => {

              //commit ti mutation "SET_RECOMENDEDS_DATA"
              commit('SET_RECOMENDEDS_DATA', response.data.data)


              //resolve promise
              resolve()
          })

      })

  },


}
