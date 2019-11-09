<template lang="pug">
v-container.elevation-12(fluid)
  v-form
    v-list(dense)
      v-list-item
        v-list-item-content
          v-menu(
            v-model="pickerOverlay"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px")

            template(v-slot:activator="{ on }")
              v-text-field(
                readonly
                v-on="on"
                :value="date"
                @change="updateLineItem('deliveredAt', $event)"
              )

            v-date-picker(
              label="Delivered At"
              prepend-icon="event"
              no-title
              v-model="date"
              @input="pickerOverlay = false"
            )
      v-list-item
        v-list-item-content
          v-text-field(label="Price" :value="lineItem.price" @input="updateLineItem('price', $event)")
        v-list-item-content
          v-text-field(label="VAT Rate" :value="lineItem.vatRate" @input="updateLineItem('vatRate', $event)")
        v-list-item-content %
      v-list-item
        v-list-item-content
          v-text-field(label="Quantity" :value="lineItem.quantity" @input="updateLineItem('quatity', $event)")
        v-list-item-content
          v-text-field(label="Unit" :value="lineItem.unit" @input="updateLineItem('unit', $event)")
      v-list-item
        v-list-item-content.align-end
          v-text-field(label="Description" :value="lineItem.description" @input="updateLineItem('description', $event)")
</template>

<script>

export default {
  name: 'LineItemForm',
  props: {
    lineItem: Object
  },
  data () {
    return {
      openPicker: false,
      date: this.lineItem.deliveredAt,
      pickerOverlay: false
    };
  },
  methods: {
    updateLineItem(fieldKey, value) {
      const nextLineItem = { [fieldKey]: value, id: this.lineItem.id };
      this.$store.commit('updateLineItem', nextLineItem);
    }
  }
};
</script>
