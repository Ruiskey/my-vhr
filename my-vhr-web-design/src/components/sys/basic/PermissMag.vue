<template>
  <div>
    <div class="permissManageTool">
      <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input size="small" placeholder="请输入角色中问名" v-model="role.nameZh"></el-input>
      <el-button size="small" icon="el-icon-plus" type="primary">添加角色</el-button>
    </div>
    <div style="margin-top: 10px; width: 900px">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="一致性 Consistency" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "PermissMag",
  data() {
    return{
      activeName: "1",
      role: {
        name: '',
        nameZh: ''
      }
    }
  }
}
</script>

<style>
  .permissManageTool {
    display: flex;
    justify-content: flex-start;
  }
  .permissManageTool .el-input{
    width: 200px;
    margin-right: 8px;
  }
</style>