<template lang="pug">
v-container.elevation-12(fluid)
  v-form
    v-card
      v-card-title
        span.headline {{ headline }}

      v-list(dense)
        v-list-item
          v-list-item-content
            v-menu(
              v-model="pickerOverlay"

              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px")

              template(v-slot:activator="{ on }")
                v-text-field(
                  readonly
                  v-on="on"
                  :value="item.deliveredAt | formateDate"
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
      pickerOverlay: false,
      defaultItem: {
        id: null,
        deliveredAt: new Date().toISOString(),
        price: 0,
        vatRate: 19,
        quantity: 0,
        unit: 'Stunden',
        description: 'Unknow'
      }
    };
  },
  computed: {
    item () {
      const { lineItem, defaultItem } = this;
      return Object.assign({}, lineItem || defaultItem);
    },
    headline () {
      return `${this.item.id ? 'Edit' : 'Create'} Line Item`;
    }
  },
  methods: {
    handleSave () {
      this.$emit('save', this.item);
    },
    handleCancel () {
      this.$emit('cancel');
    }
  }
};
</script>
