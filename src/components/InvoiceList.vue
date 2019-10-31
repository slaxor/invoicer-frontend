<template lang="pug">
v-container(fluid)
  v-overlay(v-if="loading")
    v-progress-circular(indeterminate size="64")
  v-data-iterator(
      :items="filledInvoices()"
      :items-per-page.sync="itemsPerPage"
      :footer-props="{ itemsPerPageOptions }"
  )
    template(v-slot:default="props")
      v-row
        v-col(v-for='item in props.items' :key='item.number' cols='12' sm='6' md='4' lg='3')
          v-card
            v-card-title
              h4 {{ item.number }}
              v-btn(
                absolute
                dark
                fab
                top
                right
                x-small
                color="primary"
                @click="$router.push({path: '/invoice-form/' + item.number,})"
              )
                v-icon mdi-pencil
            v-divider
            v-list(dense)
              v-list-item
                v-list-item-content.align-top
                  | Customer
                v-list-item-content.align-end
                  | {{item.name }}#[br]
                  span(v-if="item.contract.customer.co_line")
                    | - {{ item.contract.customer.co_line }} -#[br]
                  | {{ item.contract.customer.street }}#[br]
                  | {{ item.contract.customer.post_code }} {{ item.contract.customer.city }}#[br]
                  | {{ item.contract.customer.country }}#[br]
                  | {{ item.contract.customer.email }}#[br]
                  | {{ item.contract.customer.telephone }}#[br]
              v-list-item
                v-list-item-content Issuer
                v-list-item-content.align-end {{ item.contract.issuer.name }}
              v-list-item
                v-list-item-content Amount
                v-list-item-content.align-end {{ item.amount }}
              v-list-item
                v-list-item-content
                v-list-item-content.align-end {{ item.status }}
              v-list-item
                v-list-item-content Due At
                v-list-item-content.align-end {{ item.dueAt }}
  v-fab-transition
    v-btn(
      color="pink"
      dark
      fixed
      bottom
      right
      fab
      @click="$router.push({path: '/invoice-form/new', params: { },})"
    )
      v-icon mdi-plus
</template>

<script>
import InvoiceForm from '@/components/InvoiceForm';
import { mapGetters } from 'vuex';

export default {
  name: 'InvoiceList',
  components: {
    InvoiceForm,
  },
  data: () => ({
    loading: false,
    itemsPerPageOptions: [10, 100, 1000],
    itemsPerPage: 10,
  }),
  methods: {
    ...mapGetters([ 'filledInvoices' ]),
  }
};
</script>
