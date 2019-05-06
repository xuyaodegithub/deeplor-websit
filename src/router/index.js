import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      // redirect: '/one',
      component: ()=> import(/* webpackChunkName: "artStore" */ '@/views/Hello'),
      meta:{name:'first',icon:'el-icon-menu'},
      // children:[
      //   {
      //     path: 'one',
      //     name: 'one',
      //     component: ()=> import(/* webpackChunkName: "artStore" */ '@/views/one/index'),
      //     meta:{name:'一类',icon:'el-icon-menu'}
      //   },{
      //     path: 'two',
      //     name: 'two',
      //     component: ()=> import(/* webpackChunkName: "artStore" */ '@/views/two/index'),
      //     meta:{name:'二类',icon:'el-icon-star-on'}
      //   }
      // ]
    // }, {
    //   path: '/second',
    //   name: 'second',
    //   redirect: '/second/one0',
    //   component: ()=> import(/* webpackChunkName: "artStore" */ '@/views/HelloWorld'),
    //   meta:{name:'second',icon:'el-icon-star-on'},
    //   children:[
    //     {
    //       path: 'one0',
    //       name: 'one0',
    //       component: ()=> import(/* webpackChunkName: "artStore" */ '@/views/one/index'),
    //       meta:{name:'1类',icon:'el-icon-menu'}
    //     },{
    //       path: 'two0',
    //       name: 'two0',
    //       component: ()=> import(/* webpackChunkName: "artStore" */ '@/views/two/index'),
    //       meta:{name:'2类',icon:'el-icon-star-on'}
    //     },{
    //       path: 'three0',
    //       name: 'three0',
    //       component: ()=> import(/* webpackChunkName: "artStore" */ '@/views/three/index'),
    //       meta:{name:'3类',icon:'el-icon-share'}
    //     },
    //   ]
    // }, {
    //   path: '/threed',
    //   name: 'threed',
    //   redirect: '/threed/one1',
    //   component: ()=> import(/* webpackChunkName: "artStore" */ '@/views/HelloWorld'),
    //   meta:{name:'threed',icon:'el-icon-star-on'},
    //   children:[
    //     {
    //       path: 'one1',
    //       name: 'one1',
    //       component: ()=> import(/* webpackChunkName: "artStore" */ '@/views/one/index'),
    //       meta:{name:'1类',icon:'el-icon-menu'}
    //     },{
    //       path: 'two1',
    //       name: 'two1',
    //       component: ()=> import(/* webpackChunkName: "artStore" */ '@/views/two/index'),
    //       meta:{name:'2类',icon:'el-icon-star-on'}
    //     },{
    //       path: 'three1',
    //       name: 'three1',
    //       component: ()=> import(/* webpackChunkName: "artStore" */ '@/views/three/index'),
    //       meta:{name:'3类',icon:'el-icon-share'}
    //     },
    //   ]
    }
  ]
})
