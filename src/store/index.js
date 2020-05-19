import Vue from 'vue'
import Vuex from 'vuex'
import { asyncRoutes, routeList } from '../router'

Vue.use(Vuex)

const state = {
    roles: [],
    addRoutes: [],
    routeList: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routeList = routeList.concat(routes)
    },
    SET_ROLES: (state, role) => {
        window.sessionStorage.setItem('role', role)
        state.roles.splice(0, 1)
    },
    // 获取用户信息
    SET_INFO: (state, role) => {
        state.roles.unshift(role)
    }
}

// 判断路由权限
function hasPermission(roles, item) {
    if (item.meta && item.meta.roles) {
        return roles.some(role => {
            return item.meta.roles.includes(role)
        })
    } else {
        // 如果是通用路由，即不需要权限的
        return true
    }
}

// 筛选路由
function filterAsyncRoutes(routes, roles) {
    const res = []
    routes.forEach(item => {
        if (hasPermission(roles, item)) {
            // 如果是普通权限路由
            // 判断子路由
            if (item.children) {
                // 这里使用递归，自己调用自己
                // 把筛选好的子路由重新赋值给自己
                item.children = filterAsyncRoutes(item.children, roles)
            }
            res.push(item)
        }
    })
    return res
}

const actions = {
    generateRoutes: function ({ commit }, roles) {
        return new Promise(resolve => {
            let accessedRoutes = []
            if (roles.includes('admin')) {
                // 如果管理员，获取所有需要权限的路由
                accessedRoutes = asyncRoutes || []
            } else {
                // 普通用户，需要路由筛选
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

const getters = {
    rolesList: state => state.roles,
    // 路由表，用来渲染侧边栏
    permission_routes: state => state.routeList
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store
