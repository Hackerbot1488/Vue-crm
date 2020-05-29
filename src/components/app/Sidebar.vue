<template>
  <ul class="sidenav app-sidenav " :class="{open: value}">

    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>

  </ul>
</template>

<script>
import localize from '@/filters/localize.filter'
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      links: [
        { title: localize('localizeHome'), url: '/', exact: true },
        { title: localize('localizeHistory'), url: '/history' },
        { title: localize('localizePlanning'), url: '/planning' },
        { title: localize('localizeRecord'), url: '/record' },
        { title: localize('localizeCategories'), url: '/categories' }
      ]
    }
  }
}
</script>
