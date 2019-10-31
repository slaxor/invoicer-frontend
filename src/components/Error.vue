<template lang='pug'>
.error
  v-snackbar(
    v-model="snackbar"
    color="red"
  )
    | {{ title }}
    | {{ msg }}
    v-btn(dark text @click="snackbar = false") Close
</template>

<script>
export default {
  name: 'Error',
  props: {
    title: String,
    msg: String,
  },
  data () {
    return {
      snackbar: false,
      text: 'Hello, I\'m a snackbar',
    };
  },
};
</script>

<style scoped>
.md-button-content {
  padding: 10px;
}
</style>



