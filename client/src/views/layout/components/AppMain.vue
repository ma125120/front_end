<template>
  <section class="app-main flex column">
    <el-tabs 
      :value="$store.state.tabValue"
      type="card"
      closable
      @tab-remove = "remove"
      @tab-click = "clickTab"
    >
      <el-tab-pane
        v-for="(item) in $store.state.tabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      />
    </el-tabs>
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view class="my-router"/>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  methods: {
    remove(targetName) {
      this.$store.commit('removeTab', targetName);
    },
    clickTab(vm) {
      let { tabs } = this.$store.state,
          tabIndex = vm.name,
          item = tabs && tabs.filter(v => v && (v.name === tabIndex));
      if (item.length > 0) {
        let url = item[0].content;
        this.$router.push(url);
      }
    }
  }
}
</script>

<style>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 70px);
  position: relative;
  overflow: hidden;
  background: #f0f2f5;
}

.el-tabs {
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 20px;
}
.el-tabs__nav {
  margin: 0;
  background: #fafafa;
}
.el-tabs__item.is-active {
  background: #fff;
}
.el-tabs__header {
  margin: 0;
}
</style>
