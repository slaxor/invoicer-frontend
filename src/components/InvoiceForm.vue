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
              // LineItemForm(v-bind:lineItem="item")

              v-container.elevation-12(fluid)
                p {{ item.description }}
                v-form
                  v-list(dense)
                    v-list-item
                      v-list-item-content
                        v-menu(
                          v-model="item.pickerOverlay"
                          close-on-content-click
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px")

                          template(v-slot:activator="{ on }")
                            v-text-field(
                              readonly
                              v-on="on"
                              :value="item.deliveredAt"

                            )

                          v-date-picker(
                            label="Delivered At"
                            prepend-icon="event"
                            no-title
                            v-model="item.deliveredAt"
                          )
                    v-list-item
                      v-list-item-content
                        v-text-field(label="Price" v-model="item.price")
                      v-list-item-content
                        v-text-field(label="VAT Rate" v-model="item.vatRate")
                      v-list-item-content %
                    v-list-item
                      v-list-item-content
                        v-text-field(label="Quantity" v-model="item.quantity")
                      v-list-item-content
                        v-text-field(label="Unit" v-model="item.unit")
                    v-list-item
                      v-list-item-content.align-end
                        v-text-field(label="Description" v-model="item.description")


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
// import { mapGetters,mapState } from 'vuex';
import { mapGetters } from 'vuex';
import LineItemForm from '@/components/LineItemForm';
import { mapMultiRowFields } from 'vuex-map-fields';

export default {
  name: 'InvoiceForm',
  components: { LineItemForm },
  computed: {
    ...mapMultiRowFields(['lineItems']),
    // ...mapState(['lineItems']),
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

