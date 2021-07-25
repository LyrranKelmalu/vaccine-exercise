import 'jsdom-global/register'
import Vuex from 'vuex'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import main_table from '../../src/components/tables/main_table.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()

Vue.config.ignoredElements = [
  'v-icon', 'v-card', 'v-card-text', 'v-pagination', 'v-simple-table',
  'v-progress-circular', 'v-btn', 'v-text-field', 'v-card-title'
]


describe('main_table.vue', () => {
  let actions
  let store
  let methods

  beforeEach(() => {
    actions = {
      fetchData: jest.fn()
    }

    methods = {
      setupPagination: jest.fn()
    }

    store = new Vuex.Store({
      actions
    })
  })

  it('check that component is mounted', () => {
    const wrapper = shallowMount(main_table, { store, router, localVue })
    expect(wrapper.is(main_table)).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(main_table, { store, router, localVue })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('dispatches "fetchData" when page is mounted', () => {
    const wrapper = shallowMount(main_table, { store, router, localVue })
    expect(actions.fetchData).toHaveBeenCalled()
  })

  it('setupPagination method is called when page is mounted', () => {
    const wrapper = shallowMount(main_table, { store, methods, router, localVue })
    expect(methods.setupPagination).toHaveBeenCalled()
  })
})