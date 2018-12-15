import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getList(page = 1, pagesize = 10) {
  return request.get('/user/getList', {
    token: getToken(),
    page,
    pagesize,
  }, false);
}

export function del(id) {
  return request.delete('/user/del', { id }, false);
}

export function edit(obj) {
  return request.put('/user/edit', obj, false);
}

export function add(obj) {
  return request.post('/user/addUser', obj, false);
}

export function exist(obj) {
  return request.get('/user/exist', obj, false);
}
