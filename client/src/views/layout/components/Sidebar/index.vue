<template>
  <div class="my-sidebar">
    <div class="logo--wrap flex all-center">
      <img :src="`./static/imgs/logo.png`" class="logo">
      <h1 class="logo--title">vue admin</h1>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss">
.my-sidebar {
  height: 100vh;
}
.logo {
  width: 32px;
}
.logo--wrap {
  background-color: #002140;
  position: relative;
  padding: 12px 0;
  transition: all .3s;
  overflow: hidden;
  box-sizing: border-box;
}
.logo--title {
  font-size: 20px;
  margin: 0 0 0 12px;
  font-family: Myriad Pro,Helvetica Neue,Arial,Helvetica,sans-serif;
  font-weight: 600;
  color: #fff;
}
#app .hideSidebar {
  .logo--title {
    display: none;
  }
  .my-sidebar {
    width: 80px !important;
  }
  .main-container {
    margin-left: 80px;
  }
  .logo--wrap {
    padding: 12px;
  }
  .el-submenu > .el-submenu__title {
    padding-left: 20px !important;
    text-align: center;
  }
  .svg-icon {
    margin: 0;
  }
  .el-tooltip {
    transform: translate(25%);
  }
}
</style>

