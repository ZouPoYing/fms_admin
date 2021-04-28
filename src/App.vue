<template>
  <div id="app">
    <el-container style="height: 920px; border: 1px solid #eee">
      <el-container>
        <el-header>
          <el-menu
                  :default-active="activeIndex2"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
            <el-menu-item @click="toFundManage" index="1">基金管理</el-menu-item>
            <el-menu-item index="2" disabled>欢迎您:{{userName}}</el-menu-item>
          </el-menu>
        </el-header>
        <el-main>
          <el-col>
            <router-link></router-link>
            <router-view @log="getUserName"></router-view>
          </el-col>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from "axios"

export default {
  name: 'App',
  data() {
    return {
      userId: this.$store.state.user.userId,
      userName: this.$store.state.user.userName
    }
  },
  components: {
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
          } else {
            self.$message(res.data.msg);
          }
        }).catch(function(err){
          self.$message(err);
        })
      }
    },
    toFundManage() {
      this.$router.push('/fundManage')
    },
    getUserName() {
      this.userName = this.$store.state.user.userName
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
