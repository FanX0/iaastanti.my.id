// state
export const state = () => ({

  // customers
  customers: [],

  // page
  page: 1,

  // customer
  customer: {}

})

// mutations
export const mutations = {

  // mutation "SET_CUSTOMERS_DATA"
  SET_CUSTOMERS_DATA(state, payload) {
    // set value state "customers"
    state.customers = payload
  },

  // mutation "SET_PAGE"
  SET_PAGE(state, payload) {
    // set value state "page"
    state.page = payload
  },

  // mutation "SET_CUSTOMER_DATA"
  SET_CUSTOMER_DATA(state, payload) {
    // set value state "customer"
    state.customer = payload
  },
}

// actions
export const actions = {

  // get customers data
  getCustomersData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/admin/customers" with method "GET"
      this.$axios.get(`/api/admin/customers?q=${search}&page=${state.page}`)

        // success
        .then((response) => {

          // commit to mutation "SET_CUSTOMERS_DATA"
          commit('SET_CUSTOMERS_DATA', response.data.data)

          // resolve promise
          resolve()
        })

        // error
        .catch(error => {
          reject(error)
        })

    })

  },

  // store customer
  storeCustomer({ dispatch, commit }, payload) {

    // set promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/admin/customers" with method "POST"
      this.$axios.post('/api/admin/customers', payload)

        // success
        .then(() => {

          // dispatch action "getCustomersData"
          dispatch('getCustomersData')

          // resolve promise
          resolve()

        })

        // error
        .catch(error => {
          reject(error)
        })

    })
  },

  // get detail customer
  getDetailCustomer({ commit }, payload) {

    // set promise
    return new Promise((resolve, reject) => {

      // get to Rest API "/api/admin/customers/:id" with method "GET"
      this.$axios.get(`/api/admin/customers/${payload}`)

        // success
        .then(response => {

          // commit to mutation "SET_CUSTOMER_DATA"
          commit('SET_CUSTOMER_DATA', response.data.data)

          // resolve promise
          resolve()

        })

        // error
        .catch(error => {
          reject(error)
        })

    })

  },

  // update customer
  updateCustomer({ dispatch, commit }, { customerId, payload }) {

    // set promise
    return new Promise((resolve, reject) => {

      // update to Rest API "/api/admin/customers/:id" with method "PUT"
      this.$axios.post(`/api/admin/customers/${customerId}`, payload)

        // success
        .then(() => {

          // dispatch action "getCustomersData"
          dispatch('getCustomersData')

          // resolve promise
          resolve()

        })

        // error
        .catch(error => {
          reject(error)
        })

    })
  },

  // destroy customer
  destroyCustomer({ dispatch, commit }, payload) {

    // set promise
    return new Promise((resolve, reject) => {

      // delete to Rest API "/api/admin/customers/:id" with method "DELETE"
      this.$axios.delete(`/api/admin/customers/${payload}`)

        // success
        .then(() => {

          // dispatch action "getCustomersData"
          dispatch('getCustomersData')

          // resolve promise
          resolve()

        })

        // error
        .catch(error => {
          reject(error)
        })

    })

  },

}
