<template lang="pug">
v-app#inspire
  v-navigation-drawer(v-model='drawer' app clipped)
    v-list(dense)
      v-list-item(@click="$router.push({path: '/'})")
        v-list-item-action
          v-icon mdi-view-dashboard
        v-list-item-content Dashboard
      v-list-item(@click="$router.push({path: '/invoices'})")
        v-list-item-action
          v-icon mdi-format-list-bulleted
        v-list-item-content Invoices
      v-list-item(@click="$router.push({path: '/contracts'})")
        v-list-item-action
          v-icon mdi-format-list-bulleted
        v-list-item-content Contracts
      v-list-item(@click="$router.push({path: '/contract-parties'})")
        v-list-item-action
          v-icon mdi-format-list-bulleted
        v-list-item-content Contract Parties
      v-list-item(@click="$router.push({path: '/settings'})")
        v-list-item-action
          v-icon mdi-settings
        v-list-item-content Settings
  v-app-bar(app clipped-left)
    v-app-bar-nav-icon(@click.stop='drawer = !drawer')
    v-toolbar-title Invoicer
  v-content
    v-container.fill-height(fluid)
      v-fade-transition(mode="out-in")
        router-view
  v-footer(app)
    // v-btn(@click="addError('foo')") Click to add an error
    .align-end © 2019
    v-alert(type="error" v-for='(item, i) in errors' :key='i') {{ item }}
  // Error(title="error title" msg="error msg")
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Error from '@/components/Error';
export default {
  name: 'App',
  components: {
    Error,
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  created () {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    ...mapGetters(['errors']),
    ...mapMutations(['addError']),
  },
};
</script>


