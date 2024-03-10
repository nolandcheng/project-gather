import request from "@/utils/request"

// 用户信息相关存储
const getDefaultState = () => {
  return {
    ticket: new URLSearchParams(location.search).get("ticket"),
    menuData: [],
  }
}

export default {
  namespaced: true,
  state: getDefaultState(),
  mutations: {
    resetState: (state) => {
      Object.assign(state, getDefaultState())
    },
    setMenuData: (state, data) => {
      state.menuData = data
    },
  },
  actions: {
    // 获取菜单数据
    getMenuData({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: "sys/menu/nav",
          method: "get",
        }).then((res) => {
          commit("setMenuData", res.menuList)
          resolve(res.menuList)
        })
      })
    },
  },
}
