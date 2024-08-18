//state
export const state = () => ({

  //skins
  skins: [],

  //skin
  skin: {}

})

//mutations
export const mutations = {

  //mutation "SET_SKINS_DATA"
  SET_SKINS_DATA(state, payload) {

      //set value state "skins"
      state.skins = payload
  },



   //mutation "SET_SKIN_DATA"
   SET_SKIN_DATA(state, payload) {

    //set value state "skin"
    state.skin = payload
},

}

//actions
export const actions = {

  //get skins data
  getSkinsData({ commit, state }, payload) {


      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/customer/invoices" with method "GET"
          this.$axios.get(`/api/customer/skinDetail`)

          //success
          .then((response) => {

              //commit ti mutation "SET_SKINS_DATA"
              commit('SET_SKINS_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },
  storeSkin({ dispatch, commit }, payload) {

    //set promise
    return new Promise((resolve, reject) => {

        //store to Rest API "/api/customer/skinDetail" with method "POST"
        this.$axios.post('/api/customer/skinDetail', payload)

        //success
        .then(() => {

            //dispatch action "getSkinsData"
            dispatch('getSkinsData')

            //resolve promise
            resolve()

        })

      //error
      .catch(error => {
          reject(error)
      })

  })
},

 //get detail skin
 getDetailSkin({ commit }, payload) {

  //set promise
  return new Promise((resolve, reject) => {

      //get to Rest API "/api/customer/skinDetail/:id" with method "GET"
      this.$axios.get(`/api/customer/skinDetail/${payload}`)

      //success
      .then(response => {

          //commit to mutation "SET_SKIN_DATA"
          commit('SET_SKIN_DATA', response.data.data)

          //resolve promise
          resolve()

      })

  })

},

//update product
updateSkin({ dispatch, commit }, { skinId, payload }) {

  //set promise
  return new Promise((resolve, reject) => {

      //store to Rest API "/api/admin/skinDetail/:id" with method "POST"
      this.$axios.post(`/api/customer/skinDetail/${skinId}`, payload)

      //success
      .then(() => {

          //dispatch action "getSkinsData"
          dispatch('getSkinsData')

          //resolve promise
          resolve()

      })

      //error
      .catch(error => {
          reject(error)
      })

  })
},




}
