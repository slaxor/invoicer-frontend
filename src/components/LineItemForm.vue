<template lang="pug">
  v-row
    v-col li: {{ lineItem }}
    v-col
      v-btn(
        absolute
        dark
        fab
        top
        right
        x-small
        color="primary"
        @click="save()"
      )
        v-icon mdi-pencil
</template>

<script>
export default {
  name: 'LineItemForm',
  props: {
    lineItem: Object
  },
  data: () => ({
  }),
  methods: {
    save () { console.log('saving...'); }
  }
};
</script>
