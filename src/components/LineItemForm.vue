<template lang="pug">
v-container.elevation-12(fluid)
  v-form
    v-list(dense)
      v-list-item
        v-list-item-content
          v-date-picker(
            v-if="openPicker"
            label="Delivered At"
            no-title
            v-model="lineItem.deliveredAt"
            :date-format="date => new Date(date).toDateString()"
          )
          v-text-field(v-model="lineItem.deliveredAt" @click="openPicker = !openPicker")
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

export default {
  name: 'LineItemForm',
  props: {
    lineItem: Object,
    openPicker: Boolean,
  },
};
</script>
