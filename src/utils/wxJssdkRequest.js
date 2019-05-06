// 获取wxjssdk数据
import { Toast } from "mint-ui";
export function  wxJssdkData(merchantId,url,getWxjssdkSign,that,callback) {
  // const that = this;
  getWxjssdkSign({
    merchantId: merchantId,
    url: url
  }).then(res => {
    if (res.success === true) {
      config(res,that);
    } else {
      Toast(res.err_msg || res.errMsg || 'error');
    }
  });
  function config(res,that) {
    const sign = res.data.wxJssdkSign;
    that.$wechat.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.data.appid, // 必填，公众号的唯一标识
      timestamp: sign.timestamp, // 必填，生成签名的时间戳
      nonceStr: sign.noncestr, // 必填，生成签名的随机串
      signature: sign.signature, // 必填，签名
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'openProductSpecificView',
        'chooseWXPay',
        'addCard',
        'chooseCard',
        'openCard',
        'onMenuShareQZone'
      ] // 必填，需要使用的JS接口列表
    });
    that.$wechat.ready(function() {
      callback()
    })
  }
}
export function shareMessage(wconfig,data){
  wx.config({
    debug:false,
    appId:wconfig.appId,
    timestamp:wconfig.timestamp,
    nonceStr:wconfig.noncestr,
    signature:wconfig.sign,
    jsApiList: [
      'checkJsApi',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
//        'onMenuShareQQ',
      'getLocation',
      'hideMenuItems',
      'chooseWXPay',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
    ]
  });

  wx.ready(function() {
    // if(data.hide){
    //   wx.hideMenuItems({
    //     menuList: ['menuItem:openWithQQBrowser','menuItem:openWithSafari','menuItem:copyUrl','menuItem:share:qq','menuItem:share:QZone']
    //
    //   });
    // }
    // if(data.share){
    //   wx.hideMenuItems({
    //     menuList: ['menuItem:share:appMessage','menuItem:share:timeline']
    //
    //   });
    // }
    // 还有一个需要注意的坑，使用微信自定义分享功能的时候，当分享链接中存在中文的时候，一定要进行encodeURIComponent()，否则在安卓手机上能成功自定义分享，ios手机上则不能成功分享。查阅资料后得知是安卓手机会自动encodeURIComponent，而ios不会。
    // 发送给朋友
    wx.onMenuShareTimeline({
      title: data.title, // 分享标题
      link: data.url, // 分享链接
      imgUrl: data.picURL, // 分享图标
      success: function() {
        // 用户确认分享后执行的回调函数
        //this.$toast('分享成功')
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    });
    // 分享到朋友圈
    wx.onMenuShareAppMessage({
      title: data.title, // 分享标题
      desc: data.description, // 分享描述
      link: data.url, // 分享链接
      imgUrl: data.picURL, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function() {
        // 用户确认分享后执行的回调函数
        // setShareCount()
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      },
      fail:function(){
      },
      trigger:function(){
      }
    });
  });
}
