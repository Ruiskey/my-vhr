<template>
  <div style="width: 500px">
    <el-input
        placeholder="请输入部门名称进行搜索..."
        prefix-icon="el-icon-search"
        v-model="filterText">
    </el-input>

    <el-tree
        class="filter-tree"
        :data="deps"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree">
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "DepMag",
  data() {
    return {
      filterText: '',
      deps: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    filterText(val) {
      // 通过ref找到tree这个标识,然后调用其中的filter方法
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.initDeps();
  },
  methods: {
    initDeps() {
      this.getRequest("/system/basic/department/").then(resp=>{
        if (resp) {
          this.deps = resp;
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  }
}
</script>

<style scoped>

</style>