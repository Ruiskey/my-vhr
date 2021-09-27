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
      <el-button icon="el-icon-plus" size="small" style="background-color: #42b983; margin-left: 5px">添加</el-button>
    </div>
    <div>
      <el-table
          :data="levels"
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
            label="职称名称"
            >
        </el-table-column>
        <el-table-column
            prop="name"
            label="职称等级"
            >
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
      <el-button type="danger" size="small" style="margin-top: 8px"
                 @click="deleteMultiple">批量删除
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
      levels: [

      ],
      titleLevels: [
          '正高级',
          '副高级',
          '中级',
          '初级',
          '员级'
      ]
    }
  },
  methods: {
    handleEdit() {

    },
    handleDelete() {

    },
    deleteMultiple() {

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