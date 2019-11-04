<template lang="pug">
v-container.elevation-12(fluid)
  v-form
    v-list(dense)
      v-list-item
        v-list-item-content
          v-text-field(label="Delivered At" v-model="formattedDeliveredAt")
      v-list-item
        v-list-item-content
          v-text-field(label="Price" v-model="lineItem.price")
        v-list-item-content
          v-text-field(label="VAT Rate" v-model="lineItem.vatRate")
        v-list-item-content %
      v-list-item
        v-list-item-content
          v-text-field(label="Quantity" v-model="lineItem.quantity")
        v-list-item-content
          v-text-field(label="Unit" v-model="lineItem.unit")
      v-list-item
        v-list-item-content.align-end
          v-text-field(label="Description" v-model="lineItem.description")
</template>

<script>

import moment from 'moment';
export default {
  name: 'LineItemForm',
  props: {
    lineItem: Object
  },
  computed: {
    formattedDeliveredAt: {
      get () {
        let fda = this.lineItem.deliveredAt;
        return  moment(fda).format('DD.MM.YY');
      },
      set (fda) {
        this.lineItem.deliveredAt = moment(fda).format();
      },
    },
  },
};
</script>
