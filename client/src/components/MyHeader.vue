<template>
  <div class="white box page--header">
    <Breadcrumb />
    <h1 class="header--title">{{ title }}</h1>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'MyHeader',
  components: { Breadcrumb },
  props: {
    total: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      title: '',
    }
  },
  watch: {

  },
  created() {
    this.title = this.$route.meta.title;
  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header--title {
  font-size: 20px;
  font-weight: 500;
  color: rgba(0,0,0,.85);
  margin: 16px auto 0;
}
.page--header {
  padding: 20px;
}
</style>
