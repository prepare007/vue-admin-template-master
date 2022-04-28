import request from '@/utils/request'

export function addRecord(data) {
  return request({
    url: '/record/create',
    method: 'post',
    data
  })
}

