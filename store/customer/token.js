//actions
export const actions = {

  //store token
  storeToken({ commit }, payload) {

      //set promise
      return new Promise((resolve, reject) => {

          //store to Rest API "/api/customer/token" with method "POST"
          this.$axios.post('/api/customer/token', payload)

          //success
          .then(response => {

              //resolve promise
              resolve(response.data)

          })

          //error
          .catch(error => {
              reject(error)
          })

      })
  },

}
