<template lang="pug">
v-container.elevation-12(fluid)
  v-form
    v-list(dense)
      v-list-item
        v-list-item-content
          v-text-field(label="Delivered At" v-model="deliveredAt")
          span {{ deliveredAt }}
          span {{ description }}
      //- v-list-item
      //-   v-list-item-content
      //-     v-text-field(label="Price" v-model="price")
      //-   v-list-item-content
      //-     v-text-field(label="VAT Rate" v-model="vatRate")
      //-   v-list-item-content %
      //- v-list-item
      //-   v-list-item-content
      //-     v-text-field(label="Quantity" v-model="quantity")
      //-   v-list-item-content
      //-     v-text-field(label="Unit" v-model="unit")
      v-list-item
        v-list-item-content.align-end
          v-text-field(label="Description" v-model="description")
</template>

<script>

import moment from 'moment';

export default {
  name: 'LineItemForm',
  props: {
    lineItem: Object
  },
  data () {
    return {
      item: { ...this.lineItem }
    };
  },
  computed: {
    description: {
      get () {
        return this.lineItem.description;
      },
      set (value) {
        this.updateField('description', value);
      }
    },
    deliveredAt: {
      get () {
        let fda = this.lineItem.deliveredAt;
        return  moment(fda).format('DD.MM.YY');
      },
      set (value) {
        const momentDateArray = value
          .split('.')
          .reverse()
          .map((string, index) => {
            const number = parseInt(string);
            return index === 1 ? number - 1 : number;
          });
        const date = moment(momentDateArray);
        if (date.isValid()) {
          this.updateField('deliveredAt', date.format());
        } else {
          // eslint-disable-next-line no-console
          console.error('handle error of invalid date, store update prevented.');
        }
      },
    },
  },
  methods: {
    updateField(fieldKey, value) {
      const { $store, lineItem } = this;
      $store.commit('updateLineItemField', {
        id: lineItem.id,
        field: fieldKey,
        value: value
      });
    }
  }
};
</script>
