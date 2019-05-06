<template>
  <div class="hello1">
    <!--<Button type="primary" plain size="mini">默认按钮{{ppp}}</Button>-->
    <!--<div style="width: 200px;height: 200px;border:1px solid #000000;margin: 0 auto;":style="back"></div>-->
    <!--<img src="static/logo.png" alt="">-->
    <!--<header>头部</header>-->
    <!--<Row style="min-height: 100%;">-->
      <!--<Col :xs="12" :sm="4" :md="4" :lg="4" :xl="6" style="height:100%;"><asilde></asilde></Col>-->
      <!--<Col :xs="12" :sm="20" :md="20" :lg="20" :xl="18"><header>头部</header>-->
          <!--<router-view/>-->
      <!--</Col>-->
      <!--<Col :xs="4" :sm="6" :md="8" :lg="6" :xl="11"><div class="grid-content bg-purple">3</div></Col>-->
      <!--<Col :xs="8" :sm="6" :md="4" :lg="6" :xl="1"><div class="grid-content bg-purple-light">4</div></Col>-->
    <!--</Row>-->
    <el-container style="height: 100%;">
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
<!--      <el-aside width="200px">-->
<!--        <el-scrollbar style="height: 100%;overflow-x: hidden;">-->
<!--        <asilde></asilde>-->
<!--        </el-scrollbar>-->
<!--      </el-aside>-->
<!--      <el-container>-->
<!--        <el-header height="40px">-->
<!--          &lt;!&ndash;<div class="HRee">头部</div>&ndash;&gt;-->
<!--          <headerTop></headerTop>-->
<!--        </el-header>-->
<!--        <el-main>-->
<!--          <router-view/>-->
<!--        </el-main>-->
<!--        <el-footer>Footer</el-footer>-->
<!--      </el-container>-->
    </el-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { Button, Select , Row, Col,} from 'element-ui';
  import asilde from '@/components/asilder'
  import headerTop from '@/components/header'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      back:{
        backgroundImage:"url("+ require("../assets/1111.png")+")",
        backgroundRepeat:'rapeat-y'
      }
    }
  },
  computed:{
    ...mapGetters([
      'ppp'
    ])
  },
  components:{
    Button, Select,Row, Col,asilde,headerTop
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .HRee{
    line-height:40px;
    background:#5e8856;
    text-align: center;
    width:100%;
    color:#ffffff;
  }
  .hello1{
    .el-scrollbar{
      height: 100%;
      overflow-x: hidden;
    }
    .el-scrollbar__wrap{
      overflow-x: hidden;
      height:100%;
    }
    height:100%;
    .el-col[data-v-582df0cc]{
      height:100%;
    }
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 40px;
    padding:0;
  }
  .el-aside{
    overflow-x:hidden ;
    background-color: #2f4050;
  }


</style>
