<template>
  <div>
    <div>
      <el-input
          size="small"
          class="addPosInput"
          placeholder="添加职位..."
          prefix-icon="el-icon-plus"
          @keydown.enter.native="addPosition"
          v-model="pos.name">
      </el-input>
      <el-button icon="el-icon-plus" size="small" style="background-color: #42b983" @click="addPosition">添加</el-button>
    </div>
    <div class="posMagMain">
      <el-table
          :data="position"
          size="small"
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
            label="职位名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间">
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
    </div>
    <el-dialog
        title="修改职位"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <el-tag>职位名称</el-tag>
        <el-input size="small" class="updatePosInput" v-model="updatePos.name"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="handleUpdate">确 定</el-button>
  </span>
    </el-dialog>
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
      position: [],
      updatePos: {
        name: '',
      },
      dialogVisible: false
    }
  },
  mounted() {
    this.initPositions();
  },
  methods: {
    initPositions() {
      this.getRequest("/system/basic/pos/").then(resp => {
        if (resp) {
          this.position = resp;
        }
      })
    },
    handleEdit(index, data) {
      // this.updatePos = data;
      // 利用拷贝的思路来解决问题，不然点击取消data的值也会改变
      Object.assign(this.updatePos, data)
      this.dialogVisible = true;
    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除' + data.name + '职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/system/basic/pos/"+data.id).then(resp=>{
          if (resp) {
            this.initPositions();
          }
      })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addPosition() {
      if (this.pos.name) {
        this.postRequest("/system/basic/pos/", this.pos).then(resp => {
          if (resp) {
            //重新加载数据 刷新表格
            this.initPositions();
            this.pos.name = '';
          }
        })
      } else {
        this.$message.error("职位名称不可以为空！");
      }
    },
    handleUpdate() {
      this.putRequest("/system/basic/pos/", this.updatePos).then(resp=>{
        if (resp) {
          this.initPositions();
          this.updatePos.name = '';
          this.dialogVisible = false;
        }
      })
    }
  }
}
</script>

<style scoped>
.addPosInput {
  width: 400px;
  margin-right: 5px
}

.posMagMain {
  margin-top: 7px;
}

.updatePosInput {
  width: 200px;
  margin-left: 10px;
}
</style>