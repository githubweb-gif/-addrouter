<template>
    <div>
        <h3>切换用户权限</h3>
        <button @click="setRoles('editor')">editor</button>
        <button @click="setRoles('admin')">admin</button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    methods: {
        ...mapMutations(['SET_ROLES']),
        setRoles (role) {
            this.SET_ROLES(role)
            location.reload()
        }
    }
}
</script>

<style lang="scss" scoped>
button {
  color: black;
  padding: 10px;
  margin-right: 20px;
}
h3 {
  margin-bottom: 20px;
}
</style>
