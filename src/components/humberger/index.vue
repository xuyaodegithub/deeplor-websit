<template>
  <div class="hello">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in nowRoutes" :to="{path : item.parent ? item.parent.path+item.path :item.path }" :key="index">{{item.meta.name}}</el-breadcrumb-item>
      <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'alisd',
  data () {
    return {
      isCollapse: false,

    }
  },
  mounted(){
    console.log(this.$router.options.routes)
  },

  computed:{
    ...mapGetters([
      'ppp'
    ]),
    nowRoutes(){
      console.log(this.$route.matched)
      return this.$route.matched
    }
  },
  methods:{

  },
  components:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello{
    padding:0 20px;
    height:100%;
    .el-breadcrumb{
      line-height: 40px;
    }
    .el-breadcrumb__separator.el-icon-arrow-right{
      color: #fff;
    }
    .el-breadcrumb__separator{
      color: #fff;
    }
  }
</style>
