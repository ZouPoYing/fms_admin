<template>
    <div id="userManage">
        <h1>用户信息管理</h1>
        <el-row type="flex">
            <el-col :span="2">
                <el-button
                        size="mini"
                        type="success"
                        @click="add">新增</el-button>
            </el-col>
            <el-col :span="6">
                <el-input style="margin-left: 80px" v-model="msg" @blur="getUser" size="mini" placeholder="输入用户名/姓名/用户编号搜索"/>
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
                            prop="password"
                            label="密码">
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
                            prop="question"
                            label="密保问题">
                    </el-table-column>
                    <el-table-column
                            prop="answer"
                            label="密保答案">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="注册时间">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="150">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="update(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="18">
                <el-dialog
                        :title="title"
                        :visible.sync="dialogVisible"
                        width="30%">
                    <el-form label-width="100px" class="demo-ruleForm" enctype="multipart/form-data">
                        <el-form-item label="用户名" prop="userName">
                            <el-input maxlength="10" type="text" v-model="setForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="name">
                            <el-input maxlength="10" type="text" v-model="setForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input maxlength="16" type="text" v-model="setForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="telephone">
                            <el-input maxlength="11" type="text" v-model="setForm.telephone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input maxlength="11" type="text" v-model="setForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="密保问题" prop="question">
                            <el-select v-model="setForm.question" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="密保答案" prop="answer">
                            <el-input type="text" v-model="setForm.answer" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button v-if="isAdd" type="primary" @click="addUser">确 定</el-button>
                        <el-button v-else type="primary" @click="updateUser">修 改</el-button>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                    </span>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios"
  export default {
    name: "UserManage",
    data() {
      return{
        tableData: [],
        setForm: {},
        dialogVisible: false,
        isAdd: true,
        title: '新增',
        msg: '',
        options: [{
          value: '你父亲的姓名是？',
          label: '你父亲的姓名是？'
        }, {
          value: '你所在的学校是？',
          label: '你所在的学校是？'
        }, {
          value: '你的梦想是？',
          label: '你的梦想是？'
        }],
      }
    },
    created() {
      this.getUser();
    },
    methods: {
      getUser() {
        var self = this
        if (self.$store.state.user.userId == '') {
          self.$message('请先登录');
          self.$router.push('/login')
        } else {
          axios.post('http://localhost:9090/fms/user/getUser',{
            key: self.msg
          }).then(function(res){
            self.tableData = res.data
          }).catch(function(err){
            self.$message(err);
          })
        }
      },
      add() {
        this.setForm = []
        this.title = '新增'
        this.dialogVisible = !this.dialogVisible
        this.isAdd = true
      },
      addUser() {
        var self = this;
        axios.post('http://localhost:9090/fms/user/addUser', {
          userName: self.setForm.userName,
          name: self.setForm.name,
          password: self.setForm.password,
          telephone: self.setForm.telephone,
          email: self.setForm.email,
          question: self.setForm.question,
          answer: self.setForm.answer
        }).then(function(res){
          if (res.data.success) {
            self.$message('新增成功');
            self.getUser();
          } else {
            self.$message(res.data.msg);
          }
        }).catch(function(err){
          self.$message(err);
        })
        self.dialogVisible = !self.dialogVisible
      },
      update(row) {
        this.title = '修改'
        this.dialogVisible = true
        this.isAdd = false
        this.setForm = row
      },
      updateUser() {
        var self = this;
        axios.post('http://localhost:9090/fms/user/updateUser1', {
          userName: self.setForm.userName,
          name: self.setForm.name,
          password: self.setForm.password,
          telephone: self.setForm.telephone,
          email: self.setForm.email,
          question: self.setForm.question,
          answer: self.setForm.answer,
          userId: self.setForm.userId
        }).then(function(res){
          if (res.data.success) {
            self.$message('修改成功');
            self.getUser();
          } else {
            self.$message.error(res.data.msg);
          }
        }).catch(function(err){
          self.$message.error(err);
        })
        self.dialogVisible = !self.dialogVisible
      }
    }
  }
</script>

<style scoped>

</style>