<template>
  <div>
    <div>
      <el-input
          size="small"
          class="addPosInput"
          placeholder="添加职位..."
          prefix-icon="el-icon-plus"
          v-model="pos.name">
      </el-input>
      <el-button icon="el-icon-plus" size="small" style="background-color: #42b983">添加</el-button>
    </div>
    <div class="posMagMain">
      <el-table
          :data="position"
          size="small"
          border
          stripe
          style="width: 50%">
        <el-table-column
            prop="id"
            label="编号"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职位名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间"
            width="120">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PosMag",
  data() {
    return {
      pos: {
        name: ''
      },
      position: []
    }
  }
}
</script>

<style scoped>
  .addPosInput {
    width:400px;
    margin-right: 5px
  }
  .posMagMain {
    margin-top: 7px;
  }
</style>