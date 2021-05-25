/*
 * @Descripttion: 
 * @Author: 
 * @Date: 2021-05-24 16:46:46
 * @LastEditors: Cheng
 * @LastEditTime: 2021-05-25 16:41:30
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ],
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: "css"
      }
    ]
  ]
}
