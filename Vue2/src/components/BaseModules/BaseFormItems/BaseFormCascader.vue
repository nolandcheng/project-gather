<template>
  <el-cascader
    v-model="casValue"
    :options="itemProps.list"
    :multiple="itemProps.multiple"
    :props="itemProps.treeProps"
    clearable
    :show-all-levels="false"
    :style="{ width: '100%' }"
  ></el-cascader>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    // 表单项参数
    itemProps: {
      type: Object,
      return: () => {},
    },
    // 表单项数据
    value: {},
  },
  computed: {
    casValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val)
      },
    },
  },
}
</script>
