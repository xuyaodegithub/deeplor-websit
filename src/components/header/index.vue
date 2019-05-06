<template>
  <div class="header">

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'alisd',
  data () {
    return {


    }
  },
  mounted(){

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
