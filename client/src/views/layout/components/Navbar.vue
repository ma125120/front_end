<template>
  <el-menu class="navbar flex between align-center" mode="horizontal">
    <div class="flex align-center">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container flex align-center"/>
      <!-- <breadcrumb /> -->
    </div>
    <el-dropdown class="avatar-container" trigger="hover">
      <div class="avatar-wrapper hover flex align-center">
        <!-- <img :src="userinfo.avatar" class="user-avatar"> -->
        <div class="nickname">{{ userinfo.username }}</div>
        <!-- <i class="el-icon-caret-bottom"/> -->
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userinfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 64px;
  // line-height: 64px;
  border-radius: 0px !important;
  padding: 0 24px;
}
.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.nickname {
  padding-left: 12px;
}
</style>

