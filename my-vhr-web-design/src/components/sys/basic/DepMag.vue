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
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="tree">
      <span class="custom-tree-node" slot-scope="{ node, data }" style="display: flex; justify-content: space-between; width: 100%">
        <span>{{ data.name }}</span>
        <span>
          <el-button
              type="primary"
              size="mini"
              style="height: 7px"
              @click="() => showAddDepView(data)">
            添加部门
          </el-button>
          <el-button
              type="danger"
              size="mini"
              style="height: 10px"
              @click="() => deleteDep(data)">
            删除部门
          </el-button>
        </span>
      </span>
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
    deleteDep(data) {
      console.log(data)
    },
    showAddDepView(data) {
      console.log(data)
    },
    initDeps() {
      this.getRequest("/system/basic/department/").then(resp => {
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
.depBtn {
  padding: 20px;
}
</style>