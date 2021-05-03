<template>
    <div>
        <h1>基金管理</h1>
        <div class="box">
            <div style="width: 20%;padding: 10px" v-for="(item, index) in tableData" :key="index">
                <el-card :body-style="{ padding: '0px' }">
                    <ul style="padding: 14px;list-style-type:none;">
                        <li>基金名字：{{item.fundName}}</li>
                        <li>基金公司：{{item.fundCompany}}</li>
                        <li>基金经理：{{item.fundManager}}</li>
                        <li>初始基金规模：{{item.fundMoney}}</li>
                        <li>风险程度：{{item.fundRiskLevel}}</li>
                        <li>收益能力：{{item.earning}}</li>
                        <li>抗风险波动：{{item.antiRisk}}</li>
                        <li>投资性价比：{{item.costPerformance}}</li>
                        <li>是否推送：{{item.isPush}}</li>
                        <li>成立时间：{{item.createTime}}</li>
                        <div class="bottom clearfix">
                            <el-button @click="edit(item)" type="text" class="button">修改</el-button>
                        </div>
                    </ul>
                </el-card>
            </div>
        </div>
        <el-row type="flex" justify="center">
            <el-col :span="18">
                <el-dialog
                        :title="title"
                        :visible.sync="dialog"
                        width="50%">
                    <el-form label-width="100px" class="demo-ruleForm" enctype="multipart/form-data">
                        <el-form-item label="基金名字" prop="fundName">
                            <el-input type="text" v-model="setForm.fundName"></el-input>
                        </el-form-item>
                        <el-form-item label="风险程度" prop="fundRiskLevel">
                            <el-input type="text" v-model="setForm.fundRiskLevel"></el-input>
                        </el-form-item>
                        <el-form-item label="收益能力" prop="earning">
                            <el-input type="text" v-model="setForm.earning"></el-input>
                        </el-form-item>
                        <el-form-item label="抗风险波动" prop="antiRisk">
                            <el-input type="text" v-model="setForm.antiRisk"></el-input>
                        </el-form-item>
                        <el-form-item label="投资性价比" prop="costPerformance">
                            <el-input type="text" v-model="setForm.costPerformance"></el-input>
                        </el-form-item>
                        <el-form-item label="初始基金规模" prop="fundMoney">
                            <el-input type="text" v-model="setForm.fundMoney"></el-input>
                        </el-form-item>
                        <el-form-item label="基金公司" prop="fundCompany">
                            <el-input type="text" v-model="setForm.fundCompany"></el-input>
                        </el-form-item>
                        <el-form-item label="基金经理" prop="fundManager">
                            <el-input type="text" v-model="setForm.fundManager"></el-input>
                        </el-form-item>
                        <el-form-item label="是否推送" prop="isPush">
                            <el-input type="text" v-model="setForm.isPush"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button v-if="isAdd" type="success" @click="addFund">新 增</el-button>
                        <el-button v-else type="success" @click="updateFund">修 改</el-button>
                        <el-button @click="dialog = false">取 消</el-button>
                    </span>
                </el-dialog>
            </el-col>
        </el-row>
        <el-button style="position: fixed;bottom: 60px;right: 50px; z-index: 100;" @click="add" type="success">新增</el-button>
    </div>
</template>

<script>
    import axios from "axios"
  export default {
    name: "FundManage",
    data() {
      return {
        userId: this.$store.state.user.userId,
        userName: this.$store.state.user.userName,
        dialog: false,
        tableData: [],
        setForm: [],
        title: '新增',
        isAdd: true
      }
    },
    created() {
      this.getUser();
    },
    methods: {
      getUser() {
        var self = this;
        if (self.$store.state.user.userId == '') {
          self.$message('请先登录');
          self.$router.push('/login')
        } else {
          axios.post('http://localhost:9090/fms/user/getUserById', {
            userId: self.$store.state.user.userId
          }).then(function(res){
            if (res.data.success) {
              self.userName = res.data.userName;
              self.$store.commit('getUserName',res.data.userName);
              self.$emit('log');
              self.getFund();
            } else {
              self.$message(res.data.msg);
            }
          }).catch(function(err){
            self.$message(err);
          })
        }
      },
      getFund() {
        var self = this;
        axios.post('http://localhost:9090/fms/fund/getFund').then(function(res){
          self.tableData = res.data
        }).catch(function(err){
          self.$message(err);
        })
      },
      add() {
        this.dialog = true
        this.title = '新增'
        this.isAdd = true
        this.setForm = []
      },
      edit(item) {
        this.dialog = true
        this.title = '修改'
        this.isAdd = false
        this.setForm = item
      },
      addFund() {
        var self = this;
        axios.post('http://localhost:9090/fms/fund/addFund', {
          userId: self.$store.state.user.userId,
          fundName: self.setForm.fundName,
          fundRiskLevel: self.setForm.fundRiskLevel,
          earning: self.setForm.earning,
          antiRisk: self.setForm.antiRisk,
          costPerformance: self.setForm.costPerformance,
          fundMoney: self.setForm.fundMoney,
          fundCompany: self.setForm.fundCompany,
          fundManager: self.setForm.fundManager,
          isPush: self.setForm.isPush
        }).then(function(res){
            if (res.data.success) {
              self.$message('新增成功');
              self.getFund();
            } else {
              self.$message(res.data.msg);
            }
          self.dialog = false
        }).catch(function(err){
          self.$message(err);
          self.dialog = false
        })
      },
      updateFund() {
        var self = this;
        axios.post('http://localhost:9090/fms/fund/updateFund', {
          userId: self.$store.state.user.userId,
          fundName: self.setForm.fundName,
          fundRiskLevel: self.setForm.fundRiskLevel,
          earning: self.setForm.earning,
          antiRisk: self.setForm.antiRisk,
          costPerformance: self.setForm.costPerformance,
          fundMoney: self.setForm.fundMoney,
          fundCompany: self.setForm.fundCompany,
          fundManager: self.setForm.fundManager,
          isPush: self.setForm.isPush,
          fundId: self.setForm.fundId
        }).then(function(res){
          if (res.data.success) {
            self.$message('修改成功');
            self.getFund();
          } else {
            self.$message(res.data.msg);
          }
          self.dialog = false
        }).catch(function(err){
          self.$message(err);
          self.dialog = false
        })
      }
    }
  }
</script>

<style scoped>
    .box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>