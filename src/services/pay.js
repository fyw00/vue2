import request from '@/utils/request'

export const createOrder = data => {
  return request({
    method: 'POST',
    url: '/front/order/saveOrder',
    data
  })
}

export const getPayInfo = params => {
  return request({
    method: 'GET',
    url: '/front/pay/getPayInfo',
    params
  })
}

export const initPayment = data => {
  return request({
    method: 'POST',
    url: '/front/pay/saveOrder',
    data
  })
}

export const getPayResult = params => {
  return request({
    method: 'GET',
    url: '/front/pay/getPayResult',
    headers: { 'content-type': 'application/json' },
    params
  })
}
