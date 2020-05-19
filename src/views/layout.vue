<template>
  <div class="box">
    <el-container>
      <el-aside width="200px">
          <el-menu
          router
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
       <sidebar-item :key="index" v-for="(item,index) in RouteList" :route="item"></sidebar-item>
    </el-menu>
      </el-aside>
      <el-container>
        <el-header></el-header>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sidebarItem from './sidebarItem'
export default {
    data () {
        return {}
    },
    components: {
        sidebarItem
    },
    computed: {
        RouteList () {
            return this.$store.getters.permission_routes
        }
    }
}
</script>

<style lang="scss" scoped>
.box,
.el-container,
.el-menu {
  height: 100%;
}
.el-menu {
  border: 0;
}
</style>
