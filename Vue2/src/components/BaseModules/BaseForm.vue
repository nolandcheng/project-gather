<!-- 统一封装 - 通用型表单 -->
<template>
  <div class="base-form">
    <component
      :is="isIndepForm ? 'el-form' : 'div'"
      :inline="true"
      :class="!isIndepForm && 'flex flex-wrap justify-between'"
    >
      <el-form-item
        v-for="(item, index) of formItems"
        :key="index"
        :label="formItemLabel(item)"
        :prop="item.prop"
        :style="{ width: isIndepForm ? 'auto' : '50%' }"
      >
        <slot :name="item.prop">
          <component
            :is="'BaseForm' + item.type"
            :item-props="item"
            v-model="formData[item.prop]"
          ></component>
        </slot>
      </el-form-item>
      <el-form-item>
        <div class="fun-buttons">
          <slot name="buttons"></slot>
        </div>
      </el-form-item>
    </component>
  </div>
</template>

<script>
import BaseFormItems from "./BaseFormItems/index"
export default {
  name: "BaseForm",
  components: {
    ...BaseFormItems,
  },
  props: {
    // 是否只是个独立的行内form表单
    isIndepForm: {
      type: Boolean,
      default: true,
    },
    // 表单列表：[{label: '名称', prop: 'name', type: 'Input'}]
    formItems: {
      type: Array,
      default: () => [],
    },
    // 表单数据
    formData: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    formItemLabel() {
      return (item) => {
        return this.isIndepForm ? "" : item.label + "："
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.base-form {
  ::v-deep .el-form {
    .el-form-item {
      margin-right: 20px;
    }
    .el-input__inner {
      font-size: 16px;
    }
  }
}
</style>
