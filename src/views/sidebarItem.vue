<template>
  <div v-if="!route.hidden">
     <el-menu-item v-if="route.children.length === 1? true:false" :index="route.path">
        <i class="el-icon-menu"></i>
        <span>{{route.children[0].meta.title}}</span>
     </el-menu-item>
    <el-submenu v-else index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{route.meta.title}}</span>
        </template>
        <template v-for="(i,index) in route.children" >
    <el-menu-item :key="index" v-if="!i.hidden">
           <router-link :to="route.path+'/'+i.path">
               <i class="el-icon-menu"></i>
               <span>{{i.meta.title}}</span>
           </router-link>
    </el-menu-item>
        </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
    name: 'sidebarItem',
    props: {
        route: {
            type: Object,
            required: true
        }
    },
    data () {
        return {}
    }
}
</script>

<style lang="scss" scoped>
span {
  color: black;
}
</style>
