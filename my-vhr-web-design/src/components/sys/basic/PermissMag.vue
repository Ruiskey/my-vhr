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
      <el-collapse v-model="activeName" accordion @change="change">
        <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r, index) in roles" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问的资源</span>
              <el-button style="float: right; padding: 3px 0; color: #42b983" icon="el-icon-delete" type="text"></el-button>
            </div>
            <div>
              <el-tree
                  show-checkbox
                  :data="allMenus" :props="defaultProps"></el-tree>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import {initMenu} from "../../../utils/menus";

export default {
  name: "PermissMag",
  data() {
    return{
      activeName: "1",
      role: {
        name: '',
        nameZh: ''
      },
      roles: [],
      allMenus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted() {
    this.initRoles();
  },
  methods: {
    change(name) {
      if (name) {
        this.initAllMenus();
      }
    },
    initAllMenus() {
      this.getRequest("/system/basic/permiss/menus/").then(resp=>{
        if (resp) {
          this.allMenus = resp;
        }
      })
    },
    initRoles() {
      this.getRequest("/system/basic/permiss/").then(resp=>{
        if (resp) {
          this.roles = resp;
        }
      })
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
    width: 400px;
    margin-right: 8px;
  }
</style>