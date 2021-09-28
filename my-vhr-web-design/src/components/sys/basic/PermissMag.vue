<template>
  <div>
    <div class="permissManageTool">
      <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input size="small" placeholder="请输入角色中问名" v-model="role.nameZh" @keydown.enter.native="doAddRole"></el-input>
      <el-button size="small" icon="el-icon-plus" type="primary" @click="doAddRole">添加角色</el-button>
    </div>
    <div style="margin-top: 10px; width: 900px">
      <el-collapse v-model="activeName" accordion @change="change">
        <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r, index) in roles" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问的资源</span>
              <el-button style="float: right; padding: 3px 0; color: #42b983" icon="el-icon-delete"
                         type="text" @click="deleteRole(r)"></el-button>
            </div>
            <div>
              <el-tree
                  show-checkbox
                  node-key="id"
                  ref="tree"
                  :key="index"
                  :default-checked-keys="selectedMenus"
                  :data="allMenus" :props="defaultProps"></el-tree>
              <div style="display: flex;justify-content: flex-end">
                <el-button @click="cancelUpdate">取消修改</el-button>
                <el-button type="primary" @click="doUpdate(r.id, index)">确认修改</el-button>
              </div>
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
    return {
      activeName: -1,
      role: {
        name: '',
        nameZh: ''
      },
      roles: [],
      allMenus: [],
      selectedMenus: [],
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
    // 删除角色
    deleteRole(role) {
      this.$confirm('此操作将永久删除' + role.nameZh + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/system/basic/permiss/role/"+role.id).then(resp=>{
          if (resp) {
            this.initRoles();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    doAddRole() {
      if (this.role.name && this.role.nameZh) {
        this.postRequest("/system/basic/permiss/role", this.role).then(resp => {
          if (resp) {
            this.initRoles()
            this.role.name = ''
            this.role.nameZh = ''
          }
        })
      } else {
        this.$message.error("数据不可以为空!")
      }


    },
    change(rid) {
      if (rid) {
        this.initAllMenus();
        this.initSelectedMenus(rid);
      }
    },
    initSelectedMenus(rid) {
      this.getRequest("/system/basic/permiss/mids/" + rid).then(resp => {
        this.selectedMenus = resp;
      })
    },
    initAllMenus() {
      this.getRequest("/system/basic/permiss/menus/").then(resp => {
        if (resp) {
          this.allMenus = resp;
        }
      })
    },
    initRoles() {
      this.getRequest("/system/basic/permiss/").then(resp => {
        if (resp) {
          this.roles = resp;
        }
      })
    },
    // 传入index,这样才能知道传入的是第几个
    doUpdate(rid, index) {
      let tree = this.$refs.tree[index];
      // (leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false
      let selectedKeys = tree.getCheckedKeys(true);
      let url = '/system/basic/permiss/?rid=' + rid + '&';
      selectedKeys.forEach(key => {
        url += '&mids=' + key;
      })
      this.putRequest(url).then(resp => {
        if (resp) {
          this.activeName = -1;
        }
      })
    },
    cancelUpdate() {
      this.activeName = -1;
    }
  }
}
</script>

<style>
.permissManageTool {
  display: flex;
  justify-content: flex-start;
}

.permissManageTool .el-input {
  width: 400px;
  margin-right: 8px;
}
</style>