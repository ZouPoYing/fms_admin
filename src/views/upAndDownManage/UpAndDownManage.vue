<template>
  <div id="upAndDownManage">
    <h1>基金日涨跌管理</h1>
      <el-row type="flex" justify="center">
          <el-col :span="24">
              <el-table
                      border
                      :data="tableData"
                      style="width: 100%">
                  <el-table-column
                          type="index"
                          :index="indexMethod">
                  </el-table-column>
                  <el-table-column
                          prop="fundName"
                          label="基金名字">
                  </el-table-column>
                  <el-table-column
                          prop="fundCompany"
                          label="基金公司">
                  </el-table-column>
                  <el-table-column
                          prop="fundManager"
                          label="基金经理">
                  </el-table-column>
                  <el-table-column
                          prop="fundMoney"
                          label="初始基金规模">
                  </el-table-column>
                  <el-table-column
                          prop="fundRiskLevel"
                          label="风险程度">
                  </el-table-column>
                  <el-table-column
                          prop="earning"
                          label="收益能力">
                  </el-table-column>
                  <el-table-column
                          prop="antiRisk"
                          label="抗风险波动">
                  </el-table-column>
                  <el-table-column
                          prop="costPerformance"
                          label="投资性价比">
                  </el-table-column>
                  <el-table-column
                          prop="isPush"
                          label="是否推送">
                  </el-table-column>
                  <el-table-column
                          prop="createTime"
                          label="成立时间">
                  </el-table-column>
                  <el-table-column
                          label="操作">
                      <template slot-scope="scope">
                          <el-button
                                  size="small"
                                  type="text"
                                  @click="udmanage(scope.row)">日涨跌管理</el-button>
                      </template>
                  </el-table-column>
              </el-table>
          </el-col>
      </el-row>
      <el-row type="flex" justify="center">
          <el-col :span="12">
              <el-dialog
                      title="设置日涨跌"
                      :visible.sync="dialogVisible"
                      width="30%">
                  <el-form label-width="100px" class="demo-ruleForm">
                      <el-form-item label="涨跌时间" prop="day">
                          <el-select v-model="day" placeholder="请选择">
                              <el-option
                                      v-for="item in selectDay"
                                      :key="item.index"
                                      :label="item"
                                      :value="item">
                              </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item label="涨跌幅度" prop="ud">
                          <el-input maxlength="19" type="text" v-model="ud"></el-input>
                      </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="set">设 置</el-button>
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
    name: "UpAndDownManage",
    data() {
      return {
        tableData: [],
        selectDay: [],
        dialogVisible: false,
        day: '',
        ud: '',
        fundId: ''
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
          axios.post('http://localhost:9090/fms/fund/getFund').then(function(res){
            self.tableData = res.data
          }).catch(function(err){
            self.$message(err);
          })
        }
      },
      udmanage(row) {
        var self = this;
        axios.post('http://localhost:9090/fms/ud/getSelectDay',{
          fundId: row.fundId
        }).then(function(res){
          self.selectDay = res.data
        }).catch(function(err){
          self.$message(err);
        })
        self.fundId = row.fundId
        self.dialogVisible = true
      },
      set() {
        var self = this;
        axios.post('http://localhost:9090/fms/ud/setUd',{
          fundId: self.fundId,
          day: self.day,
          ud: self.ud
        }).then(function(res){
          if (res.data.success) {
            self.$message('设置成功');
          } else {
            self.$message(res.data.msg);
          }
        }).catch(function(err){
          self.$message(err);
        })
        self.dialogVisible = false
        self.selectDay = []
        self.day = ''
        self.ud = ''
      }
    }
  }
</script>

<style scoped>

</style>