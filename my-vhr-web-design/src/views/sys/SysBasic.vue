<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="部门管理" name="depmag">
        <DepMag></DepMag>
      </el-tab-pane>
      <el-tab-pane label="职位管理" name="posmag">
        <PosMag>
        </PosMag>
      </el-tab-pane>
      <el-tab-pane label="职称管理" name="joblevelmag">
        <JobLevelMag></JobLevelMag>
      </el-tab-pane>
      <el-tab-pane label="奖惩规则" name="ecmag">
        <EcMag></EcMag>
      </el-tab-pane>
      <el-tab-pane label="权限组" name="permissmag">
        <PermissMag></PermissMag>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DepMag from "../../components/sys/basic/DepMag"
import PosMag from "../../components/sys/basic/PosMag"
import JobLevelMag from "../../components/sys/basic/JobLevelMag"
import EcMag from "../../components/sys/basic/EcMag"
import PermissMag from "../../components/sys/basic/PermissMag"
export default {
  name: "SysBasic",
  data() {
    return {
      activeName: 'permissmag'
    };
  },
  components: {
    // key 和 value是一样的所以可以简写成一个
    'DepMag': DepMag,
    'PosMag': PosMag,
    'JobLevelMag': JobLevelMag,
    EcMag,
    PermissMag,
  },
  methods: {

  }
}
</script>

<style scoped>

</style>