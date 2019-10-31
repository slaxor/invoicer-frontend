<template lang="pug">
v-container
  v-layout(v-if="invoice" text-center wrap)
    h2 Invoice {{ invoice.number }}
    v-list(dense)
      v-list-item
        v-list-item-content Contract
        v-list-item-content.align-end
          v-select(
            :items="contracts()"
            item-text="name"
            item-value="id"
            v-model="invoice.contract_id"
            label="Contract")
      v-list-item
        v-list-item-content Amount
        v-list-item-content.align-end {{ invoice.amount }}
      v-list-item.text-left
        v-list-item-content
          v-list(dense sub-group)
            v-subheader Line Items
            v-list-item-group(v-model='item' color='primary')
              v-list-item(v-for='(item, i) in lineItems' :key='i')
                v-list-item-content(v-html='item.delivered_at')
                v-list-item-content(v-html='item.description')

    // h5 Line Items
    // v-simple-table(dense)
    //   thead
    //     tr
    //       th.text-left delivered_at
    //       th.text-left price
    //       th.text-left quantity
    //       th.text-left unit
    //       th.text-left description
    //       th.text-left vat_rate
    //   tbody
    //     tr
    //     tr(v-for='item in lineItems' :key='item.id')
    //       td.text-left {{ item.delivered_at }}
    //       td.text-left {{ item.price }}
    //       td.text-left {{ item.quantity }}
    //       td.text-left {{ item.unit }}
    //       td.text-left {{ item.description }}
    //       td.text-left {{ item.vat_rate }}
    //       td
    //         v-btn(
    //           color="pink"
    //           dark
    //           absolute
    //           size="x-small"
    //           bottom
    //           right
    //           fab
    //           @click="$router.push({path: '/invoice-form/new'})"
    //         )
    //           v-icon mdi-plus


  v-fab-transition
    v-btn(
      color="pink"
      dark
      fixed
      bottom
      right
      fab
      @click="$router.push({path: '/invoices'})"
    )
      v-icon mdi-content-save
</template>

<script>
import { mapGetters } from 'vuex';
import LineItemForm from '@/components/LineItemForm';
export default {
  name: 'InvoiceForm',
  components: { LineItemForm },
  data () {
    return {
      invoice: null,
      lineItems: null,
    };
  },
  created () {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    ...mapGetters(['invoiceByNumber', 'lineItemsByInvoiceId', 'contracts', 'errors']),
    fetchData () {
      this.invoice = this.invoiceByNumber()(this.$route.params.number);
      this.lineItems = this.lineItemsByInvoiceId()(this.invoice.id);
    },
  },
};
</script>

