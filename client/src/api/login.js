import request from '@/utils/request'

export function login(username, pwd) {
  return request.post('/user/login', {
    username,
    pwd
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
