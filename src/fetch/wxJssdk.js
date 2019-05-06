import request from '@/utils/request'
// 领取卡券 详情页
export function getWxjssdkSign(params) {
  return request({
    url: '/h5/wx-js-sdk/sign',
    params: params,
    method: 'get'
  })
}

// 签名
export function getWxjssdkCardSign(params) {
  return request({
    url: '/h5/wx-js-sdk/card-sign',
    params: params,
    method: 'get'
  })
}

// 激活微信会员卡接口
export function getActivationWxCard(merchantId, memberId) {
  return request({
    url: '/h5/mbr-wx-card/activation-wx-card',
    params: {
      merchantId,
      memberId
    },
    method: 'POST'
  })
}
