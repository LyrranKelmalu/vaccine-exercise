<template>
  <v-card class="application_table">
    <h1>Table with orders</h1>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>  
    </v-card-title>
    <div class="cleanBtn">
      <v-btn
      :disabled="disabled"
      @click="cleanSearch()"
      depressed
      color="error"
      elevation="2"
      >Clean
      </v-btn>
    </div>
    <div v-if="!orders">
      <v-progress-circular
        class="text-center"
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>  
    <v-simple-table else dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
            </th>
            <th class="text-left">
              ID
            </th>
            <th class="text-left">
              Order Number
            </th>
            <th class="text-left">
              Responsible person
            </th>
            <th class="text-left">
              Health care district
            </th>
            <th class="text-left">
              Vaccine
            </th>
            <th class="text-left">
              Injections
            </th>
            <th class="text-left">
              Arrived
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.orderNumber"
          >
          <router-link
          :to="{ name: 'order', query: {id: order.id}}"
          >
            <v-btn
              color="primary"
              elevation="2"
              small
            >Open</v-btn>
          </router-link>  
            <td>{{ order.id }}</td>
            <td>{{ order.orderNumber }}</td>
            <td>{{ order.responsiblePerson }}</td>
            <td>{{ order.healthCareDistrict }}</td>
            <td>{{ order.vaccine }}</td>
            <td>{{ order.injections }}</td>
            <td>{{ order.arrived }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-pagination
      v-model="page"
      :length="pageCount"
      :value="page"
      :total-visible="7"
    ></v-pagination>
  </v-card>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import _ from 'lodash'

export default {
    data () {
      return {
        search: '',
        page: +this.$route.query.page || 1,
        pageSize: 15,
        pageCount: 0,
        orders: this.vaccineOrders,
        allOrders: [],
        disabled: true
      }
    },
    async mounted () {
      await this.fetchData()
      this.setupPagination(this.vaccineOrders)  
    },
    computed: {
    ...mapState(['vaccineOrders']),
    ...mapGetters(['sortByDate'])
    },
    methods: {
      ...mapActions(['fetchData']),
      setupPagination (array) {
        this.orders = array
        this.allOrders = _.chunk(this.orders, this.pageSize)
        this.pageCount = _.size(this.allOrders)
        this.orders = this.allOrders[this.page - 1] || this.allOrders[0]
      },
      currentPage () {
        this.$router.push(`${this.$route.path}?page=${this.page}`)
        this.orders = this.allOrders[this.page - 1] || this.allOrders[0]
      },
      cleanSearch () {
        this.search = ''
        this.disabled = true
      }
    },
    watch: {
      page: function () {
        this.currentPage()
      },
      search: function() {
        if (!this.search.length) {
          this.setupPagination(this.vaccineOrders)
        } else {
          const arr = this.sortByDate(this.search)
          this.setupPagination(arr)
          this.disabled = false
        }
      }
    }
}
</script>

<style>
.v-pagination__item--active {
    color: #fff;
    background-color: #1867c0 !important;
    border-color: #1867c0 !important;
}
.cleanBtn{
  padding-left: 16px;
  text-align: left;
}
</style>