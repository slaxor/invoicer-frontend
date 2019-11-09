<template lang="pug">
v-container.elevation-12(fluid)
  v-form
    v-card
      v-card-title
        span.headline Line Item Form {{ item.id }}  - {{ id }}

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
                  :value="item.deliveredAt"

                )

              v-date-picker(
                label="Delivered At"
                prepend-icon="event"
                no-title
                v-model="item.deliveredAt"
                @input="pickerOverlay = false"
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
      v-card-actions
        v-spacer
        v-btn(color="blue darken-1" text @click="handleCancel") Cancel
        v-btn(color="blue darken-1" text @click="handleSave") Save
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
      pickerOverlay: false,
      item: {...this.lineItem},
      id: this.lineItem.id
    };
  },
  methods: {
    // updateLineItem(fieldKey, value) {
    //   // const nextLineItem = { [fieldKey]: value, id: this.lineItem.id };
    //   // this.$store.commit('updateLineItem', nextLineItem);
    // },
    handleSave () {
      this.$emit('save', this.item);
    },
    handleCancel () {
      this.$emit('cancel');
    }
  }
};
</script>
