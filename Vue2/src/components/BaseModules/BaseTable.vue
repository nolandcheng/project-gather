<!-- 统一封装 - 通用型表格 -->
<template>
  <div class="base-table">
    <el-table
      ref="table"
      :header-cell-style="{ background: '#5d92d6', color: '#fff' }"
      border
      stripe
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="hasSelection" type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column v-if="hasIndex" type="index" label="序号" width="60" align="center" />
      <el-table-column
        v-for="(item, index) of tableHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="{ row }">
          <slot :name="item.prop" :row="row">
            <span>{{ row[item.prop] }}</span>
          </slot>
        </template>
      </el-table-column>
      <slot name="otherColumn"></slot>
    </el-table>
    <el-pagination
      v-if="hasPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="customPageData.currPage"
      :page-size="customPageData.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :total="customPageData.total"
      :style="{ marginTop: '20px' }"
      align="right"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  model: {
    prop: "pageData",
  },
  props: {
    // 表头数组 [{label: '名称', prop: 'name', minWidth: '120px'}]
    tableHeader: {
      type: Array,
      default: () => [],
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => [],
    },
    // 是否有勾选框，默认有
    hasSelection: {
      type: Boolean,
      default: true,
    },
    // 是否有序号，默认有
    hasIndex: {
      type: Boolean,
      default: true,
    },
    // 是否有分页，默认有
    hasPage: {
      type: Boolean,
      default: true,
    },
    // 分页参数
    pageData: {
      type: Object,
      default: () => {
        return {
          currPage: 1,
          pageSize: 10,
          total: 0,
        }
      },
    },
  },
  computed: {
    // 当前分页参数，重新封装分页以更好的进行修改赋值
    customPageData: {
      get() {
        return this.pageData
      },
      set(val) {
        this.$emit("input", val)
      },
    },
  },
  methods: {
    // 表格勾选事件
    handleSelectionChange(val) {
      this.$emit("on-selection", val)
    },
    // 修改表格每页显示数量
    handleSizeChange(val) {
      this.customPageData.currPage = 1
      this.customPageData.pageSize = val
      this.$emit("on-query")
    },
    // 修改表格当前页
    handleCurrentChange(val) {
      this.customPageData.currPage = val
      this.$emit("on-query")
    },
  },
}
</script>
