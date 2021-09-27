<template>
  <div>
    <div>
      <el-input
          size="small"
          class="addJobLevelInput"
          placeholder="添加职称..."
          prefix-icon="el-icon-plus"
          @keydown.enter.native="addJobLevel"
          v-model="jobLevel.name">
      </el-input>
      <el-select v-model="jobLevel.titleLevel" placeholder="职称等级" size="small" style="margin-left: 5px">
        <el-option
            v-for="item in titleLevels"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <el-button icon="el-icon-plus" size="small" style="background-color: #42b983; margin-left: 5px"
                 @click="addJobLevel">添加
      </el-button>
    </div>
    <div>
      <el-table
          :data="levels"
          size="small"
          @selection-change="handleSelectionChange"
          border
          stripe
          style="width: 50%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职称名称"
        >
        </el-table-column>
        <el-table-column
            prop="titleLevel"
            label="职称等级"
        >
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间">
        </el-table-column>
        <el-table-column
            label="是否启用">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
            <el-tag type="danger" v-else>未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="operate"
            label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
          title="修改职称"
          :visible.sync="dialogVisible"
          width="30%">
        <div>
          <table>
            <tr>
              <td>
                <el-tag>职称名</el-tag>
              </td>
              <td>
                <el-input size="small" v-model="updateJobLevel.name"></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <el-tag>职称级别</el-tag>
              </td>
              <td>
                <el-select v-model="updateJobLevel.titleLevel" placeholder="职称等级" size="small" style="margin-left: 5px">
                  <el-option
                      v-for="item in titleLevels"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>
                <el-tag>是否启用</el-tag>
              </td>
              <td>
                <el-switch
                    v-model="updateJobLevel.enabled"
                    active-text="启用"
                    inactive-text="禁用">
                </el-switch>
              </td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="handleUpdate">确 定</el-button>
        </span>
      </el-dialog>
      <el-button type="danger" size="small" style="margin-top: 8px"
                 @click="deleteMultiple" :disabled="multipleSelection.length==0">批量删除
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobLevelMag",
  data() {
    return {
      jobLevel: {
        name: '',
        titleLevel: '',
      },
      levels: [],
      multipleSelection: [],
      updateJobLevel: {
        name: '',
        titleLevel: '',
        enabled: false
      },
      dialogVisible: false,
      titleLevels: [
        '正高级',
        '副高级',
        '中级',
        '初级',
        '员级'
      ],
    }
  },
  mounted() {
    this.initJobLevels();
  },
  methods: {
    initJobLevels() {
      this.getRequest("/system/basic/joblevel/").then(resp => {
        if (resp) {
          this.levels = resp;
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, data) {
      Object.assign(this.updateJobLevel, data);
      this.dialogVisible = true;
    },
    handleUpdate() {
      this.putRequest("/system/basic/joblevel/", this.updateJobLevel).then(resp => {
        if (resp) {
          this.initJobLevels();
          this.updateJobLevel.name = '';
          this.updateJobLevel.titleLevel = '';
          this.updateJobLevel.enabled = false;
          this.dialogVisible = false;
        }
      })
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除' + data.name + '职称, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/system/basic/joblevel/" + data.id).then(resp => {
          if (resp) {
            this.initJobLevels();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteMultiple() {
      this.$confirm('此操作将永久删除' + this.multipleSelection.length + '条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = "?";
        this.multipleSelection.forEach(item => {
          ids += 'ids=' + item.id + '&';
        })
        this.deleteRequest('/system/basic/joblevel/'+ids).then(resp => {
          if (resp) {
            this.initJobLevels();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addJobLevel() {
      if (this.jobLevel.name && this.jobLevel.titleLevel) {
        this.postRequest("/system/basic/joblevel/", this.jobLevel).then(resp => {
          if (resp) {
            this.initJobLevels();
            this.jobLevel.name = '';
            this.jobLevel.titleLevel = '';
          }
        })
      } else {
        this.$message.error("职称名称不可以为空！");
      }
    }
  }
}
</script>

<style scoped>
.addJobLevelInput {
  width: 400px;
  margin-right: 5px
}
</style>