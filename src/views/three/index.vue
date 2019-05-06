<template>
  <div class="hello">
3
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      back:{
//        backgroundImage:"url("+ require("../assets/1111.png")+")",
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
  header{
    line-height:60px;
    background:#5e8856;
    text-align: center;
    width:100%;
    color:#ffffff;
  }
  .hello{
    height:100%;
  }
</style>
