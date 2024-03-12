import Vue from "vue"
import { Confirm } from "element-ui"

/**
 * @function 确认弹窗
 * @description: 二次封装确认弹窗
 * @param {string} title - 提示名称
 * @param {promise} api - 接口promise
 * @param {refresh} refresh - 完成后执行
 * @author Noland Cheng
 */

export default (title, api, refresh) => {
  Confirm(title, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = "执行中..."
        api()
          .then((res) => {
            if (res || res === null) {
              Vue.prototype.$message.success("操作成功")
              refresh()
            }
            done()
          })
          .finally(() => {
            instance.confirmButtonText = "确定"
            instance.confirmButtonLoading = false
          })
      } else {
        done()
      }
    },
  }).catch(() => {})
}
