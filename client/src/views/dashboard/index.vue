<template>
  <MyPageLayout class="">
    <div class="dashboard-text">name:{{ userinfo.username }}</div>
    <div class="dashboard-text">role:<span >{{ $root.roles[role] }}</span></div>
  </MyPageLayout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'userinfo',
      'role'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    padding: 30px;
    flex: 1;
    box-sizing: border-box;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
