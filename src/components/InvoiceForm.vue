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
      v-divider.invoice-list-item-divider(dark)
      v-list-item.invoice-line-items
        v-dialog(v-model="itemDialog" max-width="500px")
          LineItemForm(
            :lineItem="selectedItem"
            @cancel="itemDialogClose"
            @save="handleSaveLineItem"
          )

        v-list-item-content
          v-btn(
            color="pink"
            dark
            small
            absolute
            top
            right
            fab
            @click="createItem"
          )
            v-icon mdi-plus
          v-data-table(
            :headers="headers"
            caption="Line Items"
            :items="lineItems"
            itemKey="id"
            disable-sort
            disable-pagination
            hide-default-footer
            class="elevation-1 line-items-table"
          )
            template( v-slot:item.vatRate="{ item }") {{ item.vatRate }}%
            template( v-slot:item.deliveredAt="{ item }") {{ item.deliveredAt | formateDate }}
            template( v-slot:item.price="{ item }") {{ item.price | formatePrice }}€
            template(v-slot:item.action="{ item }")
              v-icon(
                small
                class="mr-2"
                @click="editItem(item)") {{ icons.mdiPencil }}

              v-icon(
                small
                @click="deleteItem(item)") {{ icons.mdiDelete }}

            </template>

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
import {
  mdiPencil,
  mdiDelete
} from '@mdi/js';

export default {
  name: 'InvoiceForm',
  components: { LineItemForm },
  computed: {
    lineItems () {
      const { $store, invoice } = this;
      return $store.getters['lineItemsByInvoiceId'](invoice.id);
    }
  },
  data () {
    return {
      invoice: null,
      itemDialog: false,
      icons: {
        mdiPencil,
        mdiDelete
      },
      selectedItem: null,
      headers: [
        { text: 'Delivered At', value: 'deliveredAt' },
        { text: 'Description', value: 'description' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Unit', value: 'unit' },
        { text: 'VAT Rate', value: 'vatRate' },
        { text: 'Price', value: 'price' },
        { text: 'Actions', value: 'action' },
      ]
    };
  },
  created () {
    this.fetchData();
  },
  watch: {
    itemDialog (val) {
      val || this.itemDialogClose();
    },
    '$route': 'fetchData'
  },
  filters: {
    formatePrice (value) {
      const val = (value/1).toFixed(2).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  },
  methods: {
    ...mapGetters(['invoiceByNumber', 'contracts', 'errors']),
    fetchData () {
      this.invoice = this.invoiceByNumber()(this.$route.params.number);
    },
    itemDialogClose () {
      if (!this.itemDialog) { return; }
      this.itemDialog = false;
      setTimeout(() => { // timeout is needed because flicker-effect on close animation -> TODO: find better solution
        this.selectedItem = null;
      }, 200);

    },
    editItem (item) {
      this.selectedItem = item;
      this.itemDialog = true;
    },
    deleteItem (item) {
      this.$store.commit('deleteLineItem', item);
    },
    createItem() {
      this.selectedItem = null;
      this.itemDialog = true;
    },
    handleSaveLineItem (item) {
      const commitType = item.id ? 'updateLineItem' : 'createLineItem';
      this.$store.commit(commitType, { item, invoiceId: this.invoice.id });
      this.itemDialogClose();
    }
  },
};
</script>
<style lang="scss">
.line-items-table {
  caption {
    text-align: left;
  }
}
.invoice-line-items {
  padding-top: 12px;
}
.invoice-list-item-divider {
  margin-top: 24px;
}
</style>
