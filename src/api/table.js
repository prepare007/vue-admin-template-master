import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/book/list',
    method: 'get',
    params
  })
}
export function creatBook(data) {
  return request({
    url: '/book/create',
    method: 'post',
    data
  })
}
export function updateBook(data) {
  return request({
    url: '/book/udpate',
    method: 'post',
    data
  })
}
export function fetchBook(id) {
  return request({
    url: '/book/detail',
    method: 'get',
    params: { id }
  })
}
