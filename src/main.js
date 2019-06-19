// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/**
 * Created by Yan on 18/8/15.
 */
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import $ from 'jquery';
import store from './store';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/public.css';
// import 'element-ui/lib/theme-chalk/display.css';
// import './assets/fontSize/iconfont.css'
import filters from './filters/filters'
Object.keys(filters).map((val,index)=>{
  Vue.filter(val,filters[val])
  // console.log(val,filters[val])
})
Vue.use(ElementUI)
// import {
//   Menu,
//   Submenu,
//   MenuItem,
//   MenuItemGroup,
//   Container,
//   Header,
//   Aside,
//   Main,
//   Footer,
//   Scrollbar,
//   Breadcrumb,
//   BreadcrumbItem,
//   Progress,
//   Button,Input,Popover,Slider,ColorPicker,Message } from 'element-ui';
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
// Vue.use(Main);
// Vue.use(Footer);
// Vue.use(Scrollbar);
// Vue.use(Breadcrumb);
// Vue.use(BreadcrumbItem);
// Vue.use(Progress);
// Vue.use(Button);
// Vue.use(Input);
// Vue.use(Popover);
// Vue.use(Slider);
// Vue.use(ColorPicker);
// Vue.prototype.$message = Message;
Vue.prototype.$http=axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
const vm=new Vue({
  el: '#app',
  router,
  $,
  store,
  data: {//时间派发调用$emit 方法 this.$root.eventHub.$emit('eventfunction', yourData)，this.$root.eventHub.$on('eventfunction', fun)
    eventHub: new Vue()
  },
  components: { App },
  template: '<App/>'
})
export default vm
