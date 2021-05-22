<template>
    <div id="fk">
        <h1>用户反馈信息</h1>
        <el-row type="flex">
            <el-col :span="6">
                <el-input style="margin-left: 80px" v-model="msg" @blur="getFk" size="mini" placeholder="输入用户名/姓名/用户编号搜索"/>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col>
                <el-table
                        border
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            type="index">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="用户名">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            prop="telephone"
                            label="电话">
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="邮箱">
                    </el-table-column>
                    <el-table-column
                            prop="msg"
                            label="反馈信息">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="反馈时间">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios"
  export default {
    name: "FkManage",
    data() {
      return{
        tableData: [],
        msg: ''
      }
    },
    created() {
      this.getFk();
    },
    methods: {
      getFk() {
        var self = this
        if (self.$store.state.user.userId == '') {
          self.$message('请先登录');
          self.$router.push('/login')
        } else {
          axios.post('http://localhost:9090/fms/fk/getFk',{
            key: self.msg
          }).then(function(res){
            self.tableData = res.data
          }).catch(function(err){
            self.$message(err);
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>