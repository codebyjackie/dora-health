import request from '@/utils/request'

export const userRegisterService = ({ email, password, repassword }) =>
  request.post('', { email, password, repassword })

export const userLoginService = ({ email, password }) =>
  request.post('', { email, password })
