/**
 * 页面加载拦截
 */

import router from "./router"

const routes = router.options.routes
// 白名单
const whiteList = routes.filter((val) => val.path !== "/")

router.beforeEach(async (to, form, next) => {
  next()
})
