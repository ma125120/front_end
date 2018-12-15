<template>
  <div class="my-page--layout">
    <MyHeader v-if="!$slots.header" />
    <slot v-else name="header" />

    <div class="page--content">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'MyPageLayout',
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

.page--content {
  margin: 24px 24px 0;
  padding: 24px;
  background: #fff;
}
</style>
