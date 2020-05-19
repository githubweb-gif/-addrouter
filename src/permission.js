import route from './router/index'
import store from './store'

const whiteList = ['/login']

// 假设token存在
var token = true
route.beforeEach(async function (to, from, next) {
    if (token) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            // 判断用户角色权限，如果没有重新获取用户信息
            // 这里用用户角色判断，而不是看路由表是否存在
            // 因为在登录后角色就会保存在getters，同时路由表也被建立。它们之间有关联。
            // 只有在刷新页面时用户信息才会消失，路由表也会消失，因为都是存放在getters中。
            // 所以这里只判断是否有用户角色就行。
            const hasRoles = store.getters.rolesList && store.getters.rolesList.length > 0
            console.log(hasRoles)
            if (hasRoles) {
                // 有用户权限角色，放行
                next()
            } else {
                try {
                    // 没有用户角色权限，获取用户信息
                    // sessionStorage是在组件setRoles中切换用户权限，做的模拟。前端修改后，本应从后端获取，这里存放在sessionStorage
                    var roles = window.sessionStorage.getItem('role')
                    if (roles !== null) {
                        store.commit('SET_INFO', roles)
                        console.log(store.state.roles)
                    } else {
                        // 获取用户信息，这里应该也是从后端获取
                        roles = 'admin'
                        store.commit('SET_INFO', 'admin')
                    }
                    // 根据用户角色，获取不同的路由表
                    const accessRoutes = await store.dispatch('generateRoutes', [roles])
                    // 添加路由
                    route.addRoutes(accessRoutes)
                    next({ ...to, replace: true })
                } catch (error) {
                    // 放生错误，获取不到用户和路由，清空token。跳转到登录页
                    token = false
                    next({ path: '/login' })
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // 白名单，防止页面一直跳转登录页
            // next()，必须要有
            next()
        } else {
            // 没有token，跳转到登录页
            next({ path: '/login' })
        }
    }
})
