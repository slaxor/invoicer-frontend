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
            v-model="invoice.contractId"
            label="Contract")
      v-list-item
        v-list-item-content Amount
        v-list-item-content.align-end {{ invoice.amount }}
      v-list-item.text-left
        v-list-item-content
          v-list(dense sub-group)
            v-subheader Line Items
            v-list-item(v-for='(item, i) in lineItems' :key='i')
              LineItemForm(v-bind:lineItem="item")
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
import { mapGetters,mapState } from 'vuex';
import LineItemForm from '@/components/LineItemForm';

export default {
  name: 'InvoiceForm',
  components: { LineItemForm },
  computed: {
    ...mapState(['lineItems']),
  },
  data () {
    return {
      invoice: null,
      // lineItems: null,
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
    },
    updateDeliveredAt(e) {
      this.$store.commit('setLineItem', { deliveredAt: e.target.value });
    },
  },
};
</script>

